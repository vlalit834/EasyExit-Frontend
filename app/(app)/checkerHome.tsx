import { ImageBackground, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, H2, H4, Separator, View, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Camera } from 'expo-camera/next';

export default function CheckerHome() {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 10 }}>
      <View h={'35%'} w={'100%'}>
        <ImageBackground  source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View f={1} jc='center' ai='center' bg={'rgba(0,0,0,0.6)'}>
            <H2 fontWeight={'bold'} col={'white'}>Welcome to EasyExit</H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <Card w={'90%'} backgroundColor={'$blue6Dark'} bordered onPress={ async() => {
        const {granted} = await Camera.getCameraPermissionsAsync();
        if (!granted) {
          const { granted } =  await Camera.requestCameraPermissionsAsync();
          if (!granted) return;
        }
        router.push('/scanQRcode');
      }}>
        <Card.Header fd='row' jc='space-around' ai='center'>
          <YStack>
            <H2 col={'white'}>Scan</H2>
            <H2 col={'white'}>Outpass</H2>
          </YStack>
          <Separator vertical als='stretch'/>
          <Ionicons size={64} name='qr-code' color={'white'} />
          <Ionicons size={24} name='chevron-forward' color={'white'} />
        </Card.Header>
      </Card>
    </SafeAreaView>
  );
}
