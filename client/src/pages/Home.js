import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Typography } from "@material-ui/core";
import PostCard from "../components/PostCard";

const Home = () => {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY);
  console.log(posts);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h5" component="h5">
          Recent Posts
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {loading ? (
          <Typography variant="h5" component="h5">
            Loading...
          </Typography>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid item xs key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
