import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReducer } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { TrafficDisruptionSeverity } from '../../models/trafficannouncement';

const styles = StyleSheet.create({
  rightStyle: {
    paddingEnd: 16,
  },
  style: {
    paddingVertical: 16,
  },
  subtitleStyle: { opacity: 0.8 },
});

const severityColors: Record<TrafficDisruptionSeverity, string> = {
  HIGHEST: 'red',
  HIGH: 'red',
  MEDIUM: 'orange',
  LOW: 'green',
  LOWEST: 'green',
  NONE: 'gray',
  UNKNOWN: 'gray',
};

type TrafficAnnouncementCardProps = {
  title: string;
  description: string;
  severity: TrafficDisruptionSeverity;
  onNavigateToMapPress: () => void;
};

export default function TrafficAnnouncementCard({
  title,
  description,
  severity,
  onNavigateToMapPress,
}: TrafficAnnouncementCardProps) {
  const [showDescription, setShowDescription] = useReducer((prev) => !prev, false);

  return (
    <Card>
      <Pressable onPress={() => setShowDescription()}>
        <Card.Title
          title={title}
          titleNumberOfLines={0}
          subtitle={showDescription ? description : undefined}
          subtitleNumberOfLines={0}
          left={(props) => (
            <MaterialCommunityIcons
              name="alert-rhombus"
              color={severityColors[severity]}
              {...props}
            />
          )}
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
