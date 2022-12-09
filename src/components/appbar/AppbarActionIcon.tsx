import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AppbarActionIconProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function AppbarActionIcon({ icon, onPress }: AppbarActionIconProps) {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <MaterialCommunityIcons name={icon} size={24} color={'black'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
  },
});
