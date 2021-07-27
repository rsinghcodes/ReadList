import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import styled, { keyframes } from "styled-components";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      {/* <WelcomeBox>
        <WordCarousel>
          <span>Blog is for </span>
          <div>
            <Flip4>
              <li>Readers.</li>
              <li>Hustlers.</li>
              <li>Creators.</li>
              <li>Study.</li>
            </Flip4>
          </div>
        </WordCarousel>
      </WelcomeBox> */}
      <Heading>Recent Posts</Heading>
      <section style={{ width: "100%" }}>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <div key={post.id} style={{ marginTop: 20 }}>
                  <PostCard post={post} />
                </div>
              ))}
          </>
        )}
      </section>
    </>
  );
}

export default Home;

const WelcomeBox = styled.div`
  width: 100%;
  height: 10rem;
  background: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const WordCarousel = styled.h4`
  font-size: 2rem;
  font-weight: 100;
  color: #eee;

  div {
    overflow: hidden;
    position: relative;
    float: right;
    height: 65px;
    padding-top: 10px;
    margin-top: -10px;
    li {
      color: #eee;
      font-weight: 700;
      padding: 0 10px;
      height: 45px;
      margin-bottom: 45px;
      display: block;
    }
  }

  @media (max-width: 700px) {
    font-size: 1.3rem;
  }
`;

const flip4 = keyframes`
  0% { margin-top: -360px; }
  5% { margin-top: -270px; }
  25% { margin-top: -270px; }
  30% { margin-top: -180px; }
  50% { margin-top: -180px; }
  55% { margin-top: -90px; }
  75% { margin-top: -90px; }
  80% { margin-top: 0px; }
  99.99% { margin-top: 0px; }
  100% { margin-top: -270px; }
`;

const Flip4 = styled.ul`
  animation: ${flip4} 10s cubic-bezier(0.23, 1, 0.32, 1.2) infinite;
`;

const Heading = styled.h2`
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
`;
