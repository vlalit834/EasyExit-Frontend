import { View, Input } from 'tamagui';
import { TextInputProps } from '@/interfaces/Auth';

export default function CustomTextInput(props: TextInputProps) {
  return (
    <View w={'100%'}>
      <Input
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        w={'100%'}
        backgroundColor={'$blue1Light'}
        placeholderTextColor={'$blue1Dark'}
        secureTextEntry={props.secureTextEntry ?? false}
        // borderColor={'$blue1Dark'}
        size={'$5'}
        marginBottom='$2'
        cursorColor={'black'}
        keyboardType={props.keyboardType ?? 'default'}
      />
    </View>
  );
}
