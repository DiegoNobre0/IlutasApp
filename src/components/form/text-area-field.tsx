import { TextArea } from "native-base";
import { TextAreaFieldProps } from "../../types";

const TextAreaField = ({
  value,
  placeholder,
  onChange,
}: TextAreaFieldProps) => {
  return (
    <TextArea
      autoCompleteType={false}
      h={100}
      minHeight={100}
      placeholder={placeholder}
      alignSelf={"center"}
      shadow={1}
      borderColor={"#39474F"}
      backgroundColor={"#F2F2F2"}
      placeholderTextColor={"#39474F"}
      fontSize={16}
      fontWeight={"medium"}
      color={"#39474F"}
      // value={value ?? ""}
      onChange={(e) => {
        onChange && onChange(e.nativeEvent.text);
      }}
      _focus={{
        fontSize: 16,
        fontWeight: "medium",
        color: "#39474F",
        borderColor: "#39474F",
        backgroundColor: "#F2F2F2",
      }}
      rounded={30}
    />
  );
};

export default TextAreaField;
