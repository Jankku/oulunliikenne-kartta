import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReducer } from 'react';
import { StyleSheet } from 'react-native';

type TrafficAnnouncementCardProps = {
  title: string;
  description: string;
};

const styles = StyleSheet.create({
  style: {
    paddingVertical: 16,
  },
  subtitleStyle: { opacity: 0.8 },
  rightStyle: {
    paddingEnd: 16,
  },
});

export default function TrafficAnnouncementCard({
  title,
  description,
}: TrafficAnnouncementCardProps) {
  const [showDescription, setShowDescription] = useReducer((prev) => !prev, false);

  return (
    <>
      <Card onPress={() => setShowDescription()}>
        <Card.Title
          title={title}
          titleNumberOfLines={0}
          subtitle={showDescription ? description : undefined}
          subtitleNumberOfLines={0}
          left={(props) => <MaterialCommunityIcons name="alert-rhombus" color={'red'} {...props} />}
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
      </Card>
    </>
  );
}
