import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNavStackParamList } from './types';
import AnnouncementStackNavigator from './navigators/AnnouncementStackNavigator';
import CameraListStackNavigator from './navigators/CameraDetail/CameraListStackNavigator';
import MapStackNavigator from './navigators/MapStackNavigator';
import AboutStackNavigator from './navigators/AboutStackNavigator';
import ParkingListStackNavigator from './navigators/ParkingStackNavigator';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator<BottomNavStackParamList>();

function BottomNav() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Map"
      activeColor={theme.colors.primary}
      theme={theme}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          switch (route.name) {
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Cameras':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
            case 'ParkingHalls':
              iconName = focused ? 'alpha-p-circle' : 'alpha-p-circle-outline';
              break;
            case 'Announcement':
              iconName = focused ? 'alert-rhombus' : 'alert-rhombus-outline';
              break;
            case 'About':
              iconName = focused ? 'information' : 'information-outline';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapStackNavigator}
        options={{
          tabBarLabel: 'Kartta',
        }}
      />
      <Tab.Screen
        name="Cameras"
        component={CameraListStackNavigator}
        options={{
          tabBarLabel: 'Kamerat',
        }}
      />
      <Tab.Screen
        name="ParkingHalls"
        component={ParkingListStackNavigator}
        options={{
          tabBarLabel: 'Pysäköinti',
        }}
      />
      <Tab.Screen
        name="Announcement"
        component={AnnouncementStackNavigator}
        options={{
          tabBarLabel: 'Tiedotteet',
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          tabBarLabel: 'Tietoa',
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomNav };
