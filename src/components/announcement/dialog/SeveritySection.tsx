import React, { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { TrafficDisruptionSeverity } from '../../../models/trafficannouncement';
import { TrafficAnnouncementFilters } from '../../../screens/announcement/TrafficAnnouncement';

const styles = StyleSheet.create({
  chip: {
    margin: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

type SeverityChipLabels = 'Suuri' | 'Keskitaso' | 'Pieni' | 'Tuntematon';
const chips: Record<SeverityChipLabels, TrafficDisruptionSeverity[]> = {
  Suuri: [TrafficDisruptionSeverity.High, TrafficDisruptionSeverity.Highest],
  Keskitaso: [TrafficDisruptionSeverity.Medium],
  Pieni: [TrafficDisruptionSeverity.Low, TrafficDisruptionSeverity.Lowest],
  Tuntematon: [TrafficDisruptionSeverity.None, TrafficDisruptionSeverity.Unknown],
};

type SeveritySectionProps = {
  severityFilters: TrafficDisruptionSeverity[];
  setFilters: Dispatch<React.SetStateAction<TrafficAnnouncementFilters>>;
};

export default function SeveritySection({ severityFilters, setFilters }: SeveritySectionProps) {
  const selectChip = (newSeverity: TrafficDisruptionSeverity[]) => {
    setFilters((filters) => {
      const prevSeverity = filters.severity;

      if (prevSeverity.some((prev) => newSeverity.includes(prev))) {
        return {
          ...filters,
          severity: prevSeverity.filter((s) => !newSeverity.includes(s)),
        };
      } else {
        prevSeverity.push(...newSeverity);
        return { ...filters, severity: prevSeverity };
      }
    });
  };

  return (
    <>
      <Text variant="titleMedium">Vakavuus</Text>
      <View style={styles.container}>
        {Object.entries(chips).map(([label, severities]) => {
          const selected = severityFilters.includes(severities[0]);
          return (
            <Chip
              compact
              showSelectedOverlay
              key={label}
              mode="outlined"
              selected={selected}
              style={styles.chip}
              onPress={() => selectChip(severities)}
            >
              {label}
            </Chip>
          );
        })}
      </View>
    </>
  );
}
