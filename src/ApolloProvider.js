import React from 'react';
import { Toaster } from 'react-hot-toast';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import theme from './theme/theme';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <App />
      <Toaster />
    </ChakraProvider>
  </ApolloProvider>
);
