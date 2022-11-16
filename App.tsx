import * as React from 'react';
import { BottomNav } from './src/navigation/nav';
import { GraphQLProvider } from './src/graphql/client';

export default function App() {
  return (
    <GraphQLProvider>
        <BottomNav/>
    </GraphQLProvider>
  );
}


