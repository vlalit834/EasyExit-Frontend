import { StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Avatar from '@/components/Avatar';

export default function index() {
  const [profileImg, setProfileImg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const pickImage = async () => {
    if (!profileImg.length) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need Camera Roll permission to upload images',
          [{ text: 'OK', style: 'cancel'}],
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
          setProfileImg(result.assets[0].uri);
          setError(false);
        }
      }
    }
  };

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
              onPress={() => pickImage()}
            />
          }
        </View>
      </View>
    </SafeAreaView>
  );
}
