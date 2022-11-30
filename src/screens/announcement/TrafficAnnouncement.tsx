import TrafficAnnouncementCard from '../../components/announcement/TrafficAnnouncementCard';
import { ActivityIndicator, Text } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';
import Center from '../../components/util/Center';
import { useEffect, useMemo, useReducer, useState } from 'react';
import type { AnnouncementTabScreenProps } from '../../navigation/types';
import TrafficAnnouncementFilterDialog from '../../components/announcement/dialog/TrafficAnnouncementFilterDialog';
import { TrafficDisruptionModeOfTransport } from '../../models/trafficannouncement';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';
import useTrafficAnnouncements, {
  TrafficAnnouncementsResult,
} from '../../hooks/announcements/useTrafficAnnouncements';
import AppbarActionIcon from '../../components/appbar/AppbarActionIcon';
import { toErrorMessage } from '../../graphql/error';
import {
  TrafficAnnouncementModel,
  TrafficDisruptionValidityStatus,
} from '../../models/trafficannouncement';

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

export type TrafficAnnouncementFilters = {
  modesOfTransport: TrafficDisruptionModeOfTransport[];
};

const filterAnnouncements = (
  result: TrafficAnnouncementsResult,
  filters: TrafficAnnouncementFilters
): TrafficAnnouncementModel[] => {
  if (result.loading || result.error) return [];
  if (isFiltersEmpty(filters)) return result.data;

  const filtered = result.data.filter((a) => {
    const isModeOfTransportAccepted = a.modesOfTransport.some((mode) =>
      filters.modesOfTransport.includes(mode)
    );
    const isNotSuspended = a.status !== TrafficDisruptionValidityStatus.Suspended;

    return isModeOfTransportAccepted && isNotSuspended;
  });

  return filtered;
};

const isFiltersEmpty = (filters: TrafficAnnouncementFilters) =>
  filters.modesOfTransport.length === 0;

export default function TrafficAnnouncement({
  navigation,
}: AnnouncementTabScreenProps<'TrafficAnnouncement'>) {
  const [filterDialogVisible, toggleFilterDialog] = useReducer((prev) => !prev, false);
  const [filters, setFilters] = useState<TrafficAnnouncementFilters>({ modesOfTransport: [] });

  const result = useTrafficAnnouncements();
  const announcements = useMemo(() => filterAnnouncements(result, filters), [result, filters]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: () => <AppbarActionIcon icon="filter" onPress={() => toggleFilterDialog()} />,
    });
  }, [navigation]);

  useUpdateTabTitle(navigation, `Häiriöt (${announcements.length})`, [announcements]);

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
        <Text style={styles.errorText}>{toErrorMessage(result.error)}</Text>
      </Center>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={announcements ? undefined : styles.listContainer}
          data={announcements}
          ListEmptyComponent={TrafficAnnouncementListEmpty}
          renderItem={({ item }) => (
            <TrafficAnnouncementCard title={item.title} description={item.description} />
          )}
        />
      </View>

      <TrafficAnnouncementFilterDialog
        visible={filterDialogVisible}
        toggleDialog={() => toggleFilterDialog()}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}
