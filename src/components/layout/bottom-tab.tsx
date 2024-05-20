import { Image, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { Cache, useAuth } from 'src/core';

export function TabBar({ state, descriptors, navigation } : any) {

  const getIcon = (route: string) => {
    switch (route) { 
      case 'Inscrições':
        return 'note-edit-outline';
      case 'Serviços':
        return 'wrench';
      case 'Filiação':
        return 'card-account-details-outline';
      default:
        return 'home';
    }
  }

  const {saveAccessToken, saveCurrentAccountToken} = useAuth()

  return (
    <View style={{ flexDirection: 'row',
      backgroundColor: '#ffffff',
    }}>
      {state.routes.map((route : any, index : number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if(label === 'Eventos' || label === 'perfil') 
        return <></>

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if(label === 'Atletas'){
            saveAccessToken(undefined)
            saveCurrentAccountToken(undefined)
            return
          } 

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 6,
              gap: 2,
            }}
          >
            {
              label === 'Atletas' ? 
              <Image source={require('../../assets/Logo-vector-gray.png')} alt="Atletas" 
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isFocused ? '#083061' : '#ACACAC',
                }}
              />
              : <Icon
              source={getIcon(label)}
              size={24}
              color={isFocused ? '#083061' : '#ACACAC'}
              /> 

            } 
            <Text style={{ color: isFocused ? '#083061' : '#ACACAC' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
