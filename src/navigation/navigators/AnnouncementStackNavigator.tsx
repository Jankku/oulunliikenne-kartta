import { createStackNavigator } from '@react-navigation/stack';
import TrafficAnnouncementMap from '../../screens/announcement/TrafficAnnouncementMap';
import CustomAppBar from '../CustomAppBar';
import { AnnouncementStackNavigatorParamList } from '../types';
import AnnouncementTabNavigator from './AnnouncementTabNavigator';

export default function AnnouncementStackNavigator() {
  const Stack = createStackNavigator<AnnouncementStackNavigatorParamList>();

  return (
    <Stack.Navigator
      id="announcementStackNavigator"
      screenOptions={{
        title: 'Tiedotteet',
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="TabNavigator" component={AnnouncementTabNavigator} />
      <Stack.Screen name="AnnouncementMap" component={TrafficAnnouncementMap} />
    </Stack.Navigator>
  );
}
