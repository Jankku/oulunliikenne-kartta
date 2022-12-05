// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { BottomNav } from './src/navigation/BottomNav';
import { GraphQLProvider } from './src/graphql/client';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <GraphQLProvider>
      <PaperProvider>
        <BottomNav />
      </PaperProvider>
    </GraphQLProvider>
  );
}
