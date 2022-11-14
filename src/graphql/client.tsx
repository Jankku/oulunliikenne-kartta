import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import Config from '../../apollo.config.js';

/*This could also just be actual url since there were issues with
 * automated tools and the target schema
 */
const API_URI = Config.client.service.url;

const apolloCache = new InMemoryCache();

const graphQLClient = new ApolloClient({
  cache: apolloCache,
  uri: API_URI,
});

export type GraphQLProviderProps = {
  children: React.ReactNode | React.ReactNode[] | null;
};

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <ApolloProvider client={graphQLClient}>...children</ApolloProvider>;
}
