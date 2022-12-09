import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';

export default function CustomAppBar({ navigation, options, route, back }: StackHeaderProps) {
  return (
    <Appbar.Header>
      <Appbar.Content title={options.title ?? route.name} />
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <>{options.headerRight ? options.headerRight : null}</>
    </Appbar.Header>
  );
}
