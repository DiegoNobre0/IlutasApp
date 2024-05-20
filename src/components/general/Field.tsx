import { Text, View } from 'native-base';
import { Icon } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export function Field({
  title,
  description,
  icon,
  subtitle,
  material
} :{
  title: string;
  description: string;
  icon: string;
  subtitle?: string;
  material?: boolean;
}) {
  return (
    <View
      className='w-full flex flex-col gap-2 mb-4'>
      <View
        className='flex w-full flex-row gap-2'
      >
        <View
          className='flex justify-between items-start flex-row h-full'
        >
          {
            material ? <MaterialIcons
              name={icon as any}
              size={22}
              color='#000'/> 
              :
            <Icon
            source={icon}
            size={22}
            color='#000'
          />}
        </View>
        <View
          className='flex flex-col'>
          <Text
            className='text-black'>
            {title}
          </Text>
          <Text
            className='text-[#494949]'>
            {description}
          </Text>
        </View>

      </View>
      {subtitle && <Text
        className='text-[#494949] pl-10'>
        {subtitle}
      </Text>}
    </View>

  )
}
