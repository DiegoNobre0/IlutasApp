import { Box, CheckIcon, Select, Text, View } from "native-base";
import { SelectFieldProps } from "../../types";
import { Icon } from 'react-native-paper';

const SelectField = ({ value, options, onChange, variant = 'primary',
  label, isRequired = false
}: SelectFieldProps) => {
  return (
    <Box
      borderRadius={"2xl"}
      width={"full"}
      minWidth="300"
      justifyContent={"center"}
      alignItems={"center"}
      height={51}
      my={2} 
      mb={4}
    >
      {
        label && (
          <Text className="text-sm font-medium mb-2 w-full">
            {label}
            {isRequired && <Text className="text-danger">*</Text>}
          </Text>
        )
      }
      <Select
        height={"full"} 
        alignSelf={"center"}
        borderRadius={"2xl"}
        width={"full"}
        bgColor={
          variant === "primary" ? "#ffffff" : "#083061"
        }
        borderWidth={
          variant === "primary" ? 1 : 0}
        borderColor={
          '#ABABAB99'
        }
        selectedValue={value ?? options[0].value}
        onValueChange={(item) => {
          onChange && onChange(item);
        }}
        fontSize={14}
        placeholder='Selecione uma opção'
        fontWeight={"medium"}
        color={
          variant === "primary" ? "#39474F" : "#ffffff"
        }
        dropdownIcon={
        <View
          className='pr-6'
        >
          <Icon
              source='chevron-down'
              size={20}
              color={variant === "primary" ? '#000' : '#ffffff'}
              />
        </View>
        }
        _selectedItem={{
          _text: {
            fontSize: 16,
            fontWeight: "bold", 
            color: "#ffffff",
          },
          bg: "#083061", 
        }}
        _item={{
          bg: "#ffffff",
          _text: {
            fontSize: 16,
            fontWeight: "bold", 
          },
          marginBottom: 2,          
          borderRadius: 16

        }}
        _actionSheetContent={{
          bg: "#ffffff",
        }}
        paddingLeft={23}
      >
        {options.map((value, index) => (
          <Select.Item key={index} label={value.name} value={value.value} />
        ))}
      </Select>
    </Box>
  );
};

export default SelectField;
