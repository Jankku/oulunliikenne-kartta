import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import Map from '../screens/Map';
import About from '../screens/About';
import { BottomNavStackParamList } from './types';
import AnnouncementStackNavigator from './navigators/AnnouncementStackNavigator';
import CameraListStackNavigator from './navigators/CameraListStackNavigator';

function ParkingHalls() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Parkkipaikat</Text>
    </SafeAreaView>
  );
}

function BottomNav() {
  const Tab = createMaterialBottomTabNavigator<BottomNavStackParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
        activeColor="#e91e63"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Kartta',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-legend" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Cameras"
          component={CameraListStackNavigator}
          options={{
            tabBarLabel: 'Kamerakuvat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="ParkingHalls"
          component={ParkingHalls}
          options={{
            tabBarLabel: 'Parkkipaikat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alpha-p-circle-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Announcement"
          component={AnnouncementStackNavigator}
          options={{
            tabBarLabel: 'Tiedotteet',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alert-rhombus-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: 'Tietoa',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export { BottomNav };
