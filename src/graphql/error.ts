import { ApolloError } from '@apollo/client';

export type QueryError = { _TRAFFIC_SOFTWARE_OPAQUE_TYPE: typeof ErrorHelper };

type ActualError = { error: ApolloError } & QueryError;

declare const ErrorHelper: unique symbol;

const SERVER_GRAPHQL_ERROR = 'Sovellusvirhe: Väärä pyyntö';
const UNHANDLED_CLIENT_ERROR = 'Sovellusvirhe: Toimintoa ei toteutettu';
const NETWORK_ERROR = 'Ei verkkoyhteyttä';

export function toOpaqueError(apolloError: ApolloError): QueryError {
  return {
    _TRAFFIC_SOFTWARE_OPAQUE_TYPE: ErrorHelper,
    error: apolloError,
  } as ActualError;
}

//Logging solution suggested by StackOverflow
//Not sure if console.debug is the correct way to do debug logging

export function toErrorMessage(error: QueryError): string {
  const actual = (error as ActualError).error;

  if (actual) {
    if (actual.graphQLErrors?.length > 0) {
      //TODO: Is this the right kind of logging for this?
      console.debug(JSON.stringify(actual.graphQLErrors));
      return SERVER_GRAPHQL_ERROR;
    }

    if (actual.networkError) {
      //TODO: Is this the right kind of logging for this?
      console.debug(JSON.stringify(actual.networkError));
      return NETWORK_ERROR;
    }
  }

  return UNHANDLED_CLIENT_ERROR;
}
