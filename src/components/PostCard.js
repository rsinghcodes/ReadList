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
  const basePath = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  const shareLink = `${window.location.origin}${basePath}/posts/${slug}`;
  const { onCopy } = useClipboard(shareLink);
  const [isLargerThan48em] = useMediaQuery('(min-width: 48em)');
  const { text } = readingTime(sanitizedHtml);
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const createdAtMoment = moment(createdAt);
  const createdAtIso = createdAtMoment.isValid()
    ? createdAtMoment.toISOString()
    : undefined;

  return (
    <Box
      as="article"
      p="5"
      borderWidth="1px"
      rounded="lg"
      w="100%"
      bg={cardBg}
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          color={mutedTextColor}
          as="time"
          dateTime={createdAtIso}
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
                duration: 2500,
              });
            }}
          >
            Copy share link
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
        <Text fontSize="xl" color={mutedTextColor}>
          {desc}
        </Text>
      </LinkBox>
    </Box>
  );
}

export default PostCard;
