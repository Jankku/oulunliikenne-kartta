import { createStackNavigator } from '@react-navigation/stack';
import { CameraDetailMapScreen } from '../../screens/Cameras/CameraDetail';
import Map from '../../screens/Map';
import CustomAppBar from '../CustomAppBar';
import { MapStackNavigatorParamList } from '../types';

const Stack = createStackNavigator<MapStackNavigatorParamList>();

export default function MapStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        title: 'Kartta',
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="MapScreen" component={Map} />
      <Stack.Screen
        name="CameraDetail"
        component={CameraDetailMapScreen}
        options={(props) => {
          return { title: props.route.params.camera.name };
        }}
      />
    </Stack.Navigator>
  );
}
