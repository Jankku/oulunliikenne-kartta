import { Text, ActivityIndicator } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import RoadWorkCard from '../../components/announcement/RoadWorkCard';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';
import { AnnouncementTabScreenProps } from '../../navigation/types';
import Center from '../../components/util/Center';
import useAllRoadworks, { RoadworksResult } from '../../hooks/announcements/useAllRoadworks';
import { toErrorMessage } from '../../graphql/error';
import { useMemo, useReducer, useState } from 'react';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';
import { TrafficDisruptionSeverity } from '../../models/trafficannouncement';
import FilterDialog from '../../components/announcement/dialog/FilterDialog';
import SeveritySection from '../../components/announcement/dialog/SeveritySection';
import globalStyles from '../../styles/styles';
import { RoadworkModel } from '../../models/roadwork';
import { isAllFiltersEmpty, isFilterNotEmpty } from '../../utils/trafficannouncement';
import AppbarActionIcon from '../../components/appbar/AppbarActionIcon';
import { useFocusEffect } from '@react-navigation/native';

export type RoadworkFilters = {
  severity: TrafficDisruptionSeverity[];
};

export default function Roadwork({ navigation, route }: AnnouncementTabScreenProps<'Roadwork'>) {
  const [filterDialogVisible, toggleFilterDialog] = useReducer((prev) => !prev, false);
  const [filters, setFilters] = useState<RoadworkFilters>({
    severity: [],
  });
  const result = useAllRoadworks();
  const roadworks = useMemo(() => filterRoadworks(result, filters), [result, filters]);

  useUpdateTabTitle(navigation, `Tietyöt (${roadworks.length})`, [roadworks.length]);

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: <AppbarActionIcon icon="filter" onPress={() => toggleFilterDialog()} />,
    });
  });

  if (result.loading) {
    return (
      <Center>
        <ActivityIndicator animating size={'large'} />
      </Center>
    );
  }

  if (result.error) {
    return (
      <Center>
        <Text variant="bodyLarge" style={styles.errorText}>
          {toErrorMessage(result.error)}
        </Text>
      </Center>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={roadworks.length === 0 ? styles.listContainer : undefined}
          data={roadworks}
          ListEmptyComponent={TrafficAnnouncementListEmpty}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RoadWorkCard text={item.description} onNavigateToMapPress={() => {}} />
          )}
        />
      </View>

      <FilterDialog visible={filterDialogVisible} toggleDialog={() => toggleFilterDialog()}>
        <SeveritySection severityFilters={filters.severity} setFilters={setFilters} />
      </FilterDialog>
    </>
  );
}

const filterRoadworks = (result: RoadworksResult, filters: RoadworkFilters): RoadworkModel[] => {
  if (result.loading || result.error) return [];
  if (isAllFiltersEmpty(filters)) return result.data;

  const isCorrectSeverity = (work: RoadworkModel) => filters.severity.includes(work.severity);

  let filtered = result.data;

  if (isFilterNotEmpty(filters.severity)) {
    filtered = filtered.filter(isCorrectSeverity);
  }

  return filtered;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  listContainer: { alignContent: 'center', flex: 1, justifyContent: 'center' },
});
