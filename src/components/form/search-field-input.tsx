import { TextInput } from "react-native-paper";
import { SearchFieldInputProps } from "../../types";

const SearchFieldInput = ({ value, onChange }: SearchFieldInputProps) => {
  return (
    <TextInput
      className={`rounded-lg text-sm bg-white w-full my-4`}
      underlineStyle={{ backgroundColor: "#fff" }}
      placeholder={"Pesquise aqui"}
      placeholderTextColor={"#B3BFDA"}
      value={value ?? ""}
      onChange={(e) => {
        onChange && onChange(e.nativeEvent.text)
      }}
      right={<TextInput.Icon size={24} icon={"tune-variant"} color={"#083061"} />}
    />
  );
};

export default SearchFieldInput;
