import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import CameraList from '../../screens/Cameras/CameraList';
import Details from '../../screens/Cameras/CameraDetail';
import CustomAppBar from '../CustomAppBar';
import { CameraListStackNavigatorParamList } from '../types';

const Stack = createStackNavigator<CameraListStackNavigatorParamList>();

export default function CameraListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CameraList"
      screenOptions={{
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="CameraList" component={CameraList} />
      <Stack.Screen name="CameraDetail" component={Details} />
    </Stack.Navigator>
  );
}
