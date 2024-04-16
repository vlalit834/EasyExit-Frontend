
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H4, Paragraph, Separator, YStack, H6 } from 'tamagui';
import { CustomCardProps } from '@/interfaces/CustomCard';
import { TokenStatus } from '@/interfaces/TokenStatus';

export default function CustomCard(props: CustomCardProps) {
  const iconName: Record<
    string,
    'checkmark-done-circle' | 'alert-circle' | 'close-circle' | 'hourglass' | 'sync-sharp' | 'warning'
  > = {
    ISSUED: 'checkmark-done-circle',
    EXPIRED: 'alert-circle',
    REQUESTED: 'hourglass',
    IN_USE: 'sync-sharp',
    LATE: 'warning',
  };

  const colorName = {
    ISSUED: '#21bf73',
    EXPIRED: '#fa9715',
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
        </XStack>
      </Card.Header>
      {(
        <>
          <Separator />
          <Card.Footer padded jc='space-between' ai='center'>
            <YStack>
              <Paragraph theme='alt2'>
                Requested By
              </Paragraph>
              <H6 theme='alt1'>{props.acceptedBy}</H6>
              <H6 theme='alt1'>{props.email}</H6> 
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