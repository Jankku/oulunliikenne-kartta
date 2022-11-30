import { Dispatch } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { TrafficDisruptionModeOfTransport } from '../../../models/trafficannouncement';
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

type TransportModeChip = {
  icon: string;
  label: string;
};

const transportModeChips: Record<TrafficDisruptionModeOfTransport, TransportModeChip> = {
  [TrafficDisruptionModeOfTransport.Bicycle]: { icon: 'bicycle', label: 'Polkupyörä' },
  [TrafficDisruptionModeOfTransport.Car]: { icon: 'car', label: 'Auto' },
  [TrafficDisruptionModeOfTransport.Pedestrian]: { icon: 'human-male', label: 'Jalankulkija' },
  [TrafficDisruptionModeOfTransport.PublicTransport]: { icon: 'bus', label: 'Julkinen liikenne' },
};

type TransportModeSectionProps = {
  transportModeFilters: TrafficDisruptionModeOfTransport[];
  setFilters: Dispatch<React.SetStateAction<TrafficAnnouncementFilters>>;
};

export default function TransportModeSection({
  transportModeFilters,
  setFilters,
}: TransportModeSectionProps) {
  const selectChip = (mode: TrafficDisruptionModeOfTransport) => {
    setFilters((filters) => {
      const prevModes = filters.modesOfTransport;
      if (!prevModes) return { modesOfTransport: [] };

      if (prevModes.includes(mode)) {
        return { modesOfTransport: prevModes.filter((m) => m !== mode) };
      } else {
        prevModes.push(mode);
        return { modesOfTransport: prevModes };
      }
    });
  };

  return (
    <>
      <Text variant="titleMedium">Liikennemuoto</Text>
      <View style={styles.container}>
        {Object.values(TrafficDisruptionModeOfTransport).map((mode) => {
          const chip = transportModeChips[mode];
          const selected = transportModeFilters.includes(mode);
          return (
            <Chip
              compact
              showSelectedOverlay
              key={mode}
              selected={selected}
              mode="outlined"
              icon={chip.icon}
              style={styles.chip}
              onPress={() => selectChip(mode)}
            >
              {chip.label}
            </Chip>
          );
        })}
      </View>
    </>
  );
}
