import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon({ focused, color, size }) {
            return <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon({ focused, color, size }) {
            return <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen name='createOrganization' />
    </Tabs>
  );
}
