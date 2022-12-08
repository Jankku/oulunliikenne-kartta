import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReducer } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rightStyle: {
    paddingEnd: 16,
  },
  style: {
    paddingVertical: 16,
  },
  subtitleStyle: { opacity: 0.8 },
});

type RoadWorkCardProps = {
  text: string;
  onNavigateToMapPress: () => void;
};

export default function RoadWorkCard({ text, onNavigateToMapPress }: RoadWorkCardProps) {
  const [showDescription, setShowDescription] = useReducer((prev) => !prev, false);
  const [title, description] = getTitleAndDescription(text);

  return (
    <Card>
      <Pressable onPress={() => setShowDescription()}>
        <Card.Title
          title={title}
          titleNumberOfLines={0}
          subtitle={showDescription ? description : undefined}
          subtitleNumberOfLines={0}
          left={(props) => <MaterialCommunityIcons name="traffic-cone" color={'red'} {...props} />}
          right={(props) => (
            <MaterialCommunityIcons
              name={showDescription ? 'chevron-up' : 'chevron-down'}
              {...props}
            />
          )}
          style={styles.style}
          subtitleStyle={styles.subtitleStyle}
          rightStyle={styles.rightStyle}
        />
      </Pressable>
      {showDescription ? (
        <Card.Actions>
          <Button mode="text" onPress={onNavigateToMapPress}>
            Avaa kartalla
          </Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
}

const getTitleAndDescription = (text: string): [title: string, description: string] => {
  const arr = text.split('\n');
  return [arr[0], arr.slice(1, arr.length).join('\n')];
};
