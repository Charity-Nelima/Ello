import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

export default client;