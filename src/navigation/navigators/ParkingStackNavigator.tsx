import { createStackNavigator } from '@react-navigation/stack';
import { ParkingDetailParkingListScreen } from '../../screens/parking/ParkingDetail';
import ParkingList from '../../screens/parking/ParkingList';
import CustomAppBar from '../CustomAppBar';
import { ParkingListStackNavigatorParamList } from '../types';

const Stack = createStackNavigator<ParkingListStackNavigatorParamList>();

export default function ParkingListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ParkingList"
      screenOptions={{
        freezeOnBlur: true,
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen name="ParkingList" component={ParkingList} options={{ title: 'Pysäköinti' }} />
      <Stack.Screen
        name="ParkingDetail"
        component={ParkingDetailParkingListScreen}
        options={(props) => {
          // eslint-disable-next-line react/prop-types
          return { title: props.route.params.parking.name };
        }}
      />
    </Stack.Navigator>
  );
}
