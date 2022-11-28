import { useQuery } from '@apollo/client';
import { GET_TRAFFIC_ANNOUNCEMENT } from '../../graphql/trafficannouncement';
import TrafficAnnouncementCard from '../../components/announcement/TrafficAnnouncementCard';
import { ActivityIndicator, Text } from 'react-native-paper';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useFilteredTrafficAnnouncements from '../../hooks/announcements/useFilteredTrafficAnnouncements';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';
import Center from '../../components/util/Center';
import React, { useEffect, useReducer, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { AnnouncementTabScreenProps } from '../../navigation/types';
import TrafficAnnouncementFilterDialog from '../../components/announcement/TrafficAnnouncementFilterDialog';
import {
  LocalizedString,
  TrafficDisruptionModeOfTransport,
  TrafficDisruptionSeverity,
  TrafficDisruptionValidityStatus,
} from '../../generated/graphql';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  listContainer: { flex: 1, justifyContent: 'center', alignContent: 'center' },
});

type TrafficAnnouncementSchema = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  severity: TrafficDisruptionSeverity;
  status: TrafficDisruptionValidityStatus;
  modesOfTransport: TrafficDisruptionModeOfTransport[];
};

type TrafficAnnouncementSchemaType = {
  trafficAnnouncements: TrafficAnnouncementSchema[];
};

export type TrafficAnnouncementModel = {
  id: string;
  title: string;
  description: string;
  severity: TrafficDisruptionSeverity;
  status: TrafficDisruptionValidityStatus;
  modesOfTransport: TrafficDisruptionModeOfTransport[];
};

const fromTrafficSchemaToModel = (
  announcement: TrafficAnnouncementSchema
): TrafficAnnouncementModel => {
  return {
    id: announcement.id,
    title: announcement.title?.fi ?? 'Ei otsikkoa',
    description: announcement.description?.fi ?? 'Ei kuvausta',
    severity: announcement.severity ?? TrafficDisruptionSeverity.Unknown,
    status: announcement.status ?? TrafficDisruptionValidityStatus.Suspended,
    modesOfTransport: announcement.modesOfTransport as TrafficDisruptionModeOfTransport[],
  };
};

export type TrafficAnnouncementFilters = {
  modesOfTransport: TrafficDisruptionModeOfTransport[];
};

export default function TrafficAnnouncement({
  navigation,
}: AnnouncementTabScreenProps<'TrafficAnnouncement'>) {
  const [filterDialogVisible, toggleFilterDialog] = useReducer((prev) => !prev, false);
  const [filters, setFilters] = useState<TrafficAnnouncementFilters>({ modesOfTransport: [] });
  const [announcements, setAnnouncements] = useState<TrafficAnnouncementModel[]>([]);
  const filteredAnnouncements = useFilteredTrafficAnnouncements(announcements, filters);

  const { loading, error } = useQuery<TrafficAnnouncementSchemaType>(GET_TRAFFIC_ANNOUNCEMENT, {
    onCompleted: (data) => {
      if (!data.trafficAnnouncements) return;
      const transformedAnnouncements = data.trafficAnnouncements.map(fromTrafficSchemaToModel);
      setAnnouncements(transformedAnnouncements);
    },
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: () => (
        <Pressable onPress={() => toggleFilterDialog()}>
          <MaterialCommunityIcons name={'filter'} size={24} color={'black'} />
        </Pressable>
      ),
    });
  }, [navigation]);

  useUpdateTabTitle(navigation, `Häiriöt (${filteredAnnouncements.length})`, [
    filteredAnnouncements,
  ]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator animating size={'large'} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text style={styles.errorText}>{error.message}</Text>
      </Center>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={filteredAnnouncements ? undefined : styles.listContainer}
          data={filteredAnnouncements}
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
