import { View, Input } from 'tamagui';
import { TextInputProps } from '@/interfaces/Auth';

export default function CustomTextInput(props: TextInputProps) {
  return (
    <View w={'100%'}>
      <Input
        themeInverse={true}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        w={'100%'}
        backgroundColor={'$blue1Light'}
        placeholderTextColor={'$blue1Dark'}
        // borderColor={'$blue1Dark'}
        size={'$5'}
        marginBottom='$2'
        keyboardType={
          props.keyboardType !== '' ? props.keyboardType : 'default'
        }
      />
    </View>
  );
}
