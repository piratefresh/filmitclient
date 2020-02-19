import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { GET_POST, GET_ME } from "../graphql/queries";
import { CREATE_CHANNEL_MUTATION } from "../graphql/mutations";
import useModal from "../components/hooks/useModal";
import Modal from "../components/modal";
import { Avatar } from "../components/avatar";
import { Input } from "../components/form/BasicInput";
import { AddButton } from "../components/buttons/buttons";

function Post() {
  let { id } = useParams();
  const { isShown, toggle } = useModal();
  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id
    }
  });
  const [createChannel, { loading: createChannelLoading }] = useMutation(
    CREATE_CHANNEL_MUTATION,
    {
      onCompleted({ createChannel }) {
        if (createChannel) {
          toggle();
        }
      }
    }
  );
  // Form
  const formik = useFormik({
    initialValues: {
      receiverId: null,
      content: ""
    },
    onSubmit: ({ receiverId, content }) => {
      createChannel({
        variables: {
          receiverId: parseInt(receiverId, 10),
          content
        }
      });
    }
  });
  // Sets the hidden input with receiver id and sender id
  React.useEffect(() => {
    if (isShown && data && meData) {
      formik.setFieldValue("receiverId", data.post.user.id);
      formik.setFieldValue("senderId", meData.me.id);
    }
  }, [isShown, data, meData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const { post } = data;
  return (
    <PostContainer>
      <img src={post.postImage} alt={`Header Image for ${post.title}`} />
      <div className="post-text-container">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <span className="post-location">{post.city}</span>
        </div>

        <div className="post-meta-details-container">
          <Avatar
            src={`http://localhost:8000/myAvatars/${post.user.id}`}
            alt={`Avatar for ${post.user.username}`}
            size="large"
          />
          <div className="post-meta-details">
            <div>{post.user.username}</div>
            <div>{post.user.email}</div>
            <AddButton onClick={toggle}>Message</AddButton>
            {isShown && (
              <Modal content="Test" buttonLabel="Message" toggle={toggle}>
                <h3>Send a message to {post.user.firstName}</h3>
                <form onSubmit={formik.handleSubmit}>
                  <input name="receiverId" type="hidden" />
                  <input name="members" type="hidden" />
                  <Input
                    name="content"
                    type="textarea"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                  />
                  <AddButton type="submit">Message</AddButton>
                </form>
              </Modal>
            )}
          </div>
        </div>

        <p className="post-text">{post.text}</p>
      </div>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  .post-meta-details-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    color: ${props => props.theme.colors.primaryLighter};
    .post-meta-details {
      margin-left: 15px;
      line-height: ${props => props.theme.text.normalLineHeight};
      color: ${props => props.theme.colors.dark};
    }
  }
  img {
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
  }
  .post-text-container {
    padding: 5%;
    margin: 5%;
    line-height: ${props => props.theme.text.wideLineHeight};
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primaryDarker};
    border-radius: 5px;
    .post-title {
      font-size: ${props => props.theme.textSize.headline};
      color: ${props => props.theme.colors.primary};
      margin: 0;
      padding: 0;
    }
    .post-location {
      margin-bottom: 2em;
    }
    .post-text {
      white-space: pre-line;
    }
  }
`;
