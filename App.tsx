import { extendTheme, NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { AuthProvider } from "./src/core";
import { Routes } from "./src/core/routes";
import { PaperProvider, Portal } from 'react-native-paper';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export default function App() {  
  return (
    <AuthProvider>
      <AutocompleteDropdownContextProvider>
      <NativeBaseProvider  
      > 
            <Routes /> 
      </NativeBaseProvider>
      </AutocompleteDropdownContextProvider>
    </AuthProvider>
  );
}
