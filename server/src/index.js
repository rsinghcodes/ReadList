const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB)
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ req }),
      listen: { port: PORT },
    });

    return url;
  })
  .then((url) => {
    console.log(`Server running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
