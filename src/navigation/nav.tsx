import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import Map from '../screens/Map';
import AnnouncementNavigator from '../screens/announcement/AnnouncementNavigator';
import Cameras from '../screens/Cameras/CameraNavigator'

function ParkingHalls() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Parkkipaikat</Text>
    </SafeAreaView>
  );
}

function Plowing() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Auraustiedot</Text>
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

function BottomNav() {
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
          component={Cameras}
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
          component={AnnouncementNavigator}
          options={{
            tabBarLabel: 'Tiedotteet',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alert-rhombus-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Plowing"
          component={Plowing}
          options={{
            tabBarLabel: 'Auraus',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="snowflake" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export { BottomNav };
