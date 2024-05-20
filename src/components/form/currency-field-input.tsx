import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { CurrencyFieldInputProps } from "../../types";

const CurrencyFieldInput = ({
  placeholder,
  error,
  value,
  message,
  disabled,
  className,
}: CurrencyFieldInputProps) => {
  return (
    <View className="mb-4">
      <TextInput
        className={`rounded-[22px] border text-primary font-bold text-center text-[25px] bg-background ${
          error ? "border-danger" : "border-textSecondary"
        } w-full h-[80px] min-w-[300px] ${className}`}
        underlineStyle={{ backgroundColor: "transparent" }}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={"#39474F"}
        error={error}
        disabled={disabled}
      />
      {message && (
        <Text className="text-danger text-xs font-normal self-start px-4 mt-1">
          {message}
        </Text>
      )}
    </View>
  );
};

export default CurrencyFieldInput;
