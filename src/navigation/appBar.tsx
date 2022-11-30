import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraList from '../screens/Cameras/CameraList'
import Details from '../screens/Cameras/Details'
import { CustomNavigationBar } from './customNavBar';

const Stack = createStackNavigator();

function AppBar() {
  return (

      <Stack.Navigator
      initialRouteName="CameraList"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}>
        <Stack.Screen name="CameraList" component={CameraList} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>

  );
}

export { AppBar };