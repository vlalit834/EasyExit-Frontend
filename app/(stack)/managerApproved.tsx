import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { approvedStudentOutpass } from '@/services/api';
import { Spinner, ScrollView, View, H4 } from 'tamagui';
import CustomCard from '@/components/CustomCard2';
import AddNotesSVG from '@/assets/add-notes.svg';

export default function ApprovedOutpass() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['approved', 'student', 'outpass'],
    queryFn: approvedStudentOutpass,
  });

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <AddNotesSVG width={170} height={170} />
            <H4 fontStyle='italic'>Start Approving Outpasses</H4>
          </View>
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
