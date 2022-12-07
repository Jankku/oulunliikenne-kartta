import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrafficAnnouncementMap from '../../screens/announcement/TrafficAnnouncementMap';
import { AnnouncementStackNavigatorParamList } from '../types';
import AnnouncementTabNavigator from './AnnouncementTabNavigator';

export default function AnnouncementStackNavigator() {
  const Stack = createNativeStackNavigator<AnnouncementStackNavigatorParamList>();

  return (
    <Stack.Navigator
      id="announcementStackNavigator"
      screenOptions={{
        headerShadowVisible: false,
        title: 'Tiedotteet',
      }}
    >
      <Stack.Screen name="TabNavigator" component={AnnouncementTabNavigator} />
      <Stack.Screen name="AnnouncementMap" component={TrafficAnnouncementMap} />
    </Stack.Navigator>
  );
}
