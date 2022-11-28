import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type BottomNavStackParamList = {
  Map: undefined;
  Cameras: undefined;
  ParkingHalls: undefined;
  Announcement: undefined;
  Plowing: undefined;
};

export type BottomNavScreenProps<T extends keyof BottomNavStackParamList> = NativeStackScreenProps<
  BottomNavStackParamList,
  T
>;

export type AnnouncementStackNavigatorParamList = {
  TabNavigator: undefined;
};

export type AnnouncementTabNavigatorParamList = {
  TrafficAnnouncement: undefined;
  RoadWork: undefined;
};

export type AnnouncementTabScreenProps<T extends keyof AnnouncementTabNavigatorParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<AnnouncementTabNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomNavStackParamList {}
  }
}
