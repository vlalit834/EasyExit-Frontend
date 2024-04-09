import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Button,
  ButtonText,
  Text,
  RadioGroup,
  Label,
  YStack,
} from 'tamagui';
import CustomTextInput from '@/components/CustomTextInput';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { LoginApi } from '@/services/api';
import { loginData } from '@/interfaces/Auth';
import { ActivityIndicator, Image, ToastAndroid } from 'react-native';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import { Heading } from '@/tamagui.config';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('admin');
  const [error, setError] = React.useState<boolean>(false);
  const loginMutation = useMutation({
    mutationFn: LoginApi,
  });

  const handleLogin = async () => {
    const emailTrimmed: string = email.trim();
    const passwordTrimmed: string = password.trim();

    if (!emailTrimmed && !passwordTrimmed) {
      setError(true);
    } else {
      try {
        const loginData: loginData = {
          email: emailTrimmed,
          password: passwordTrimmed,
          role: role,
        };
        await loginMutation.mutateAsync(loginData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    if (loginMutation.isSuccess) {
      (async () => {
        const response = loginMutation.data;
        await SecureStore.setItemAsync('token', response.token);
        await SecureStore.setItemAsync('role', role);
        router.replace('/home');
      })();
    }
    if (loginMutation.isError) {
      const error = JSON.parse(loginMutation.error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }, [loginMutation.isSuccess, loginMutation.isError]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <View ai='center' marginBottom='$2' marginTop='$8'>
        <Image
          source={require('@/assets/adaptive-icon.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View>
        <Heading>Welcome to Easy Exit </Heading>
      </View>
      <View px='$4' ai='center'>
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
        />
        <Label textAlign='left'>Select Role</Label>
        <RadioGroup
          aria-labelledby='Select one item'
          name='form'
          value={role}
          onValueChange={setRole}
        >
          <YStack width={300} alignItems='center' gap='$2'>
            <RadioGroupItemWithLabel size='$4' value='admin' label='Admin' />
            <RadioGroupItemWithLabel size='$4' value='peoples' label='People' />
            <RadioGroupItemWithLabel
              size='$4'
              value='manager'
              label='Manager'
            />
            <RadioGroupItemWithLabel
              size='$4'
              value='checker'
              label='Checker'
            />
          </YStack>
        </RadioGroup>
        {loginMutation.isPending ?
          <ActivityIndicator />
        : <Button w={'100%'} h={'$5'} onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
        }
        <View mt='$2' flexDirection='row'>
          <Text>If not registered, </Text>
          <Link
            href={'/register'}
            style={{
              color: '#0e294b',
              fontWeight: 'bold',
            }}
          >
            {'Register'}
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
