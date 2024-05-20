import dayjs from 'dayjs';
import { Box, Image, Text } from 'native-base';
import { Icon } from 'react-native-paper';
import { Button } from '../general';
import { useNavigation } from '@react-navigation/native';


type Event = {
  title: string;
  date: string;
  image: string;
  id: string;
  expireDate: string;
  url?: string;
  

};

type EventCardProps = {
  event: Event;
  reduced?: boolean;
};


export const EventCard :React.FC<EventCardProps> = ({event, reduced}) => {

  const navigate = useNavigation();

  return (
    <Box
      className='w-full p-4 bg-white rounded-[18px] mb-4 '
    >
      <Image
        source={{ uri: event.image }}
        alt={event.title}
        className='w-full h-64 rounded-lg'
        resizeMode="stretch"
      />
      <Text
        className='text-xl font-bold mt-2'
      >
        {event.title}
      </Text>
      <Box 
        className='flex flex-col  pt-2'
      > 
        <Box
          className='flex flex-row gap-4 items-center mb-4'
        >
          <Box
            className='flex flex-row items-center text-[#494949]'
          >
            <Icon
              source='calendar'
              size={20}
              color='#000000'
              />
              <Text
                className='text-[#494949] ml-1'
              >
                {
                  dayjs(event.date).format('DD/MM/YYYY')
                }
              </Text>
          </Box>  
          {
            !reduced && <Box
            className='flex flex-row items-center text-[#494949]'
          >
            <Icon
              source='clock-outline'
              size={20}
              color='#000000'
              />
              <Text
                className='text-[#494949] ml-1'
                >
                  {
                    dayjs(event.expireDate).diff(dayjs(), 'days') > 0 ? 
                    dayjs(event.expireDate).diff(dayjs(), 'days') + ' dias restantes' :
                    'Evento encerrado'
                  }
              </Text>
          </Box> 
          } 
        </Box>
          {
            !reduced && <Box
              className='flex flex-row items-center text-[#494949]'
            >
              <Icon
                source='map-marker-outline'
                size={20}
                color='#000000'
                />
                <Text
                  className='text-[#494949] ml-1'>
                  São Paulo/SP
                </Text>
            </Box> 
          }
          {
            reduced && event.url && <Box
              className='flex flex-row items-center justify-center mt-4'
            >
               <Button
              title='Ver transmissão'
              onPress={() => {
              }}
              />
            </Box>
          }
      {
        !reduced && (
          <Box>
            <Button 
              title='Inscrever'
              onPress={() => {
                (navigate.navigate as any)('BuyEvent', { id: event.id });
              }} 
              className='mt-4 '
              />
            <Text
              className='text-[#083061] mt-4 underline text-center' onPress={() => {
                (navigate.navigate as any)('Eventos', { id: event.id });
              }} >
                Mais informações
            </Text>
          </Box>
        )
      }
      </Box>
    </Box>
  );
}