import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, ButtonText, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('@/assets/images.jpeg');

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode='cover'>
          <View style={styles.overlay}>
            <Text style={styles.title}>My Outpass</Text>
            <Text style={styles.subtitle}>Manage Your Outpass:</Text>
          </View>
        </ImageBackground>
        <View style={styles.buttonsContainer}>
          <View style={[styles.buttonRow, { marginTop: 40 }]}>
            <Button style={styles.button} onPress={() => alert('Generate Outpass')}>
              <View style={styles.buttonContent}>
                <Ionicons name='add-circle-outline' size={32} color='#ADD8E6' />
                <ButtonText style={styles.buttonText}>Generate</ButtonText>
              </View>
            </Button>
            <Button style={styles.button} onPress={() => alert('Pending Outpass')}>
              <View style={styles.buttonContent}>
                <Ionicons name='hourglass' size={32} color='#FFC107' />
                <ButtonText style={styles.buttonText}>Pending</ButtonText>
              </View>
            </Button>
          </View>
          <View style={[styles.buttonRow, { marginTop: 20 }]}>
            <Button style={styles.button} onPress={() => alert('Approved Outpass')}>
              <View style={styles.buttonContent}>
                <Ionicons name='checkmark-circle-outline' size={32} color='green' />
                <ButtonText style={styles.buttonText}>Approved</ButtonText>
              </View>
            </Button>
            <Button style={styles.button} onPress={() => alert('Denied Outpass')}>
              <View style={styles.buttonContent}>
                <Ionicons name='close-circle' size={32} color='red' />
                <ButtonText style={styles.buttonText}>Denied</ButtonText>
              </View>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: '70%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1.5,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '50%',
    height: 120,
    marginHorizontal: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 5,
  },
});
