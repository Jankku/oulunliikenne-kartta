import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import CameraList from '../../screens/Cameras/CameraList';
import Details from '../../screens/Cameras/Details';
import CustomAppBar from '../CustomAppBar';

const Stack = createStackNavigator();

export default function CameraListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CameraList"
      screenOptions={{
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="CameraList" component={CameraList} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
