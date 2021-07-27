import React, { useContext } from "react";
import { BiComment, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import styled from "styled-components";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card as={Link} to={`/posts/${id}`}>
      <Header>
        <p>By {username}</p>
        <p>Posted {moment(createdAt).fromNow(true)} ago</p>
      </Header>
      <h2>{body}</h2>
      <Footer>
        <div style={{ display: "flex" }}>
          <p style={{ marginRight: "10px" }}>
            <BiHeart color="black" /> {likeCount}
          </p>
          <p>
            <BiComment /> {commentCount}
          </p>
        </div>
        <p>5 min read</p>
      </Footer>
    </Card>
  );
}

export default PostCard;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Card = styled.div`
  display: block;
  width: 100%;
  min-height: 90px;
  border: 3px solid #555bff;
  padding: 15px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 4px;

  p {
    font-size: 0.8rem;
    color: #212121;
  }

  h2 {
    color: #212121;

    @media (max-width: 700px) {
      font-size: 1.5rem;
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
