import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiShareAlt } from 'react-icons/bi';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import readingTime from 'reading-time';

import { AuthContext } from '../context/auth';
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
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, EditIcon, TimeIcon } from '@chakra-ui/icons';

import { FETCH_POST_QUERY } from '../util/graphql';
import DeleteButton from '../components/DeleteButton';
import CommentForm from '../components/CommentForm';
import CommentBox from '../components/CommentBox';
import LikeButton from '../components/LikeButton';

function SinglePost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const { onCopy } = useClipboard(`http://localhost:3000/posts/${slug}`);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      slug,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function deletePostCallback() {
    navigate('/', { replace: true });
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

    const { text } = readingTime(sanitizedHtml);

    postMarkup = (
      <>
        <Box marginTop={{ base: '3.5', md: '7' }}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl' }}
            letterSpacing="tight"
            marginBottom="3.5"
          >
            {title}
          </Heading>
          <Text
            color="gray.500"
            fontSize={{ base: 'xl', md: '2xl' }}
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
                  Published {moment(createdAt).fromNow()}
                </Text>
                <Flex alignItems="center">
                  <TimeIcon w={3.5} h={3.5} color="gray.500" />
                  <Text color="gray.500" fontSize="sm" ml={1.5}>
                    {text}
                  </Text>
                </Flex>
              </div>
            </Box>
            {user && user.email === email ? (
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
                        position: 'top',
                        description: 'Share Link copied to clipboard.',
                        status: 'success',
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
            ) : (
              <Tooltip label="Copy Share Link">
                <IconButton
                  variant="outline"
                  aria-label="Copy Share Link"
                  fontSize="20px"
                  icon={<BiShareAlt />}
                  onClick={() => {
                    onCopy();
                    toast({
                      position: 'top',
                      description: 'Share Link copied to clipboard.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                />
              </Tooltip>
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
