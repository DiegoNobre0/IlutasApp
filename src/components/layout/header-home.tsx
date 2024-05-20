import { Appbar, Icon } from "react-native-paper";
import { Image, Text, TouchableOpacity, View } from "react-native"; 
import { useAuth } from "../../core";
import { Box, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const HeaderHome = () => {
  const {currentAccount, saveAccessToken, saveCurrentAccountToken } = useAuth();

  const handleLogout = () => {
    saveAccessToken(undefined)
    saveCurrentAccountToken(undefined)
    return;
  };

  const notifications = [{
    id: 1,
    title: 'Novo evento',
  }]

  const navigate = useNavigation();

  return ( 
      <Box className="bg-transparent flex-row justify-between mt-10 px-6 w-full">
        <View className="flex-row justify-start items-center gap-4">
          <View className="flex flex-col">
            <HStack
              className="flex-row items-center "
            >
              <Image
                source={require("../../assets/Logo-Fed.png")}
                className="w-8 h-8"
              />
              <Text className="text-black text-2xl pl-2 font-bold">
              FCJJE
              </Text>
              
            </HStack> 
          </View>
        </View>
        <Box
          className="flex flex-row justify-center items-center gap-4"
        >
          <Box className="flex-row gap-1">
            <Image
              source={require("../../assets/money-icon.png")}
              className=''
            />
            <Text className="text-[#FFB800] font-medium">
              300
            </Text>
          </Box>
        <TouchableOpacity className="w-8 h-8 rounded-full border border-white justify-center items-center"
          onPress={() => (navigate.navigate as any)('perfil')}
        >
            {currentAccount?.imagem ? (
              <Image
                source={{ uri: currentAccount.imagem }}
                className="object-contain w-[99%] h-[99%] rounded-full"
              />
            ) : (
              <View className="w-[99%] h-[99%] rounded-full bg-secondaryLight justify-center items-center">
                <Text className="text-lg font-bold text-white">{currentAccount?.name[0].toUpperCase()}</Text>
              </View>
            )}
          </TouchableOpacity> 
          <Box
            className="flex-row items-center justify-center"
          >
            {
              notifications.length > 0 ? (
                <Image
                  source={require("../../assets/bell-notificator-on.png")}
                  className=''
                />
              ) : (
                <Icon
                  source={'bell-outline'}
                  size={20}
                  color='#494949'
                />
              )
            }
          </Box>

        </Box>
      </Box> 
  );
};

export default HeaderHome;
