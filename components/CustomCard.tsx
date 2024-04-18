import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H3, Paragraph, Separator, YStack, H5, H2, H4, H6 } from 'tamagui';
import SvgQRCode from 'react-native-qrcode-svg';
import { CustomCardProps } from '@/interfaces/CustomCard';
import { TokenStatus } from '@/constants/TokenStatus';
import { toCapitalize } from '@/utils/toCapitalize';
import { colorName, iconName } from '@/constants/outPassStatus';

export default function CustomCard(props: CustomCardProps) {
  
  return (
    <Card animation={'bouncy'} size={'$3'} bordered w={'100%'} my={'$2'} bg={'#fbfdff'}>
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
                {props.status === TokenStatus.REJECTED ? toCapitalize(TokenStatus.REJECTED) : toCapitalize(TokenStatus.ISSUED)} by
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
