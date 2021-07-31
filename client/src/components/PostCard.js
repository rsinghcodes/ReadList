import React from "react";
import moment from "moment";
import styled from "styled-components";

import { Heading, Paragraph } from "./Typography";
import { Link } from "react-router-dom";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Card = styled.div`
  display: block;
  width: 100%;
  color: var(--text);
  border: 1px solid #eaeaea;
  padding: 1rem;
  margin: 1rem auto;
  /* cursor: pointer; */
  border-radius: var(--border-radius);
  background-color: var(--secondaryBackground);
  transition: color 0.15s ease, border-color 0.15s ease;

  /* :hover,
  :active,
  :focus {
    border-color: var(--primary);
    color: var(--primary);
  } */
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  //
  return (
    <Card>
      <Header>
        <Paragraph>By {username}</Paragraph>
        <Paragraph>Posted {moment(createdAt).fromNow(true)} ago</Paragraph>
      </Header>
      <Heading as={Link} to={`/posts/${id}`}>
        {body}
      </Heading>
      <Footer>
        <div style={{ display: "flex" }}>
          <Paragraph style={{ marginRight: "10px" }}>
            Likes {likeCount}
          </Paragraph>
          <Paragraph>Comment {commentCount}</Paragraph>
        </div>
        <Paragraph>5 min read</Paragraph>
      </Footer>
    </Card>
  );
}

export default PostCard;
