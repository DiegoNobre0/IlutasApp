import { KeyboardAvoidingView } from 'native-base';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardScrollView = ({ children }:
  { children: React.ReactNode }
  ) => (
  <KeyboardAvoidingView 
  behavior="position" 
  keyboardVerticalOffset={250}
  >
    {children}
  </KeyboardAvoidingView>
);