import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Select, Adapt, Sheet, Input, Spinner } from 'tamagui';
import { CustomSelectProps } from '@/interfaces/CustomSelect.d';

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Select
      value={props.value}
      onValueChange={props.onValueChange}
      defaultValue=''
    >
      <Select.Trigger width={400} borderColor={'$blue6Light'} color={'black'}>
        <Select.Value color={'black'} placeholder={props.placeholder ?? ''} />
      </Select.Trigger>

      <Adapt when='sm' platform='touch'>
        <Sheet
          native={true}
          modal={false}
          dismissOnSnapToBottom
          animation={'bouncy'}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation='lazy'
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={20}>
        <Select.Viewport width={100}>
          <Select.Group>
            <Select.Label textAlign='center' fontSize={'$6'}>
              {props.title}
            </Select.Label>
            <Input
              value={props.searchValue}
              onChangeText={props.setSearchValue}
              m='$4'
              placeholder='Search...'
              backgroundColor={'$blue1Light'}
              placeholderTextColor={'$blue1Dark'}
              cursorColor={'black'}
            />
            {props.isLoading ?
              <Spinner color='$blue10' size='large' />
            : props.data.map((item, index) => (
                <Select.Item index={index} key={item.id} value={item.id}>
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft='auto'>
                    <Ionicons name='checkmark-outline' />
                  </Select.ItemIndicator>
                </Select.Item>
              ))
            }
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
