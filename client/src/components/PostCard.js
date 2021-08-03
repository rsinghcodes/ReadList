import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

function PostCard({ post: { body, createdAt, id } }) {
  return (
    <LinkBox as="article" p="5" borderWidth="1px" rounded="md" w="100%">
      <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
        {moment(createdAt).fromNow(true)} ago
      </Box>

      <Heading size="md" my="2">
        <LinkOverlay as={Link} to={`/posts/${id}`}>
          {body}
        </LinkOverlay>
      </Heading>
      <Text>
        Catch up on what’s been cookin’ at Smashing and explore some of the most
        popular community resources.
      </Text>
    </LinkBox>
  );
}

export default PostCard;
