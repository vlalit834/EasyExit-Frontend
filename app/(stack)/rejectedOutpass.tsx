import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { rejectedStudentOutpass } from '@/services/api';
import { Spinner, ScrollView, View, H4 } from 'tamagui';
import CustomCard from '@/components/CustomCard';
import { TokenStatus } from '@/interfaces/TokenStatus';
import NoDataSVG from '@/assets/no-data.svg';

export default function RejectedOutpass() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['rejected', 'student', 'outpass'],
    queryFn: rejectedStudentOutpass,
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fbfdff' }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <NoDataSVG width={170} height={170} />
            <H4 fontStyle='italic'>No data</H4>
          </View>
        : data.map((value, index) => (
            <CustomCard
              value={value.token}
              status={TokenStatus.REJECTED}
              acceptedBy={value.acceptedBy}
              startTime={value.startTime}
              endTime={value.endTime}
              heading={value.heading}
              reason={value.reason}
              phoneNumber={value.phoneNumber}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
