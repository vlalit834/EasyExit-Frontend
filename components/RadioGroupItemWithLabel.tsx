import { RadioGroupItemWithLabelProps } from "@/interfaces/RadioGroupItemWithLabelProps"
import { Label, RadioGroup, XStack } from "tamagui"

export function RadioGroupItemWithLabel(props: RadioGroupItemWithLabelProps) {
    const id = `radiogroup-${props.value}`
    return (
      <XStack width={300} alignItems="center" gap="$4">
        <RadioGroup.Item value={props.value} id={id} size={props.size}>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
  
        <Label size={props.size} htmlFor={id}>
          {props.label}
        </Label>
      </XStack>
    )
  }