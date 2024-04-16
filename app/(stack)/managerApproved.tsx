import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { approvedStudentOutpass } from '@/services/api';
import { Spinner, Image, ScrollView } from 'tamagui';
import CustomCard from '@/components/CustomCard2';
import { TokenStatus } from '@/interfaces/TokenStatus';

 export default function ApprovedOutpass() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['approved', 'student', 'outpass'],
    queryFn: approvedStudentOutpass,
  });

//   const data = [
//     {
    
//       acceptedBy:'Student',
//       heading: 'Heading $1',
//       token: 'Some value',
//       startTime: new Date(),
//       endTime: new Date(),
//       email: 'student@example.com',
//       phoneNumber: 238498023,
//       status: TokenStatus.ISSUED,
//     },
//     {
//       acceptedBy:'Student',
//       heading: 'Heading $1',
//       token: 'Some value1',
//       startTime: new Date(),
//       endTime: new Date(),
//       email: 'student@example.com',
//       phoneNumber: 238498023,
//       status: TokenStatus.ISSUED,
//     },
//     {
//       acceptedBy:'Student',
//       heading: 'Heading $1',
//       token: 'Some value2',
//       startTime: new Date(),
//       endTime: new Date(),
//       email: 'student@example.com',
//       status: TokenStatus.ISSUED,
//       phoneNumber: 238498023,
//     },
//     {
//       acceptedBy: 'Student',
//       heading: 'Heading $1',
//       token: 'Some value3',
//       startTime: new Date(),
//       endTime: new Date(),
//       email: 'student@example.com',
//       status: TokenStatus.ISSUED,
//       phoneNumber: 238498023,
//     },
//   ];
//   const isLoading = false;

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
              status={value.status}
              acceptedBy={value.acceptedBy}
              email={value.email} 
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
