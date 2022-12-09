import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

type MapInfoBoxProps = {
  children: React.ReactNode;
};

export default function MapInfoBox({ children }: MapInfoBoxProps) {
  return <Surface style={styles.container}>{children}</Surface>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 150,
  },
});
