import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView } from 'expo-camera/next';
import { Ionicons } from '@expo/vector-icons';
import { H3, XStack, View, Square, H4 } from 'tamagui';

export default function scanQRcode() {
  const [scanned, setScanned] = React.useState<boolean>(false);
  const [flash, setFlash] = React.useState<boolean>(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <CameraView
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View f={1} ai='center' bg={'rgba(0,0,0,0.5)'} jc='space-evenly'>
          <H4 col={'white'} fontWeight={'bold'}>Scan product QR Code</H4>
          <Square size={'$19'} bg={'rgba(240,240,240,0.1)'} borderColor={'$blue10Dark'} borderWidth='$1' borderRadius={'$4'} />
          <View b={0} jc='center' ai='center'>
            <TouchableNativeFeedback onPress={() => setFlash(!flash)}>
              <XStack w={'45%'} bg={'rgba(0,0,0,0.6)'} jc='center' br={'$5'} p={'$3'} px={'$5'} mb='$8'>
                <Ionicons name={flash ? 'flash' : 'flash-off'} size={24} color={'white'} />
                <H3 color={'white'}> Flash {flash ? 'on' : 'off'}</H3>
              </XStack>
            </TouchableNativeFeedback>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
