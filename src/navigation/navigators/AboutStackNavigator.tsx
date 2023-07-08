import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import CustomAppBar from '../CustomAppBar';
import { AboutStackNavigatorParamList } from '../types';
import About from '../../screens/About';

const Stack = createStackNavigator<AboutStackNavigatorParamList>();

export default function AboutStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AboutScreen"
      screenOptions={{
        freezeOnBlur: true,
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      <Stack.Screen
        name="AboutScreen"
        component={About}
        options={{ title: 'Tietoa sovelluksesta' }}
      />
    </Stack.Navigator>
  );
}
