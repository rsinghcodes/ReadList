import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BiShareAlt } from "react-icons/bi";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";
import {
  useClipboard,
  useToast,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router-dom";
import CommentBox from "../components/CommentBox";

function SinglePost(props) {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const { onCopy } = useClipboard(`http://localhost:3000${props.match.url}`);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      slug,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      title,
      desc,
      sanitizedHtml,
      createdAt,
      fullname,
      username,
      comments,
      // likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <>
        <Box marginTop={{ base: "3.5", md: "7" }}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            letterSpacing="tight"
            marginBottom="3.5"
          >
            {title}
          </Heading>
          <Text
            color="gray.500"
            fontSize={{ base: "xl", md: "2xl" }}
            marginBottom="3.5"
          >
            {desc}
          </Text>
          <Divider />
          <Flex my="3" alignItems="center" justifyContent="space-between">
            <Text color="gray.500">
              Published by: {fullname} · {moment(createdAt).fromNow()}
            </Text>
            {user && user.username === username && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<ChevronDownIcon fontSize="2xl" />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    icon={<BiShareAlt />}
                    onClick={() => {
                      onCopy();
                      toast({
                        title: "Share Link copied to clipboard",
                        status: "success",
                        duration: 1300,
                        isClosable: true,
                      });
                    }}
                  >
                    Share Post
                  </MenuItem>
                  <MenuItem icon={<EditIcon />} as={Link} to="/">
                    Edit Post
                  </MenuItem>
                  <DeleteButton postId={id} callback={deletePostCallback} />
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Divider marginBottom="3.5" />
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </Box>

        <Box mt="7">
          {user && <CommentForm postId={id} />}
          <Divider my="3" />
          <HStack spacing="1rem">
            <Tag size="lg" variant="subtle" colorScheme="gray">
              <TagLabel>{commentCount} Comments</TagLabel>
            </Tag>{" "}
            <Tag size="lg" variant="subtle" colorScheme="gray">
              <TagLabel>{likeCount} Likes</TagLabel>
            </Tag>
          </HStack>

          {comments.map((comment) => (
            <CommentBox key={comment.id} postId={id} comment={comment} />
          ))}
        </Box>
      </>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
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

export default SinglePost;
