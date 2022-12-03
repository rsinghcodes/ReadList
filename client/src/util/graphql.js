import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      title
      desc
      sanitizedHtml
      slug
      createdAt
      fullname
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
      email
      likeCount
      likes {
        email
      }
      commentCount
      comments {
        id
        email
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

export const FETCH_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      fullname
      email
      createdAt
      updatedAt
      access
    }
  }
`;

export const FETCH_ADMINS_QUERY = gql`
  query GetAdmins {
    getAdmins {
      id
      email
      fullname
      createdAt
    }
  }
`;
