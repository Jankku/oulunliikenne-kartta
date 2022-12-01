import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { TrafficAnnouncementFilters } from '../../../screens/announcement/TrafficAnnouncement';
import SeveritySection from './SeveritySection';
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
            <SeveritySection severityFilters={filters.severity} setFilters={setFilters} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onOkClick}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
