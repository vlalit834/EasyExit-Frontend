import { View } from 'tamagui';
import { Image } from 'react-native';
import React from 'react';
import { AvatarProps } from '@/interfaces/Avatar';

export default function Avatar(props: AvatarProps) {
  return (
    <View style={{ width: 100, height: 100, borderRadius: 50 }}>
      <Image
        source={{
          uri: props.imageUri,
        }}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
          borderRadius: 50,
        }}
      ></Image>
    </View>
  );
}
