import React from 'react';
import { NavigationProp } from '@react-navigation/native';

export default function useUpdateTabTitle<T extends {}>(
  navigation: NavigationProp<T>,
  title: string,
  dependencies: React.DependencyList
) {
  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, dependencies]);
}
