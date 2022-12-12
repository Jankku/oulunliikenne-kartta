import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

type TrafficAnnouncementFilterDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  children: React.ReactNode;
};

export default function FilterDialog({
  visible,
  toggleDialog,
  children,
}: TrafficAnnouncementFilterDialogProps) {
  const onOkClick = () => {
    toggleDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Suodata</Dialog.Title>
          <Dialog.Content>{children}</Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onOkClick}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
