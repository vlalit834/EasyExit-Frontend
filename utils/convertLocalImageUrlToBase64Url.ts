import * as FileSystem from 'expo-file-system';

export default async function convertLocalImageUrlToBase64Url(filepath: string) {
  try {
    const imgData = await FileSystem.readAsStringAsync(filepath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const base64Url = `data:image/${filepath.split('.').pop()};base64,${imgData}`;

    return base64Url;
  } catch (err) {
    console.log(err);
  }
}