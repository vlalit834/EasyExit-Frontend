import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { approvedStudentOutpass } from '@/services/api';
import { Spinner, Image, ScrollView } from 'tamagui';
import CustomCard from '@/components/CustomCard';

export default function ApprovedOutpass() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['approved','student','outpass'],
    queryFn: approvedStudentOutpass,
  });

  // const data = [
  //   {
  //     acceptedBy: 'Dr. Nilesh',
  //     token: 'Some value',
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     phoneNumber: 238498023,
  //     status: 'issued',
  //   },
  //   {
  //     acceptedBy: 'Dr. Nilesh',
  //     token: 'Some value1',
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     phoneNumber: 238498023,
  //     status: 'issued',
  //   },
  //   {
  //     acceptedBy: 'Dr. Nilesh',
  //     token: 'Some value2',
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     phoneNumber: 238498023,
  //   },
  //   {
  //     acceptedBy: 'Dr. Nilesh',
  //     token: 'Some value3',
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     phoneNumber: 238498023,
  //   },
  // ];
  // const isLoading = false;

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          null
        : data.map((value, index) => (
            <CustomCard
              key={value.token}
              value={value.token}
              status={value.status === 'issued' ? 'approved' : 'expired'}
              approvedBy={value.acceptedBy}
              startTime={value.startTime}
              endTime={value.endTime}
              heading={value.heading}
              phoneNumber={value.phoneNumber}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
