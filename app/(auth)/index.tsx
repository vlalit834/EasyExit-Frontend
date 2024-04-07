import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Button,View } from 'tamagui';
import {Link} from 'expo-router'

export default function register() {
  return (<SafeAreaView>
    <View>
      <Button><Link href={'/register'}>Go to Register</Link></Button>
    </View>
  </SafeAreaView>
  )
}
