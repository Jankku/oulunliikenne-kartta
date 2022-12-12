import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';

export default function CustomAppBar({ navigation, options, route, back }: StackHeaderProps) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title ?? route.name} />
      <>{options.headerRight ? options.headerRight : null}</>
    </Appbar.Header>
  );
}
