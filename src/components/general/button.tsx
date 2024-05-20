import { Text, Box, Button as BaseButton } from "native-base";
import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  className,
  isLoading,
  variant = "primary",
  ...rest
}) => {
  return (
    <Box
      className={className + " w-full"}
      minWidth={150}
      height={51}
      borderRadius={8}
      borderWidth={variant === "primary" && !disabled ? 0 : 1} 
      opacity={disabled ? 0.75 : 1}
      bgColor={
        variant === "primary"
          ? 
            disabled ? '#CACACA00' :
          '#083061'
          : "#FFFFFF"
      }
      borderColor={
        disabled ? "#CACACA" : "#083061"
      }
    >
      <BaseButton
        className="h-full w-full normal-case rounded-lg justify-center items-center"
        bgColor={"transparent"}
        disabled={disabled}
        isLoading={isLoading}
        onPress={onPress}
        _spinner={{
          color: "white",
        }}
        _pressed={{
          opacity: 0.75,
        }}
        {...rest}
      >
        {title && (
          <Text
            className={`text-base normal-case ${
              variant === "primary" ? "text-white" : "text-[#083061]"
            } 
            ${disabled ? " text-[#CACACA] " : ""}
            font-bold`}
          >
            {title}
          </Text>
        )}
      </BaseButton>
    </Box>
  );
};

export default Button;
