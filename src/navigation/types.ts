import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type BottomNavStackParamList = {
  Map: undefined;
  Cameras: undefined;
  ParkingHalls: undefined;
  Announcement: undefined;
  About: undefined;
};

export type BottomNavScreenProps<T extends keyof BottomNavStackParamList> = NativeStackScreenProps<
  BottomNavStackParamList,
  T
>;

export type AnnouncementStackNavigatorParamList = {
  TabNavigator: undefined;
  AnnouncementMap: { announcementId: string };
};

export type AnnouncementStackScreenProps<T extends keyof AnnouncementStackNavigatorParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AnnouncementStackNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

export type AnnouncementTabNavigatorParamList = {
  TrafficAnnouncement: undefined;
  RoadWork: undefined;
};

export type AnnouncementTabScreenProps<T extends keyof AnnouncementTabNavigatorParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<AnnouncementTabNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

export type CameraListStackNavigatorParamList = {
  CameraList: undefined;
  CameraDetail: { cameraId: string };
};

export type CameraStackScreenProps<T extends keyof CameraListStackNavigatorParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CameraListStackNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;
