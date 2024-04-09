import Avatar from '@/components/Avatar';
import { Heading } from '@/tamagui.config';
import { Ionicons } from '@expo/vector-icons';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  PermissionStatus,
} from 'expo-image-picker';
import React from 'react';
import {
  Alert,
  Keyboard,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Form, H6, Input, Label, View, XStack } from 'tamagui';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

export default function createOrganization() {
  const [organizationName, setOrganizationName] = React.useState<string>('');
  const [organizationLogo, setOrganizationLogo] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  const pickImage = async () => {
    if (!organizationLogo.length) {
      const { status } = await requestMediaLibraryPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'We need Camera Roll permission to upload images',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Go to Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      } else {
        const result = await launchImageLibraryAsync();

        if (!result.canceled) {
          setOrganizationLogo(result.assets[0].uri);
          setError(false);
        }
      }
    }
  };

  const handleTime = (
    event: DateTimePickerEvent,
    selectedDate: Date,
    isStartTime: boolean = true,
  ) => {
    if (event.type === 'dismissed' || !selectedDate) return;
    const currentDate = selectedDate || startTime;
    if (isStartTime) {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
  };

  const handleSubmit = async () => {
    if (!organizationName.length) {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View h={'100%'} w={'100%'} jc='flex-start' p={'$4'} ai='center'>
          <Heading>Create Organization</Heading>
          {organizationLogo ?
            <Avatar imageUri={organizationLogo} />
          : <Ionicons name='business' size={120} onPress={pickImage} />}
          <Form onSubmit={handleSubmit}>
            <Label color={'$backgroundFocus'} htmlFor='name'>
              Organization Name
            </Label>
            <Input
              id='name'
              placeholder='Organization Name'
              value={organizationName}
              onChangeText={setOrganizationName}
            />
            {error && <H6 color='red'>Organization name is required</H6>}
            <Label color={'$backgroundHover'}>Unrestricted Timing</Label>
            <XStack>
              <RNDateTimePicker
                display='clock'
                collapsable={false}
                onChange={(event, selectedDate) =>
                  handleTime(event, selectedDate)
                }
                value={startTime}
                mode='time'
              />
              <RNDateTimePicker
                display='compact'
                collapsable={false}
                onChange={(event, selectedDate) =>
                  handleTime(event, selectedDate, false)
                }
                value={endTime}
                mode='time'
              />
            </XStack>
            <Form.Trigger asChild>
              <Button
                iconAfter={(props: any) => (
                  <Ionicons name='business-outline' {...props} />
                )}
              >
                Create Organization
              </Button>
            </Form.Trigger>
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
