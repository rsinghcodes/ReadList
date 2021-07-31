import React, { useContext } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import { Heading } from "../components/Typography";
import PostCard from "../components/PostCard";

const Block = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  padding: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  background: var(--secondaryBackground);
`;

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <Block>
        {user ? (
          <Heading textTransform="uppercase">
            Hi {user.username}, Welcome back!
          </Heading>
        ) : (
          <Heading textTransform="uppercase">Trending Blogs</Heading>
        )}
      </Block>
      <section style={{ width: "100%" }}>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
          </>
        )}
      </section>
    </>
  );
}

export default Home;
