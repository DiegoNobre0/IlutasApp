import { Box, IconButton, Input, Text } from "native-base";
import { TextFieldInputProps } from "../../types"; 
import { useState } from 'react';
import { Icon } from 'react-native-paper';

const TextFieldInput = ({
  label,
  error,
  className,
  isRequired,
  isReadOnly,
  placeholder,
  leftIconName,
  rightIconName,
  type,
  variant = "primary",
  onChangeText,
  mask,
  value,
  ...rest
}: TextFieldInputProps) => {

  const [isPassword, setIsPassword] = useState(true);

  return (
    <Box className="mb-4 w-full"
    >
      {
        label && (
          <Text className="text-sm font-medium mb-2">
            {label}
            {isRequired && <Text className="text-danger">*</Text>}
          </Text>
        )
      }
      <Input
        bgColor={variant === "primary" ? "#FFFFFF" : "#F2F2F2"}
        className={`text-sm bg-transparent ${className}`}
        width={"full"}
        minWidth={300} 
        value={
          mask && value ? mask(value) : value
        }
        height={54}
        borderRadius={16}
        fontSize={"sm"}
        fontWeight={"medium"}
        placeholder={placeholder}
        placeholderTextColor={"#39474F"}
        color={"#39474F"}
        borderColor={error ? "#D70000" : "#ABABAB99"}
        _focus={{
          bgColor: variant === "primary" ? "#FFFFFF" : "#F2F2F2",
          borderColor: error ? "#D70000" : "#083061",
        }}
        InputLeftElement={
          leftIconName ? (
            <Icon source={leftIconName} color={"#494949"} 
              size={20}
            />  
          ) : undefined
        }
        onChangeText={
          mask && onChangeText ? (text) => onChangeText(mask(text)) : onChangeText
        }
        InputRightElement=
        {type === "password" ? (
          // <TouchableOpacity onPress={() => setIsPassword(localType === "password" ? "text" : "password")}>
            <IconButton className=" w-12 h-full flex items-center justify-center"
              onPress={() => setIsPassword(!isPassword)}
            >
              
              <Icon source={isPassword ? "eye-off-outline" : "eye-outline"} color={"#494949"} 
                size={20}
              />  
            </IconButton>
          // </TouchableOpacity>
        ) : undefined}
        type={
          type === "password" ? isPassword ? "password" : "text" : type
        }
        {...rest}
      />
      {error && (
        <Text className="text-[#F15959] text-sm font-medium self-start list-item">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default TextFieldInput;
