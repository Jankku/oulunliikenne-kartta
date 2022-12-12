import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AnnouncementTabNavigatorParamList } from '../types';
import TrafficAnnouncement from '../../screens/announcement/TrafficAnnouncement';
import Roadwork from '../../screens/announcement/Roadwork';

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
      <Tab.Screen name="Roadwork" component={Roadwork} options={{ title: 'Tietyöt' }} />
    </Tab.Navigator>
  );
}
