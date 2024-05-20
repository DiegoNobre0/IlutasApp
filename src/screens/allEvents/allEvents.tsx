import { useEffect, useState } from 'react'
import { EventInformation, Evento } from 'src/domain-types'
import { mockEvento } from './mock'
import { Accordion, Box, Image, ScrollView, Text, View } from "native-base";
import { Icon, IconButton, PaperProvider, Portal } from 'react-native-paper';
import { Button, FeedbackCard, Field, HeaderHome, LinkCard, ModalFull, ModalScreen } from 'src/components';
import { Share, TouchableOpacity } from 'react-native';
import { Accordeon } from 'src/components/general/accordeon';
import { useModal } from 'src/core';
import { useNavigation } from '@react-navigation/native';
import { EventCard } from 'src/components/related';
import { Linking } from 'react-native';

export const AllEventsPage = (navigation: {
  // route: {
  //   params: {
  //     id?: string
  //   }
  // },
  goBack: () => void
}) => {

  const [event, setEvent] = useState<Evento | undefined>()

  const fetchEvent = async (id: string) => {
    // const response = await fetch(`https://api.example.com/events/${id}`)
    // const data = await response.json()
    // return data
    const data = mockEvento
    setEvent(data)
  }

  const [events, setEvents] = useState([{
    id: '1',
    title: 'Evento X',
    date: new Date().toISOString(),
    expireDate: new Date('2024-04-01').toISOString(),
    image: 'https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=720&h=440&crop=1',
  },
  {
    id: '2',
    title: 'Evento Y',
    date: new Date().toISOString(),
    expireDate: new Date('2024-04-01').toISOString(),
    image: 'https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=720&h=440&crop=1',
  },
  {
    id: '3',
    title: 'Evento Z',
    date: new Date().toISOString(),
    expireDate: new Date('2024-04-01').toISOString(),
    image: 'https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=720&h=440&crop=1',
  }]);


  useEffect(() => {    
    // const id = navigation?.route.params.id    
    // if(!id) return

    // fetchEvent(id)
  }, [navigation])


  const navigate = useNavigation()

  return (
    <PaperProvider>
      <Portal>
        <ScrollView
          className='w-full h-full py-4'>
          <Box className="h-full w-full flex flex-col mt-4 px-6 pb-4">
            <View
              className='flex flex-row justify-start gap-0 items-center w-full'
              style={{
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigate.goBack()}
                className='flex items-center justify-center rounded-full w-6 h-10'
              >
                <Icon
                  source='chevron-left'
                  size={24}
                  color='#000'
                />
              </TouchableOpacity>
              <Text className="text-base font-medium text-start"
              >
                Todos os próximos eventos
              </Text>
            </View>
            <Box className='space-y-4'>
              {
                events.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}                    
                  />
                ))
              }
            </Box>
          </Box>
        </ScrollView>
      </Portal>
    </PaperProvider>
  )
}