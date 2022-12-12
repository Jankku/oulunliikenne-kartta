import { Text, ActivityIndicator } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import RoadWorkCard from '../../components/announcement/RoadWorkCard';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';
import { AnnouncementTabScreenProps } from '../../navigation/types';
import Center from '../../components/util/Center';
import useAllRoadworks from '../../hooks/announcements/useAllRoadworks';
import { toErrorMessage } from '../../graphql/error';
import { useEffect, useState } from 'react';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';

export default function Roadwork({ navigation }: AnnouncementTabScreenProps<'Roadwork'>) {
  const [count, setCount] = useState(0);
  const result = useAllRoadworks();

  useEffect(() => {
    if (!result.loading && !result.error) {
      setCount(result.data.length);
    }
  }, [result]);

  useUpdateTabTitle(navigation, `Tietyöt (${count})`, [count]);

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
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={count === 0 ? styles.listContainer : undefined}
        data={result.data}
        ListEmptyComponent={TrafficAnnouncementListEmpty}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoadWorkCard text={item.description} onNavigateToMapPress={() => {}} />
        )}
      />
    </View>
  );
}

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
