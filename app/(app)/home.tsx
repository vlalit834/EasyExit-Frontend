import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ScrollView, View, H2, H4, Button, Text, H5 } from 'tamagui';
import { outPassStatus } from '@/constants/outPassStatus';
import { Ionicons } from '@expo/vector-icons';
import CustomCard from '@/components/CustomCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenStatus } from '@/interfaces/TokenStatus';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/services/api';

export default function Home() {
  const [showOutPass, setShowOutPass] = React.useState<boolean>(false);
  const [tokenId, setTokenId] = React.useState<string>('');

  // const tempData = {
  //   token: 'token',
  //   acceptedBy: 'Admin',
  //   phoneNumber: 1234567890,
  //   status: TokenStatus.ISSUED,
  //   heading: 'Outpass for 2 hours',
  //   startTime: new Date(),
  //   endTime: new Date(),
  //   value: '123456',
  //   reason: 'Just for Fun',
  // };

  // const data = tempData;

  const { data, isLoading } = useQuery({
    queryKey: ['getToken'],
    queryFn: () => getToken(tokenId),
    enabled: showOutPass,
  });

  React.useEffect(() => {
    (async () => {
      const tokenId = await AsyncStorage.getItem('tokenId');
      setTokenId(tokenId);
    })();
  });

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1, alignItems: 'center' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 col={'white'}>Welcome to EasyExit</H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ padding: 10 }}>
        {showOutPass && (
          <CustomCard
            acceptedBy={data.acceptedBy}
            endTime={data.endTime}
            heading={data.heading}
            phoneNumber={data.phoneNumber}
            key={data.token}
            reason={data.reason}
            startTime={data.startTime}
            status={data.status}
          />
        )}
        <View fd='row' w={'100%'} jc='space-between' flexWrap='wrap' py='$2'>
          {outPassStatus.map(status => {
            return (
              <Button
                borderColor='$blue6Light'
                fd='column'
                h='$13'
                w={'48.5%'}
                mb='$3'
                backgroundColor={'#fbfdff'}
                key={status.id}
                onPress={status.status === 'Generate' ? () => setShowOutPass(true) : () => () => {}}
              >
                <Ionicons name={status.iconName} size={50} color={status.color} />
                <H5>{status.status}</H5>
                <Text textAlign='center'>{status.text}</Text>
              </Button>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
