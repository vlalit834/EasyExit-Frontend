import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Label, RadioGroup, YStack } from 'tamagui';
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
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import CustomSelect from '@/components/CustomSelect';
import { useQuery } from '@tanstack/react-query';
import { getSearchResults } from '@/services/api';
import useDebounce from '@/hooks/useDebounce';

export default function index() {
  const [profileImg, setProfileImg] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<string>('Admin');
  const [searchString, setSearchString] = React.useState<string>('');
  const debouncedString = useDebounce(searchString);

  const { data = [], isLoading } = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length >= 3,
    retry: false
  });

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
            id='register-email'
            onChangeText={setEmail}
            keyboardType='email-address'
          />
          <CustomTextInput
            value={password}
            placeholder='Password'
            id='register-password'
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Label>Select Role</Label>
          <RadioGroup
            aria-labelledby='Select one item'
            name='form'
            value={role}
            onValueChange={setRole}
            mb='$4'
          >
            <YStack width={300} alignItems='center' gap='$2'>
              <RadioGroupItemWithLabel size='$4' value='Admin' label='Admin' />
              <RadioGroupItemWithLabel
                size='$4'
                value='Peoples'
                label='Peoples'
              />
            </YStack>
          </RadioGroup>
          {role === 'Peoples' && (
            <CustomSelect
              data={data}
              isLoading={isLoading}
              value={searchString}
              setValue={setSearchString}
              title='Select Organization'
              placeholder='Select your organization'
            />
          )}
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
