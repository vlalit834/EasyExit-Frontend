import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, View } from 'tamagui';

export default function index() {
  return (
    <SafeAreaView>
      <View w={200} h={400} bg={'$blue10Dark'}>
        <Heading>Welcome to Expo Router</Heading>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
