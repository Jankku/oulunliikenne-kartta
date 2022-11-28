import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AnnouncementTabNavigatorParamList } from '../../navigation/types';
import RoadWork from './RoadWork';
import TrafficAnnouncement from './TrafficAnnouncement';

export default function AnnouncementTabNavigator() {
  const Tab = createMaterialTopTabNavigator<AnnouncementTabNavigatorParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
      }}
    >
      <Tab.Screen
        name="TrafficAnnouncement"
        component={TrafficAnnouncement}
        options={{ title: 'Häiriöt' }}
      />
      <Tab.Screen name="RoadWork" component={RoadWork} options={{ title: 'Tietyöt' }} />
    </Tab.Navigator>
  );
}
