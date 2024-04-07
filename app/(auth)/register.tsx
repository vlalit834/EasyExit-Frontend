import { StyleSheet, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import Avatar from '@/components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  const [profileImg, setProfileImg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const pickImage = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
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
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
          const imgUrl = await convertLocalImageUrlToBase64Url(
            result.assets[0].uri,
          );
          setProfileImg(imgUrl);
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
      <View paddingHorizontal='$4' alignItems='center'>
        <Text
          color='$blue1Dark'
          fontSize='$8'
          textAlign='center'
          marginBottom='$4'
        >
          Hello! Register to Get Started
        </Text>
        <View alignItems='center'>
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
    </SafeAreaView>
  );
}
