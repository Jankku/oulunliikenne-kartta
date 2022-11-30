import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { TrafficAnnouncementFilters } from '../../../screens/announcement/TrafficAnnouncement';
import TransportModeSection from './TransportModeSection';

type TrafficAnnouncementFilterDialogProps = {
  visible: boolean;
  filters: TrafficAnnouncementFilters;
  toggleDialog: () => void;
  setFilters: React.Dispatch<React.SetStateAction<TrafficAnnouncementFilters>>;
};

export default function TrafficAnnouncementFilterDialog({
  visible,
  filters,
  toggleDialog,
  setFilters,
}: TrafficAnnouncementFilterDialogProps) {
  const onCancelClick = () => {
    toggleDialog();
  };

  const onOkClick = () => {
    toggleDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Suodata häiriöitä</Dialog.Title>
          <Dialog.Content>
            <TransportModeSection
              transportModeFilters={filters.modesOfTransport}
              setFilters={setFilters}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor="red" onPress={onCancelClick}>
              Peruuta
            </Button>
            <Button onPress={onOkClick}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
