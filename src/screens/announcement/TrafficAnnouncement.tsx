import TrafficAnnouncementCard from '../../components/announcement/TrafficAnnouncementCard';
import { ActivityIndicator, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';
import Center from '../../components/util/Center';
import { useCallback, useMemo, useReducer, useState } from 'react';
import type {
  AnnouncementStackNavigatorParamList,
  AnnouncementTabScreenProps,
} from '../../navigation/types';
import FilterDialog from '../../components/announcement/dialog/FilterDialog';
import {
  TrafficDisruptionModeOfTransport,
  TrafficDisruptionSeverity,
} from '../../models/trafficannouncement';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';
import useAllTrafficAnnouncements, {
  AllTrafficAnnouncementsResult,
} from '../../hooks/announcements/useAllTrafficAnnouncements';
import { toErrorMessage } from '../../graphql/error';
import {
  TrafficAnnouncementModel,
  TrafficDisruptionValidityStatus,
} from '../../models/trafficannouncement';
import { isAllFiltersEmpty, isFilterNotEmpty } from '../../utils/trafficannouncement';
import { StackNavigationProp } from '@react-navigation/stack';
import TransportModeSection from '../../components/announcement/dialog/TransportModeSection';
import SeveritySection from '../../components/announcement/dialog/SeveritySection';
import AppbarActionIcon from '../../components/appbar/AppbarActionIcon';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import ListItemSeparator from '../../components/common/ListItemSeparator';

export type TrafficAnnouncementFilters = {
  modesOfTransport: TrafficDisruptionModeOfTransport[];
  severity: TrafficDisruptionSeverity[];
};

export default function TrafficAnnouncement({
  navigation,
}: AnnouncementTabScreenProps<'TrafficAnnouncement'>) {
  const [filterDialogVisible, toggleFilterDialog] = useReducer((prev) => !prev, false);
  const [filters, setFilters] = useState<TrafficAnnouncementFilters>({
    modesOfTransport: [],
    severity: [],
  });

  const result = useAllTrafficAnnouncements();
  const announcements = useMemo(() => filterAnnouncements(result, filters), [result, filters]);

  useUpdateTabTitle(navigation, `Häiriöt (${announcements.length})`, [announcements]);

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: <AppbarActionIcon icon="filter" onPress={() => toggleFilterDialog()} />,
    });
  });

  const itemSeparator = useCallback(() => <ListItemSeparator height={8} />, []);

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
        <FlashList
          data={announcements}
          estimatedItemSize={102}
          ListEmptyComponent={TrafficAnnouncementListEmpty}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
          renderItem={({ item }) => (
            <TrafficAnnouncementCard
              id={item.id}
              title={item.title}
              description={item.description}
              severity={item.severity}
              onNavigateToMapPress={() =>
                navigation
                  .getParent<StackNavigationProp<AnnouncementStackNavigatorParamList>>()
                  ?.navigate('AnnouncementMap', { announcementId: item.id })
              }
            />
          )}
        />
      </View>

      <FilterDialog visible={filterDialogVisible} toggleDialog={() => toggleFilterDialog()}>
        <TransportModeSection
          transportModeFilters={filters.modesOfTransport}
          setFilters={setFilters}
        />
        <SeveritySection severityFilters={filters.severity} setFilters={setFilters} />
      </FilterDialog>
    </>
  );
}

const filterAnnouncements = (
  result: AllTrafficAnnouncementsResult,
  filters: TrafficAnnouncementFilters
): TrafficAnnouncementModel[] => {
  if (result.loading || result.error) return [];
  if (isAllFiltersEmpty(filters)) return result.data;

  const isNotSuspended = (ann: TrafficAnnouncementModel) =>
    ann.status !== TrafficDisruptionValidityStatus.Suspended;

  const isCorrectTransportMode = (ann: TrafficAnnouncementModel) =>
    ann.modesOfTransport.some((mode) => filters.modesOfTransport.includes(mode));

  const isCorrectSeverity = (ann: TrafficAnnouncementModel) =>
    filters.severity.includes(ann.severity);

  let filtered = result.data.filter(isNotSuspended);

  if (isFilterNotEmpty(filters.modesOfTransport)) {
    filtered = filtered.filter(isCorrectTransportMode);
  }

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
});
