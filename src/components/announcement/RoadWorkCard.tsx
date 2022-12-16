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
  description: string;
  speedlimit: number;
  onNavigateToMapPress: () => void;
};

export default function RoadWorkCard({
  description,
  speedlimit,
  onNavigateToMapPress,
}: RoadWorkCardProps) {
  const [showDescription, setShowDescription] = useReducer((prev) => !prev, false);
  const [title, newDescription] = formatDescription(description, speedlimit);

  return (
    <Card>
      <Pressable onPress={() => setShowDescription()}>
        <Card.Title
          title={title}
          titleNumberOfLines={0}
          subtitle={showDescription ? newDescription : undefined}
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

const formatDescription = (
  text: string,
  speedlimit: number
): [title: string, description: string] => {
  const splitDescription = text.split('\n');
  const description = [
    splitDescription.slice(1, splitDescription.length).join('\n'),
    `\nNopeusrajoitus: ${speedlimit ?? 'Ei tietoa'}`,
  ];
  return [splitDescription[0], description.toString()];
};
