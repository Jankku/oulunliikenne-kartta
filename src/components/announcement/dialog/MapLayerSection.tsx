import { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { MapFilters, MapLayerLabel as MapLayerLabel } from '../../../screens/Map';

const allLayers: MapLayerLabel[] = ['Kamerat', 'Liikenteensujuvuus', 'Parkkihallit'];

type MapLayerSectionProps = {
  layers: MapLayerLabel[];
  setFilters: Dispatch<React.SetStateAction<MapFilters>>;
};

export default function MapLayerSection({ layers, setFilters }: MapLayerSectionProps) {
  const selectChip = (newLayers: MapLayerLabel[]) => {
    setFilters((filters: MapFilters) => {
      const prevLayers = filters.layers;

      if (prevLayers.some((prev) => newLayers.includes(prev))) {
        return {
          ...filters,
          layers: prevLayers.filter((prev) => !newLayers.includes(prev)),
        };
      } else {
        prevLayers.push(...newLayers);
        return { ...filters, layers: prevLayers };
      }
    });
  };

  return (
    <>
      <Text variant="titleMedium">Kartan tasot</Text>
      <View style={styles.container}>
        {allLayers.map((layer) => {
          const selected = layers.includes(layer);
          return (
            <Chip
              compact
              showSelectedOverlay
              key={layer}
              mode="outlined"
              selected={selected}
              style={styles.chip}
              onPress={() => selectChip([layer])}
            >
              {layer}
            </Chip>
          );
        })}
      </View>
    </>
  );
}

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
