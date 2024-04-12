import Avatar from '@/components/Avatar';
import { Heading } from '@/tamagui.config';
import { Ionicons } from '@expo/vector-icons';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, PermissionStatus } from 'expo-image-picker';
import React from 'react';
import { Alert, Keyboard, Linking, Pressable, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Form, H6, Label, View, XStack } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CustomTextInput from '@/components/CustomTextInput';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/interfaces/Auth';
import { adminRegister } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateOrganization() {
  const [organizationName, setOrganizationName] = React.useState<string>('');
  const [organizationLogo, setOrganizationLogo] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date>(null);
  const [endTime, setEndTime] = React.useState<Date>(null);
  const [showStartPicker, setStartPicker] = React.useState<boolean>(false);
  const [showEndPicker, setEndPicker] = React.useState<boolean>(false);

  const { name, email, password, profileImg } = useLocalSearchParams<Record<string, string>>();

  const { mutateAsync } = useMutation({
    mutationKey: [Role.ADMIN, 'register'],
    mutationFn: adminRegister,
    async onSuccess(data) {
      await SecureStore.setItemAsync('token', data.token);
      await SecureStore.setItemAsync('role', Role.ADMIN);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      router.replace('/home');
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const pickImage = async () => {
    if (!organizationLogo.length) {
      const { status } = await requestMediaLibraryPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        Alert.alert('Permission Denied', 'We need Camera Roll permission to upload images', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      } else {
        const result = await launchImageLibraryAsync();

        if (!result.canceled) {
          setOrganizationLogo(result.assets[0].uri);
        }
      }
    }
  };

  const handleTime = (event: DateTimePickerEvent, selectedDate: Date, isStartTime: boolean = true) => {
    if (event.type === 'dismissed' || !selectedDate) return;
    const currentDate = selectedDate || startTime;
    if (isStartTime) {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
    setStartPicker(false);
    setEndPicker(false);
  };

  const handleSubmit = async () => {
    const trimmedOrganizationName: string = organizationName.trim();
    if (trimmedOrganizationName === '') {
      setError(true);
    }
    setError(false);
    const data = {
      name,
      email,
      password,
      organizationName: trimmedOrganizationName,
      organizationLogo,
      profileImg,
      startTime,
      endTime,
    };
    mutateAsync(data);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View h={'100%'} w={'100%'} jc='flex-start' p={'$4'} ai='center'>
          <Heading>Create Organization</Heading>
          {organizationLogo ?
            <Avatar imageUri={organizationLogo} />
          : <Ionicons name='business' size={120} onPress={pickImage} />}
          <Form onSubmit={handleSubmit}>
            <Label>Organization Name</Label>
            <CustomTextInput
              placeholder='Organization Name'
              value={organizationName}
              onChangeText={setOrganizationName}
            />
            {error && <H6 color='red'>Organization name is required</H6>}
            <Label>Unrestricted Timing</Label>
            <XStack>
              {showStartPicker && (
                <RNDateTimePicker
                  display='clock'
                  is24Hour={false}
                  onChange={(event, selectedDate) => handleTime(event, selectedDate)}
                  value={startTime === null ? new Date() : startTime}
                  mode='time'
                />
              )}
              <Pressable onPress={() => setStartPicker(val => !val)}>
                <CustomTextInput
                  editable={false}
                  placeholder='12:04:09 PM'
                  value={startTime?.toLocaleTimeString() ?? ''}
                />
              </Pressable>
              {showEndPicker && (
                <RNDateTimePicker
                  display='clock'
                  is24Hour={false}
                  onChange={(event, selectedDate) => handleTime(event, selectedDate, false)}
                  value={endTime === null ? new Date() : endTime}
                  mode='time'
                />
              )}
              <Pressable onPress={() => setEndPicker(val => !val)}>
                <CustomTextInput
                  editable={false}
                  placeholder='12:04:09 PM'
                  value={endTime?.toLocaleTimeString() ?? ''}
                />
              </Pressable>
            </XStack>
            <Form.Trigger asChild>
              <Button iconAfter={(props: any) => <Ionicons name='business-outline' {...props} />}>
                Create Organization
              </Button>
            </Form.Trigger>
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
