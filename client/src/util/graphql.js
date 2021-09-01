import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      desc
      body
      createdAt
      username
      fullname
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        fullname
        createdAt
        body
      }
    }
  }
`;
