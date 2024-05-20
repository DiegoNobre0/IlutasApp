import { Appbar } from "react-native-paper"; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HeaderMenuProps } from "../../types";

const HeaderMenu = ({ title, returnPath }: HeaderMenuProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleReturnPath = (path: string) => {
    navigation.navigate(path);
  };

  return (
    <>
      <Appbar.Header className="bg-transparent h-full">
        <Appbar.BackAction
          color="#ffffff"
          size={22}
          onPress={() => handleReturnPath(returnPath)}
        />
        <Appbar.Content
          title={title}
          titleStyle={{ fontSize: 14, fontWeight: "bold", color: "#ffffff" }}
        />
        <Appbar.Action
          icon="home"
          color="#ffffff"
          size={22}
          onPress={() => handleReturnPath("Home")}
        />
      </Appbar.Header>
    </>
  );
};

export default HeaderMenu;
