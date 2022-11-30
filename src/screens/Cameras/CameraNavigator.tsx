import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraList from './CameraList';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Cameras() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Kamerat" component={TabNavigator} />
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
      <Tab.Screen name="Lista kameroista" component={CameraList} />
    </Tab.Navigator>
  );
}
