import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Select } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import Avatar from '@/components/Avatar';
import {
  PermissionStatus,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Heading } from '@/tamagui.config';
import CustomTextInput from '@/components/CustomTextInput';
import { router } from 'expo-router';

export default function index() {
  const [profileImg, setProfileImg] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

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
        setProfileImg(imgUrl ?? '');
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View px='$4' ai='center'>
          <Heading>Hello! Register to Get Started</Heading>
          <View ai='center' marginBottom='$5' marginTop='$2'>
            {profileImg ?
              <Avatar imageUri={profileImg} />
            : <Ionicons
                name='person-circle-outline'
                size={120}
                onPress={pickImage}
              />
            }
          </View>
          <CustomTextInput
            value={name}
            placeholder='Name'
            id='name'
            onChangeText={setName}
          />
          <CustomTextInput
            value={email}
            placeholder='Email'
            id='email'
            onChangeText={setEmail}
            keyboardType='email-address'
          />
          <CustomTextInput
            value={password}
            placeholder='Password'
            id='password'
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Select defaultValue='Select'></Select>
          <Button
            w={'100%'}
            h={'$5'}
            onPress={() => {
              router.setParams({ name, email, password, profileImg });
              router.push('/createOrganization');
            }}
          >
            <ButtonText>Register</ButtonText>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
