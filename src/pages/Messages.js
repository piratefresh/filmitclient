import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { GET_CHANNELS } from "../graphql/queries";
import { GET_LOCAL_ME } from "../graphql/localQueries";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutations";
import { MESSAGE_CREATED_SUBSCRIPTION } from "../graphql/subscription";
import { MainContainer } from "../components/container";
import ChannelList from "../components/chat/ChannelList";

function Messages() {
  const [searchValue, setSearchValue] = React.useState([]);
  const { data } = useQuery(GET_LOCAL_ME);
  const {
    loading: channelsLoading,
    error: channelsError,
    data: channelsData,
    refetch,
    subscribeToMore
  } = useQuery(GET_CHANNELS, { fetchPolicy: "cache-and-network" });
  const [createMessage, { loading: createMessageLoading }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      onCompleted({ createMessage }) {}
    }
  );

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      variables: {
        receiverId: data && data.me ? parseInt(data.me.id, 10) : null
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        // If the subscription data does not exist
        // Simply return the previous data
        if (!subscriptionData.data) return channelsData;
        const { channels } = refetch();
        return channels;
      }
    });
    return () => unsubscribe();
  }, [subscribeToMore, data]);

  return (
    <MainContainer>
      <h2>Messages</h2>
      {channelsData &&
      channelsData.channels &&
      channelsData.channels.edges &&
      data ? (
        <ChannelList channels={channelsData.channels.edges} me={data} />
      ) : null}
    </MainContainer>
  );
}

export default Messages;
