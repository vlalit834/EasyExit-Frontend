import React from 'react';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft(props) {
          return props.canGoBack ? (
            <Ionicons
              name='arrow-back-outline'
              size={24}
              color='white'
              onPress={() => (props.canGoBack ? router.back() : null)}
              style={{
                marginRight: 10,
              }}
            />
          ) : null;
        },
        headerStyle: {
          backgroundColor: '#0e294b',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <Stack.Screen
        name='approvedOutpass'
        options={{
          title: 'Approved Outpass',
        }}
      />
      <Stack.Screen
        name='rejectedOutpass'
        options={{
          title: 'Rejected Outpass',
        }}
      />
    </Stack>
  );
}
