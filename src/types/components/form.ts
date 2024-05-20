import { IInputProps } from "native-base";

export type TextFieldInputProps = {
  label?: string;
  error?: string;
  variant?: "primary" | "secondary"
  leftIconName?: string;
  rightIconName?: string;
} & IInputProps;

export type CurrencyFieldInputProps = {
  placeholder?: string;
  error?: boolean;
  value?: string;
  message?: string;
  disabled?: boolean;
  className?: string;
};

export type SearchFieldInputProps = {
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
};

export type SelectFieldProps = {
  value?: string | number;
  options: SelectOptionsProps[];
  onChange?: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>;
  variant?: "primary" | "secondary";
  label?: string;
  isRequired?: boolean;
};

export type TextAreaFieldProps = {
  value?: string;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
};

export type SelectOptionsProps = {
  name: string;
  value: string | number;
};
