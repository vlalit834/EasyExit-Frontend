import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function convertLocalImageUrlToBase64Url(filepath: any) {
  try {
    const imgData = await FileSystem.readAsStringAsync(filepath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const base64Url = `data:image/jpeg;base64,${imgData}`;

    await AsyncStorage.setItem('profileImgUrl', base64Url);
    return base64Url;
  } catch (err) {
    console.log(err);
  }
}
