import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ScrollView, View, H2, H4 } from 'tamagui';
import CustomCardManager from '@/components/CustomCardManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function ManagerHome() {
  const [pendingOutPassNo, setPendingOutPassNo] = React.useState<Number>(0);
  const [approvedOutPassNo, setApprovedOutPassNo] = React.useState<Number>(0);
  const [deniedOutPassNo, setDeniedOutPassNo] = React.useState<Number>(0);

  React.useEffect(() => {
    try {
      (async () => {
        const pendingOutPasses = await AsyncStorage.getItem('pendingOutPassNo');
        const approvedOutPasses = await AsyncStorage.getItem('approvedOutPassNo');
        const deniedOutPasses = await AsyncStorage.getItem('deniedOutPassNo');

        const pendingOutPassesNumber = Number(pendingOutPasses) ?? 0;
        const approvedOutPassesNumber = Number(approvedOutPasses) ?? 0;
        const deniedOutPassesNumber = Number(deniedOutPasses) ?? 0;

        setPendingOutPassNo(pendingOutPassesNumber);
        setApprovedOutPassNo(approvedOutPassesNumber);
        setDeniedOutPassNo(deniedOutPassesNumber);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fbfdff' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 col={'white'}>Welcome to EasyExit</H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ width: '100%', padding: 10, flex: 1 }}>
        <CustomCardManager key={1} text='Check Pending OutPasses' number={pendingOutPassNo} title='Pending' />
        <CustomCardManager key={2} text='Check Approved OutPasses' number={approvedOutPassNo} title='Approved' />
        <CustomCardManager key={3} text='Check Denied OutPasses' number={deniedOutPassNo} title='Denied' />
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
