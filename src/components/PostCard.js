import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import readingTime from 'reading-time';
import { BiShareAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
  useClipboard,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';

function PostCard({ post: { title, desc, sanitizedHtml, createdAt, slug } }) {
  const { onCopy } = useClipboard(window.location.href + `posts/${slug}`);
  const [isLargerThan48em] = useMediaQuery('(min-width: 48em)');
  const { text } = readingTime(sanitizedHtml);

  return (
    <Box as="article" p="5" borderWidth="1px" rounded="lg" w="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          color={useColorModeValue('gray.500', 'gray.400')}
          as="time"
          dateTime="2022-01-01 15:30:00 +0000 UTC"
          fontSize="xl"
        >
          {moment(createdAt).format('ll')} — {text}
        </Box>
        {isLargerThan48em ? (
          <Button
            leftIcon={<BiShareAlt />}
            variant="outline"
            fontWeight={500}
            onClick={() => {
              onCopy();
              toast.success('Share Link copied to clipboard 📋.', {
                position: 'top-center',
                duration: 2500,
              });
            }}
          >
            Click to copy url
          </Button>
        ) : (
          <IconButton
            variant="outline"
            aria-label="Copy Share Link"
            fontSize="20px"
            icon={<BiShareAlt />}
            onClick={() => {
              onCopy();
              toast.success('Share Link copied to clipboard 📋.', {
                position: 'top-center',
                duration: 2500,
              });
            }}
          />
        )}
      </Flex>
      <Divider orientation="horizontal" my={4} />
      <LinkBox mb={3}>
        <Heading size="lg" my="2">
          <LinkOverlay as={Link} to={`/posts/${slug}`}>
            {title}
          </LinkOverlay>
        </Heading>
        <Text fontSize="xl" color={useColorModeValue('gray.500', 'gray.400')}>
          {desc}
        </Text>
      </LinkBox>
    </Box>
  );
}

export default PostCard;
