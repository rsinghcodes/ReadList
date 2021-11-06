import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      desc
      body
      slug
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

export const FETCH_POST_QUERY = gql`
  query ($slug: String!) {
    getPost(slug: $slug) {
      id
      title
      desc
      sanitizedHtml
      createdAt
      fullname
      username
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

export const FETCH_POST_FOR_UPDATE = gql`
  query ($postId: ID!) {
    getPostforUpdate(postId: $postId) {
      id
      title
      desc
      body
    }
  }
`;
