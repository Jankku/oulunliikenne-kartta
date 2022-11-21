import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoadWork from './RoadWork';
import TrafficAnnouncement from './TrafficAnnouncement';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function AnnouncementNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Tiedotteet" component={TabNavigator} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
      }}
    >
      <Tab.Screen name="Häiriöt" component={TrafficAnnouncement} />
      <Tab.Screen name="Tietyöt" component={RoadWork} />
    </Tab.Navigator>
  );
}
