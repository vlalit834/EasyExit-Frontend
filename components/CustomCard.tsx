import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H3, Paragraph, Separator, YStack, H5 } from 'tamagui';
import SvgQRCode from 'react-native-qrcode-svg';
import { CustomCardProps } from '@/interfaces/CustomCard';

export default function CustomCard(props: CustomCardProps) {
  const iconName: Record<string, 'checkmark-done-circle' | 'alert-circle' | 'close-circle'> = {
    approved: 'checkmark-done-circle',
    expired: 'alert-circle',
    rejected: 'close-circle',
  };

  const colorName = {
    approved: '#21bf73',
    expired: '#fa9715',
    rejected: '#f45954',
  };
  return (
    <Card size={'$4'} bordered w={'100%'} my={'$2.5'}>
      <Card.Header padded>
        <XStack jc='space-between'>
          <View pr={'$2'}>
            <Ionicons name={iconName[props.status]} size={48} color={colorName[props.status]} />
            <H3 col={'$blue6Dark'}>{props.heading}</H3>
            <Paragraph theme='alt2'>
              <Paragraph>Start Time:</Paragraph> {props.startTime.toLocaleString()}
            </Paragraph>
            <Paragraph theme='alt2'>
              <Paragraph>End Time:</Paragraph> {props.endTime.toLocaleString()}
            </Paragraph>
          </View>
          {props.status === 'approved' && (
            <SvgQRCode
              logoBorderRadius={10}
              color='#0e294b'
              ecl='M'
              backgroundColor='transparent'
              value={props.value}
              logoSize={24}
              logo={require('@/assets/icon.png')}
            />
          )}
        </XStack>
      </Card.Header>
      <Separator />
      <Card.Footer padded jc='space-between' ai='center'>
        <YStack>
        {props.status === 'rejected' && (
          <Paragraph col={'$red10'}>
            Denial Reason: <Paragraph>{props.reason}</Paragraph>
          </Paragraph>
        )}
          <Paragraph theme='alt2'>{props.status === 'rejected' ? 'Rejected' : 'Approved'} By</Paragraph>
          <H5 theme='alt1'>{props.approvedBy}</H5>
        </YStack>
        <Link href={`tel:+91 ${props.phoneNumber}`}>
          <Paragraph theme='alt2'>+91 {props.phoneNumber}</Paragraph>
        </Link>
      </Card.Footer>
    </Card>
  );
}
