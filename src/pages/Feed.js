import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PlusIcon from "../icons/Plus";

const dumData = [
  {
    title: "Superbad",
    category: ["Light", "Production"],
    tags: ["Comedy", "Drama"],
    text:
      "We have a fun and dynamic group who will be filming all day on Saturday, November 9th in Maywood, CA. If you want to take part in filmmaking, join us! We can provide the transportation to-and-from and we'll feed you, but this is a non-paid offer.We are looking for three energetic and able-bodied people with positive attitudes to help out.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg"
  },
  {
    title: "Taxi Driver",
    category: ["Post-Production", "Editor"],
    tags: ["Comedy", "Drama"],
    text:
      "Barstool Sports is looking for a Freelance Motion Graphics Artist familiar with Adobe Photoshop, After Effects and Illustrator. Video editing experience would be a big plus. Please provide a link to a portfolio or reel when applying. Barstool is a fast pace and growing company. We need creative and driven artists that can thrive is this environment.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8JBEZYMRridpz8sFe63Bzvt3mIZhNsFJbPXOo2qRVKW0-rGP&s",
    active: true
  },
  {
    title: "Assistent Editor",
    category: ["Editor", "Production", "Assistent"],
    tags: ["Comedy", "Drama"],
    text:
      "The Assistant Editor is responsible for supporting our team of video editors and creatives in a fast-paced environment. Ideal candidates are well-versed in all technical aspects of a 4K+ raw video workflow, including file formats, ingesting, logging, proxies, syncing, conforming for online and sound mix, archiving, Media Asset Management and delivering multiple formats for a variety of digital platforms.",
    startDate: "Nov 16, 2019",
    endDate: "Dec 24, 2019",
    location: "Philadelphia, PA",
    img:
      "https://s3.amazonaws.com/images.productionhub.com/jobs/logos/55822_u5ntg3mtuy.jpg"
  }
];

function Feed() {
  return (
    <Container>
      <div className="header">
        <h2>Feed</h2>
        <Link to="/createpost">
          <PlusIcon stroke="#212121" />
        </Link>
      </div>
      <StyledPostContainer>
        {dumData.map((post, index) => {
          return (
            <Card>
              <img src={post.img} alt="" srcset="" />
              <div className="post-text-container">
                <div className="post-title">{post.title}</div>
                <div className="post-category">{post.category}</div>
                <div className="post-text">{post.text}</div>
              </div>
            </Card>
          );
        })}
      </StyledPostContainer>
    </Container>
  );
}

const Container = styled.main`
  padding: 5%;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  width: 90%;
  height: 200px;
  padding: 5%;
  margin-bottom: 5%;
  img {
    min-width: 80px;
    height: 60px;
    object-fit: cover;
    margin-right: 2%;
  }
`;
const StyledPostContainer = styled.div``;

export default Feed;
