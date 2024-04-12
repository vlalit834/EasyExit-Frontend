import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'tamagui';
import { router } from 'expo-router';

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        onPress={() => {
          router.push('/approvedOutpass');
        }}
      >
        Got to appprovd
      </Button>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
