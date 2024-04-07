import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Button, ButtonText, View } from 'tamagui';
import { router } from 'expo-router';

export default function register() {
  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff' }}>
      <View>
        <Button onPress={() => router.push('/register')}>
          <ButtonText>Go to Register</ButtonText>
        </Button>
        <Button onPress={() => router.push('/createOrganization')}>
          <ButtonText>Go to Create Organization</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
