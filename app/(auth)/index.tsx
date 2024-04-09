import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Text } from 'tamagui';
import CustomTextInput from '@/components/CustomTextInput';
import { Link, router } from 'expo-router';
import { Image } from 'react-native';
import { Heading } from '@/tamagui.config';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

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
        <Button w={'100%'} h={'$5'} onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </Button>
        {!isLoggedIn && (
          <View mt='$4' flexDirection='row' mb='$2'>
            <Text col={'black'}>If not registered, </Text>
            <Link href={'/register'}>
              <Text col='$blue5Dark'>Register</Text>
            </Link>
          </View>
        )}
        <View>
          <Button marginBottom='$2' onPress={() => router.push('/register')}>
            <ButtonText>Go to Register</ButtonText>
          </Button>
          <Button onPress={() => router.push('/createOrganization')}>
            <ButtonText>Go to Create Organization</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
