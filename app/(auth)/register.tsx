import {
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import Avatar from '@/components/Avatar';
import {
  PermissionStatus,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Heading } from '@/tamagui.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  const [profileImg, setProfileImg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const pickImage = async () => {
    if (!profileImg.length) {
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
          const imgUrl = await convertLocalImageUrlToBase64Url(
            result.assets[0].uri,
          );
          setProfileImg(imgUrl);
        }
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const imgUrl = await AsyncStorage.getItem('profileImgUrl');
        if (imgUrl) setProfileImg(imgUrl);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
