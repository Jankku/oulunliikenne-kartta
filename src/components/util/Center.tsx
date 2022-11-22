import { ReactNode } from 'react';
import { View } from 'react-native';

type CenterProps = {
  children: ReactNode;
};

export default function Center({ children }: CenterProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
}
