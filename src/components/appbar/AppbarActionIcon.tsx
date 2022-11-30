import React from 'react';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AppbarActionIconProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function AppbarActionIcon({ icon, onPress }: AppbarActionIconProps) {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={'black'} />
    </Pressable>
  );
}
