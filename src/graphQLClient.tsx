import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {config} from './config';

const networkInterface = createNetworkInterface({
  uri: config.GRAPHQL_URL
  // uri: 'http://localhost:8080/graphql'
});
export const gQLClient = new ApolloClient({
  networkInterface: networkInterface,
});
