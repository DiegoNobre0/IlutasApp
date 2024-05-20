import { Box } from 'native-base';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

interface AutocompleteDropdownProps {
  options: any[]; // Seu conjunto de dados para sugestões 
  value?: any;
  onChange?: (value: string | number | null) => void
  placeholder?: string
  label?: string
  isRequired?: boolean
  error?: string
  initialValue?: any
}

export const CustomAutocomplete: React.FC<AutocompleteDropdownProps> = (
  {
    options,
    value,
    onChange,
    placeholder,
    label,
    isRequired = false,
    error,
    initialValue
  }
) => { 
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return <Box className=" w-full"
  >
  {
    label && (
      <Text className="text-sm font-medium mb-2">
        {label}
        {isRequired && <Text className="text-danger">*</Text>}
      </Text>
    )
  }
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      initialValue={initialValue as any} 
      closeOnSubmit={false} 
      trimSearchText={true}
      emptyResultText='Nenhum resultado encontrado'
      onSelectItem={
        (item : any) => {
          setSelectedItem(item);
          onChange && onChange(item?.id ?? '');
        }
      } 
      dataSet={options}
      inputContainerStyle={{
        borderWidth: 1,
        borderColor: '#ABABAB99',
        borderRadius: 16, 
        padding: 6,
        backgroundColor: 'white',
      }}
    />
    {error && (
      <Text className="text-[#F15959] text-sm font-medium self-start list-item">
        {error}
      </Text>
    )}
  </Box>

};
 