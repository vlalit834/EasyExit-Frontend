import { View, Input } from 'tamagui';
import { TextInputProps } from '@/interfaces/Auth';

export default function CustomTextInput(props: TextInputProps) {
  return (
    <View w={'100%'}>
      <Input
        editable={props.editable ?? true}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        w={'100%'}
        backgroundColor={'$blue1Light'}
        placeholderTextColor={'$grey'}
        secureTextEntry={props.secureTextEntry ?? false}
        borderColor={props.error && !props.value ? '$red10' : '$blue6Light' }
        size={'$5'}
        marginTop='$2'
        cursorColor={'black'}
        keyboardType={props.keyboardType ?? 'default'}
      />
    </View>
  );
}
