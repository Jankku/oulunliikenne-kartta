import { ApolloError } from '@apollo/client';
import { QueryError } from './error';

//This might be a bad assumption, but let's just show the freshest data or nothing
export type LoadingState = {
  loading: true;
};

export type ErrorState = {
  loading: false;
  error: QueryError;
};

//Current error settings in client dictates either data or error. Not both
export type ResultState<TModelType> = {
  loading: false;
  error?: undefined;
  data: TModelType;
};

export type QueryResult<SchemaType> = {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: SchemaType;
};

export type QueryHookResult<TModelType> = ResultState<TModelType> | ErrorState | LoadingState;
