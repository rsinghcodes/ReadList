import { SearchIcon } from "@chakra-ui/icons";
import {
  chakra,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

const SearchButton = React.forwardRef(function SearchButton(props, ref) {
  return (
    <Flex pos="relative" align="stretch" mt={6} mb={8}>
      <chakra.button
        flex="1"
        type="button"
        ref={ref}
        w="100%"
        bg={useColorModeValue("white", "gray.700")}
        whiteSpace="nowrap"
        display={{ base: "none", sm: "flex" }}
        alignItems="center"
        color="gray.400"
        py="4"
        px="4"
        outline="0"
        _focus={{ shadow: "outline" }}
        shadow="base"
        rounded="md"
        {...props}
      >
        <SearchIcon />
        <HStack w="full" ml="3" spacing="4px">
          <Text textAlign="left" flex="1">
            Search the blog
          </Text>
        </HStack>
      </chakra.button>
    </Flex>
  );
});

export default SearchButton;
