import * as React from 'react';
import { BottomNav } from './src/navigation/nav';
import { GraphQLProvider } from './src/graphql/client';
import { Provider as DialogProvider } from 'react-native-paper';

export default function App() {
  return (
    <GraphQLProvider>
      <DialogProvider>
        <BottomNav />
      </DialogProvider>
    </GraphQLProvider>
  );
}
