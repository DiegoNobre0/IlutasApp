import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';  
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type LinkCardProps = {
  icon?: string;
  title: string;
  onPress: () => void;
  material?: boolean;
  ionic?: boolean;
  className?: string;
};

export const LinkCard :React.FC<LinkCardProps> = ({icon, title, onPress, material, ionic, className}) => {
  return  <TouchableOpacity 
    onPress={onPress}
    className={'flex w-full bg-white mb-4 flex-row justify-between items-center py-4 rounded-xl ' + (className ?? 'px-3')}
  >
    <View
      className='flex justify-between items-center flex-row h-full'
    >
      {
        !icon ? null : ionic ? <Ionicons
          name={icon as any}
          size={20}
          color='#000'
        /> :
        material ? <MaterialIcons
          name={icon as any}
          size={20}
          color='#000'/> 
          :
        <Icon
        source={icon}
        size={20}
        color='#000'
      />}
      <Text
        className={`text-black  ${!!icon ? 'ml-2' : ''}`}>
        {title}
      </Text>
    </View>
    <View
      className='flex justify-between items-center flex-row h-full'
    >
      <Icon
        source='chevron-right'
        size={20}
        color='#083061'
      /> 
    </View>
  </TouchableOpacity> 
}
