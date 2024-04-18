import React from 'react';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar backgroundColor='#0e294b' style='light' />
      <Stack
        screenOptions={{
          headerLeft(props) {
            return router.canGoBack ?
                <Ionicons
                  name='arrow-back-outline'
                  size={24}
                  color='white'
                  onPress={() => (router.canGoBack ? router.back() : null)}
                  style={{
                    marginRight: 10,
                  }}
                />
              : null;
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
        <Stack.Screen
          name='generateOutpass'
          options={{
            title: 'Generate OutPass',
          }}
        />
        <Stack.Screen
          name='pendingOutpass'
          options={{
            title: 'Pending OutPass',
          }}
        />
        <Stack.Screen
          name='scanQRcode'
          options={{
            title: 'Scan QR Code',
          }}
        />
        <Stack.Screen
          name='addSupervisors'
          options={{
            title: 'Add Supervisors',
          }}
        />
      </Stack>
    </>
  );
}
