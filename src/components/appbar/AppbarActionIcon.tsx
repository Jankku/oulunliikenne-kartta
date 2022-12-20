import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

type AppbarActionIconProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function AppbarActionIcon({ icon, onPress }: AppbarActionIconProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <MaterialCommunityIcons name={icon} size={24} color={theme.colors.onBackground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
  },
});
