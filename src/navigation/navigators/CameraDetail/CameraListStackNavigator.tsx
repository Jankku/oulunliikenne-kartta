import { createStackNavigator } from '@react-navigation/stack';
import CameraList from '../../../screens/Cameras/CameraList';
import { CameraDetailCameraListScreen } from '../../../screens/Cameras/CameraDetail';
import CustomAppBar from '../../CustomAppBar';
import { CameraListStackNavigatorParamList } from '../../types';

const Stack = createStackNavigator<CameraListStackNavigatorParamList>();

export default function CameraListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CameraList"
      screenOptions={{
        freezeOnBlur: true,
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="CameraList" component={CameraList} options={{ title: 'Kamerakuvat' }} />
      <Stack.Screen
        name="CameraDetail"
        component={CameraDetailCameraListScreen}
        options={(props) => {
          return { title: props.route.params.camera.name };
        }}
      />
    </Stack.Navigator>
  );
}
