import { StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

import Avatar from '@/components/Avatar';
import {
  PermissionStatus,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Heading } from '@/tamagui.config';

export default function index() {
  const [profileImg, setProfileImg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const pickImage = async () => {
    if (!profileImg.length) {
      const { status } = await requestMediaLibraryPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'We need Camera Roll permission to upload images',
          [{ text: 'OK', style: 'cancel' }],
        );
      } else {
        const result = await launchImageLibraryAsync();

        if (!result.canceled) {
          setProfileImg(result.assets[0].uri);
          setError(false);
        }
      }
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View px='$4' ai='center'>
          <Heading>Hello! Register to Get Started</Heading>
          <View ai='center'>
            {profileImg ?
              <Avatar imageUri={profileImg} />
            : <Ionicons
                name='person-circle-outline'
                size={120}
                onPress={pickImage}
              />
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
