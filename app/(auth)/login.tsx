import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Text } from 'tamagui';
import CustomTextInput from '@/components/CustomTextInput';
import { router } from 'expo-router';

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
          <View mt='$2' flexDirection='row'>
            <Text col='$blue1Dark'>If not registered, </Text>
            <Text onPress={handleRegister} col='$blue1Dark'>
              {'Register'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
