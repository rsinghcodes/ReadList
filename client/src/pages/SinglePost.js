import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BiShareAlt } from "react-icons/bi";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { useHistory } from "react-router-dom";

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
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";

import { FETCH_POST_QUERY } from "../util/graphql";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";
import CommentBox from "../components/CommentBox";
import LikeButton from "../components/LikeButton";

function SinglePost(props) {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
  const { onCopy } = useClipboard(`http://localhost:3000${props.match.url}`);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      slug,
    },
  });

  function deletePostCallback() {
    history.push("/");
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
      email,
      comments,
      likes,
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
            <Box display="flex" alignItems="center">
              <Avatar mr="16px" size="md" loading="lazy" />
              <div>
                <Text fontSize="lg" fontWeight="bold">
                  {fullname}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Published {moment(createdAt).fromNow(true)}
                </Text>
              </div>
            </Box>
            {user && user.email === email && (
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
                        position: "top",
                        description: "Share Link copied to clipboard.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                    }}
                  >
                    Share Post
                  </MenuItem>
                  <MenuItem icon={<EditIcon />} as={Link} to={`/edit/${id}`}>
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
            </Tag>
            <LikeButton user={user} post={{ id, likeCount, likes }} />
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

export default SinglePost;
