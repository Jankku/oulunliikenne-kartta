import { Button, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useReducer } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { TrafficDisruptionSeverity } from '../../models/trafficannouncement';
import type { CustomTheme } from '../../styles/theme';

const styles = StyleSheet.create({
  rightStyle: {
    paddingEnd: 16,
  },
  style: {
    paddingVertical: 16,
  },
  subtitleStyle: { opacity: 0.8 },
});

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
  const theme: CustomTheme = useTheme();
  const [showDescription, setShowDescription] = useReducer((prev) => !prev, false);

  const severityColors: Record<TrafficDisruptionSeverity, string> = {
    HIGHEST: theme.colors.announcement.red,
    HIGH: theme.colors.announcement.red,
    MEDIUM: theme.colors.announcement.orange,
    LOW: theme.colors.announcement.green,
    LOWEST: theme.colors.announcement.green,
    NONE: theme.colors.announcement.gray,
    UNKNOWN: theme.colors.announcement.gray,
  };

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
