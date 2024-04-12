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
  ActivityIndicator,
  Alert,
  Keyboard,
  Linking,
  Pressable,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText, Form, H6, Label, View, XStack } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CustomTextInput from '@/components/CustomTextInput';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/interfaces/Role';
import { adminRegister } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function createOrganization() {
  const [organizationName, setOrganizationName] = React.useState<string>('');
  const [organizationLogo, setOrganizationLogo] = React.useState<string | null>(
    null,
  );
  const [error, setError] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date>(null);
  const [endTime, setEndTime] = React.useState<Date>(null);
  const [showStartPicker, setStartPicker] = React.useState<boolean>(false);
  const [showEndPicker, setEndPicker] = React.useState<boolean>(false);

  const { name, email, password, profileImg } =
    useLocalSearchParams<Record<string, string>>();

  const { mutateAsync, isPending } = useMutation({
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
    if (organizationLogo) return;
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert(
        'Permission Denied',
        'Camera Roll permission is required to upload images',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
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
    setStartPicker(false);
    setEndPicker(false);
  };

  const handleSubmit = async () => {
    const trimmedOrganizationName: string = organizationName.trim();
    if (trimmedOrganizationName === '') {
      setError(true);
      return;
    }
    setError(false);
    if (!organizationLogo) {
      ToastAndroid.show(
        'Please select an organization logo',
        ToastAndroid.SHORT,
      );
      return;
    }
    try {
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
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View mt='$6' ai='center' px='$4'>
          <Heading>Create Organization</Heading>
          <View ai='center' marginBottom='$6' marginTop='$3'>
            {organizationLogo ?
              <Avatar imageUri={organizationLogo} />
            : <Ionicons name='business' size={120} onPress={pickImage} />}
          </View>
          <Form w={'100%'} onSubmit={handleSubmit}>
            <H6 mt='$4'>Organization Name</H6>
            <CustomTextInput
              placeholder='Organization Name'
              value={organizationName}
              onChangeText={setOrganizationName}
              error={error}
            />
            {error && organizationName.trim() === '' && (
              <H6 col={'$red10'}>Organization name is required</H6>
            )}
            <H6 mt='$3'>Unrestricted Timing</H6>
            <XStack jc='space-between' mb='$4'>
              {showStartPicker && (
                <RNDateTimePicker
                  display='clock'
                  is24Hour={false}
                  onChange={(event, selectedDate) =>
                    handleTime(event, selectedDate)
                  }
                  value={startTime === null ? new Date() : startTime}
                  mode='time'
                />
              )}
              <Pressable
                style={{ width: '48%' }}
                onPress={() => setStartPicker(val => !val)}
              >
                <CustomTextInput
                  editable={false}
                  placeholder='10:00:00 AM'
                  value={startTime?.toLocaleTimeString() ?? ''}
                />
              </Pressable>
              {showEndPicker && (
                <RNDateTimePicker
                  display='clock'
                  is24Hour={false}
                  onChange={(event, selectedDate) =>
                    handleTime(event, selectedDate, false)
                  }
                  value={endTime === null ? new Date() : endTime}
                  mode='time'
                />
              )}
              <Pressable
                style={{ width: '48%' }}
                onPress={() => setEndPicker(val => !val)}
              >
                <CustomTextInput
                  editable={false}
                  placeholder='06:00:00 PM'
                  value={endTime?.toLocaleTimeString() ?? ''}
                />
              </Pressable>
            </XStack>
            <Form.Trigger asChild>
              <Button
                themeInverse
                h='$5'
                w={'100%'}
                iconAfter={(props: any) => (
                  <Ionicons name='business-outline' {...props} />
                )}
              >
                {isPending ?
                  <ActivityIndicator />
                : <ButtonText>Create Organization</ButtonText>}
              </Button>
            </Form.Trigger>
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
