import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H3, Paragraph, Separator, YStack, H5, H2, H4, H6 } from 'tamagui';
import SvgQRCode from 'react-native-qrcode-svg';
import { CustomCardProps } from '@/interfaces/CustomCard';
import { TokenStatus } from '@/interfaces/TokenStatus';

export default function CustomCard(props: CustomCardProps) {
  const iconName: Record<
    string,
    'checkmark-done-circle' | 'alert-circle' | 'close-circle' | 'hourglass' | 'sync-sharp' | 'warning'
  > = {
    ISSUED: 'checkmark-done-circle',
    EXPIRED: 'alert-circle',
    REJECTED: 'close-circle',
    REQUESTED: 'hourglass',
    IN_USE: 'sync-sharp',
    LATE: 'warning',
  };

  const colorName = {
    ISSUED: '#21bf73',
    EXPIRED: '#fa9715',
    REJECTED: '#f45954',
    REQUESTED: '#fa9715',
    IN_USE: '#21bf73',
    LATE: '#f45954',
  };
  return (
    <Card size={'$3'} bordered w={'100%'} my={'$2'} backgroundColor={'#fbfdff'}>
      <Card.Header padded>
        <XStack jc='space-between'>
          <View>
            <Ionicons name={iconName[props.status]} size={36} color={colorName[props.status]} />
            <H4 col={'$blue6Dark'}>{props.heading}</H4>
            <Paragraph theme='alt2'>
              <Paragraph>Start Time:</Paragraph> {props.startTime.toLocaleString()}
            </Paragraph>
            <Paragraph theme='alt2'>
              <Paragraph>End Time:</Paragraph> {props.endTime.toLocaleString()}
            </Paragraph>
          </View>
          {props.status === TokenStatus.ISSUED && (
            <SvgQRCode
              size={60}
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
      {props.status !== TokenStatus.REQUESTED && (
        <>
          <Separator />
          <Card.Footer padded jc='space-between' ai='center'>
            <YStack>
              {props.status === TokenStatus.REJECTED && (
                <Paragraph col={'$red10'}>
                  Denial Reason: <Paragraph>{props.reason}</Paragraph>
                </Paragraph>
              )}
              <Paragraph theme='alt2'>
                {props.status === TokenStatus.ISSUED ? TokenStatus.ISSUED : TokenStatus.REJECTED} By
              </Paragraph>
              <H6 theme='alt1'>{props.acceptedBy}</H6>
            </YStack>
            <Link href={`tel:+91 ${props.phoneNumber}`}>
              <Paragraph theme='alt2'>+91 {props.phoneNumber}</Paragraph>
            </Link>
          </Card.Footer>
        </>
      )}
    </Card>
  );
}
