import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import styles from '../styles/styles'

function Cameras() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
        <Text>Kamerakuvat</Text>
    </SafeAreaView>
  );
}

function Map() {
  return (
    <SafeAreaView>
      <MapView style={styles.map} />
    </SafeAreaView>
  );
}

function ParkingHalls() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Parkkipaikat</Text>
    </SafeAreaView>
  );
}

function Traffic() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Liikennetiedot</Text>
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
          name="Cameras"
          component={Cameras}
          options={{
            tabBarLabel: 'Kamerakuvat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Kartta',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-legend" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ParkingHalls"
          component={ParkingHalls}
          options={{
            tabBarLabel: 'Parkkipaikat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alpha-p-circle-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Traffic"
          component={Traffic}
          options={{
            tabBarLabel: 'Liikenne',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="car" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Plowing"
          component={Plowing}
          options={{
            tabBarLabel: 'Auraus',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="snowflake" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export { BottomNav };