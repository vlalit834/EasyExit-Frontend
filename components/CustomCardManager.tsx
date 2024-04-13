import React from 'react';
import { H2, H5, Separator, View, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { CustomCardManagerProps } from '@/interfaces/CustomCardManagerProps';

export default function CustomCardManager(props: CustomCardManagerProps) {
  const iconName: Record<string, 'checkmark-done-circle' | 'close-circle' | 'hourglass'> = {
    Approved: 'checkmark-done-circle',
    Denied: 'close-circle',
    Pending: 'hourglass',
  };

  const colorName = {
    Approved: '#21bf73',
    Denied: '#f45954',
    Pending: '#fa9715',
  };

  return (
    <View
      h={'$12'}
      w={'100%'}
      backgroundColor={'#fbfdff'}
      borderColor='$blue6Light'
      borderWidth={1}
      borderRadius={10}
      justifyContent='space-between'
      padding={12}
      marginBottom={8}
    >
      <View fd='row' jc='space-between'>
        <View>
          <H2>{props.number ?? 0}</H2>
          <H5>{props.title}</H5>
        </View>
        <View>
          <Ionicons name={iconName[props.title]} size={48} color={colorName[props.title]} />
        </View>
      </View>
      <Separator p={0} borderColor={'$blue6Light'}/>
      <Text fontSize={'$4'}>{props.text}</Text>
    </View>
  );
}
