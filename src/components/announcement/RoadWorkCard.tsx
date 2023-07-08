import { Button, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo, useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CustomTheme } from '../../styles/theme';

type RoadWorkCardProps = {
  id: string;
  description: string;
  speedlimit: number;
  onNavigateToMapPress: () => void;
};

function RoadWorkCard({ id, description, speedlimit, onNavigateToMapPress }: RoadWorkCardProps) {
  const theme: CustomTheme = useTheme();
  const [showDescription, setShowDescription] = useState(false);
  const [title, newDescription] = formatDescription(description, speedlimit);
  const lastItemId = useRef(id);

  if (id !== lastItemId.current) {
    lastItemId.current = id;
    setShowDescription(false);
  }

  const toggleDescription = useCallback(() => setShowDescription((prev) => !prev), []);

  return (
    <Card>
      <Pressable onPress={toggleDescription}>
        <Card.Title
          title={title}
          titleNumberOfLines={0}
          subtitle={showDescription ? newDescription : undefined}
          subtitleNumberOfLines={0}
          left={(props) => (
            <MaterialCommunityIcons
              name="traffic-cone"
              color={theme.colors.announcement.red}
              {...props}
            />
          )}
          right={(props) => (
            <MaterialCommunityIcons
              name={showDescription ? 'chevron-up' : 'chevron-down'}
              color={theme.colors.onPrimaryContainer}
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

const styles = StyleSheet.create({
  rightStyle: {
    paddingEnd: 16,
  },
  style: {
    paddingVertical: 16,
  },
  subtitleStyle: { opacity: 0.8 },
});

export default memo(RoadWorkCard);

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
