import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { TamaguiProvider, Theme } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import config from '@/tamagui.config';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;  

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* Setting app's theme...can be changed just a demo (even optional)*/}
          <Theme name='blue'>
            <StatusBar style="auto" />
            <Slot />
          </Theme>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({});
