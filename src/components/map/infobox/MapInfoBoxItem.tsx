import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type InfoBoxItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap | ImageSourcePropType;
  iconColor?: string;
  text: string;
};

export default function MapInfoBoxItem({ icon, iconColor, text }: InfoBoxItemProps) {
  const theme = useTheme();

  return (
    <View style={styles.item}>
      <List.Icon icon={icon} color={iconColor} style={styles.icon} />
      <Text style={{ color: theme.colors.onSurface }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
  },
});
