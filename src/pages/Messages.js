import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { GET_USER_CHANNELS } from "../graphql/queries";
import { GET_LOCAL_ME } from "../graphql/localQueries";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutations";
import { CHANNEL_UPDATED_SUBSCRIPTION } from "../graphql/subscription";
import { MainContainer } from "../components/container";
import ChannelList from "../components/chat/ChannelList";

function Messages({ session }) {
  const { loading, data, error } = useQuery(GET_LOCAL_ME);
  const {
    loading: channelsLoading,
    error: channelsError,
    data: channelsData,
    subscribeToMore
  } = useQuery(GET_USER_CHANNELS, { fetchPolicy: "cache-and-network" });

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHANNEL_UPDATED_SUBSCRIPTION,
      updateQuery: (previousResult, { subscriptionData }) => {
        // If the subscription data does not exist
        // Simply return the previous data
        if (!subscriptionData.data) return channelsData;
        const oldChannels = previousResult.getUserChannels;
        const { channelUpdated } = subscriptionData.data;
        // If authUser already has unseen message from that user,
        // remove old message, so we can show the new one
        const index = oldChannels.findIndex(u => u.id === channelUpdated.id);
        if (index > -1) {
          oldChannels.splice(index, 1);
        }

        // Merge channels
        const mergeChannels = [channelUpdated, ...oldChannels];
        console.log(mergeChannels);
        return {
          getUserChannels: mergeChannels
        };
      }
    });
    return () => unsubscribe();
  }, [subscribeToMore, channelsData]);

  if (channelsLoading) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) console.log(error);

  return (
    <MainContainer>
      <h2>Messages</h2>
      {channelsData && channelsData.getUserChannels && data && data.me
        ? channelsData.getUserChannels.map(channel => {
            return <ChannelList channel={channel} me={data} key={channel.id} />;
          })
        : null}
    </MainContainer>
  );
}

export default Messages;
