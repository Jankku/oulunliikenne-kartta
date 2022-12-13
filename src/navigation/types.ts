import type { CompositeScreenProps } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CameraModel } from '../models/camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParkingModel } from '../models/parking';

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
  RoadWorkMap: { roadworkId: string };
};

export type AnnouncementStackScreenProps<T extends keyof AnnouncementStackNavigatorParamList> =
  CompositeScreenProps<
    StackScreenProps<AnnouncementStackNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

export type AnnouncementTabNavigatorParamList = {
  TrafficAnnouncement: undefined;
  Roadwork: undefined;
};

export type AnnouncementTabScreenProps<T extends keyof AnnouncementTabNavigatorParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<AnnouncementTabNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

export type CameraListStackNavigatorParamList = {
  CameraList: undefined;
  CameraDetail: { camera: CameraModel };
};

export type CameraStackScreenProps<T extends keyof CameraListStackNavigatorParamList> =
  CompositeScreenProps<
    StackScreenProps<CameraListStackNavigatorParamList, T>,
    BottomNavScreenProps<keyof BottomNavStackParamList>
  >;

export type MapStackNavigatorParamList = {
  MapScreen: undefined;
  CameraDetail: { camera: CameraModel };
};

export type MapStackScreenProps<T extends keyof MapStackNavigatorParamList> = CompositeScreenProps<
  StackScreenProps<MapStackNavigatorParamList, T>,
  BottomNavScreenProps<keyof BottomNavStackParamList>
>;

export type ParkingListStackNavigatorParamList = {
  ParkingList: undefined;
  ParkingDetail: { parking: ParkingModel };
};

export type ParkingStackScreenProps<T extends keyof ParkingListStackNavigatorParamList> = CompositeScreenProps<
  StackScreenProps<ParkingListStackNavigatorParamList, T>,
  BottomNavScreenProps<keyof BottomNavStackParamList>
>;

export type AboutStackNavigatorParamList = {
  AboutScreen: undefined;
};
