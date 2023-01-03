import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

import SearchButton from './SearchButton';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const [shouldCloseModal, setShouldCloseModal] = React.useState(true);
  const modal = useDisclosure();
  const menu = useDisclosure();
  const menuRef = React.useRef(null);
  const eventRef = React.useRef(null);
  const searchButtonRef = React.useRef();

  const [searchPost, { loading, data }] = useLazyQuery(
    FETCH_SEARCHED_POSTS_QUERY
  );

  const onKeyDown = React.useCallback(
    (e) => {
      eventRef.current = 'keyboard';
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (active + 1 < data.searchPost.length) {
            setActive(active + 1);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (active - 1 >= 0) {
            setActive(active - 1);
          }
          break;
        }
        case 'Control':
        case 'Alt':
        case 'Shift': {
          e.preventDefault();
          setShouldCloseModal(true);
          break;
        }
        case 'Enter': {
          searchPost({
            variables: {
              filter: query,
            },
          });
        }
      }
    },
    [active, data, searchPost, query]
  );

  React.useEffect(() => {
    if (modal.isOpen && query.length > 0) {
      setQuery('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isOpen]);

  const open = menu.isOpen && data;

  return (
    <>
      <SearchButton onClick={modal.onOpen} ref={searchButtonRef} />
      <Modal
        scrollBehavior="inside"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <ModalOverlay />
        <ModalContent
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          rounded="lg"
          overflow="hidden"
          top="4vh"
          bg="transparent"
          shadow="lg"
          maxW="900px"
        >
          <Flex pos="relative" align="stretch">
            <chakra.input
              aria-autocomplete="list"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={64}
              sx={{
                w: '100%',
                h: '68px',
                pl: '68px',
                fontWeight: 'medium',
                outline: 0,
                bg: 'white',
                '.chakra-ui-dark &': { bg: 'gray.700' },
              }}
              placeholder="Search the blog"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                menu.onOpen();
              }}
              onKeyDown={onKeyDown}
            />
            <Center pos="absolute" left={7} h="68px">
              <SearchIcon color="teal.500" boxSize="20px" />
            </Center>
          </Flex>
          <ModalBody maxH="66vh" p="0" ref={menuRef}>
            {open && (
              <Box
                sx={{
                  px: 4,
                  bg: 'white',
                  '.chakra-ui-dark &': { bg: 'gray.700' },
                }}
              >
                {loading ? (
                  <h1>Loading posts...</h1>
                ) : (
                  <Box
                    as="ul"
                    role="listbox"
                    borderTopWidth="1px"
                    pt={2}
                    pb={4}
                  >
                    {data.searchPost &&
                      data.searchPost.map((item, index) => {
                        const selected = index === active;

                        return (
                          <Link key={item.id} to={`/posts/${item.slug}`}>
                            <Box
                              id={`search-item-${index}`}
                              as="li"
                              aria-selected={selected ? true : undefined}
                              onMouseEnter={() => {
                                setActive(index);
                                eventRef.current = 'mouse';
                              }}
                              onClick={() => {
                                if (shouldCloseModal) {
                                  modal.onClose();
                                }
                              }}
                              role="option"
                              key={item.id}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                minH: 16,
                                mt: 2,
                                px: 4,
                                py: 2,
                                rounded: 'lg',
                                bg: 'gray.100',
                                '.chakra-ui-dark &': { bg: 'gray.600' },
                                _selected: {
                                  bg: 'teal.500',
                                  color: 'white',
                                  mark: {
                                    color: 'white',
                                    textDecoration: 'underline',
                                  },
                                },
                              }}
                            >
                              <Box flex="1" ml="4">
                                <Box
                                  fontWeight="medium"
                                  fontSize="sm"
                                  opacity={0.7}
                                >
                                  {item.desc}
                                </Box>
                                <Box fontSize="lg" fontWeight="semibold">
                                  {item.title}
                                </Box>
                              </Box>
                            </Box>
                          </Link>
                        );
                      })}
                  </Box>
                )}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const FETCH_SEARCHED_POSTS_QUERY = gql`
  query ($filter: String) {
    searchPost(filter: $filter) {
      id
      title
      desc
      sanitizedHtml
      createdAt
      slug
    }
  }
`;

export default Search;
