import { useEffect, useState } from 'react'
import { EventInformation, Evento } from 'src/domain-types'
import { mockEvento } from './mock' 
import { Accordion, Box, Image, ScrollView, Text, View} from "native-base"; 
import { Icon, IconButton, PaperProvider, Portal } from 'react-native-paper'; 
import { Button, FeedbackCard, Field, HeaderHome, LinkCard, ModalFull, ModalScreen } from 'src/components';  
import { Share, TouchableOpacity } from 'react-native'; 
import { Accordeon } from 'src/components/general/accordeon';
import { useModal } from 'src/core';
import { ModalListagemAtletas } from './components/modal-lista-atleta';
import { useNavigation } from '@react-navigation/native';
import { ModalResultados } from './components/modal-resultados';

import {Linking} from 'react-native';

const shareWhatsApp = (text : string) => { 
    Linking.openURL (`whatsapp://send?text=${text} + \n + ${text}`); 
}


export const EventoPage = (navigation: {
  route: {
    params: {
      id?: string
    }
  },
  goBack: () => void
} ) => {

  const [event, setEvent] = useState<Evento | undefined>()

  const fetchEvent = async (id: string) => {
    // const response = await fetch(`https://api.example.com/events/${id}`)
    // const data = await response.json()
    // return data
    const data = mockEvento
    setEvent(data)
    
  }

  useEffect(() => {
    const id = navigation?.route.params.id
    if(!id) return

    fetchEvent(id)
  }, [navigation?.route.params.id])

  const [isModalListagemOpen, openModalListage, closeModalListagem] = useModal()
  const [isResultadosModalOpen, openResultadosModal, closeResultadosModal] = useModal()
  
  const navigate = useNavigation()

  return (
    <PaperProvider>
      <Portal>
        <ScrollView
          className='w-full h-full py-4'>
          <Box className="h-full w-full flex flex-col mt-4 px-6 pb-4">
              <View
                className='flex flex-row justify-start gap-0 items-center w-full'
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
                <Text className="text-base font-medium text-start">
                  Evento: {event?.name}
                </Text>   
            </View>
            
            <Box
              className='flex w-full flex-col pt-4   '
            >
            <Image 
              source={{ uri: event?.urlImagem }}
              alt={event?.name}
              className='w-full h-56 rounded-lg mb-4'
              resizeMode="stretch"
            /> 
            <LinkCard
              icon='scale-balance'
              title='Tabela de peso e idade'
              onPress={() => {
                console.log('click');
              }}
            />
            <LinkCard
              icon='campaign'
              material
              title='Avisos'
              onPress={() => {
                Share.share({
                  message: 'Baixe o iLutas e fique por dentro de todos os eventos de lutas do Brasil! https://www.ilutas.com.br',
                  url: 'https://www.ilutas.com.br',
                  title: 'Conheça - iLutas'
                });
              }}
            />
            <LinkCard
              icon='format-list-bulleted'
              title='Lista de inscritos'
              onPress={() => {
                openModalListage()
              }}
            />  
            <LinkCard
              icon='account-tree'
              title='Chaves'
              material
              onPress={() => {
                console.log('click');
              }}
            />  
            <LinkCard
              icon='calendar-blank-outline'
              title='Cronograma'
              onPress={() => {
                console.log('click');
              }}
            />
            <LinkCard
              icon='trophy-outline'
              title='Resultados'
              onPress={() => {
                openResultadosModal()
              }}
            />
            </Box>
  
            <Box 
              className='flex flex-col pt-4'>
                <View
                  className='mb-4'
                >
                  <Button
                    title={
                      true ? 'Inscrever' : 'Evento encerrado'
                    }
                    disabled={!true}
                    onPress={() => {
                      console.log('click');
                    }}
                  />
                </View>
                <View
                  className='mb-4'
                >
                  <Button
                    title="Transmissão"
                    onPress={() => {
                      console.log('click');
                    }}
                    disabled={true}
                    variant={'secondary'}
                  />
                </View>
            </Box>

            <Box
              className='flex flex-col'>
              <Text
                className='text-xl font-bold mt-2'>
                  Datas importantes
              </Text>
              <Field 
                title='Data do evento'
                description={event?.values.date ?? ''}
                icon='clock-outline'
              /> 
              <Field 
                title='Inscrições'
                description={event?.values.signDate ?? ''}
                icon='account-check-outline'
              />
              <Field 
                title='Pagamento'
                description={event?.values.payment ?? ''}
                icon='currency-usd'
              />
              <Field 
                title='Checagem geral'
                description={event?.values.generalCheck ?? ''}
                icon={'account-group-outline'}
                subtitle='(pesagem, documentação, etc)'
              />
              <Field 
                title='Checagem oficial'
                description={event?.values.oficialCheck ?? ''}
                icon={'account-group-outline'}
              />
              <Field 
                title='Checagem consulta'
                description={event?.values.consultCheck ?? ''}
                icon={'account-group-outline'}
              />
              <Field 
                title='Chaves'
                description={event?.values.keys ?? ''}
                icon='account-tree'
                material
              />
              <Field 
                title='Cronograma'
                description={event?.values.calendar ?? ''}
                icon='calendar'
              />
            </Box>

            <Box
              className='flex flex-col'>
              <Text
                className='text-xl font-bold mt-2 mb-4'>
                  Informações do evento	
              </Text>
              <Accordeon
                data={
                  Object.keys(event?.eventInformation ?? {}).sort(
                    (a, b) => event?.eventInformation[a as keyof EventInformation].order! - event?.eventInformation[b as keyof EventInformation].order!
                  ).map((key : any) => {
                    return {
                      summary: event?.eventInformation[key as keyof EventInformation].value,
                      content: event?.eventInformation[key as keyof EventInformation].content
                    }
                  })
                }
              />
            </Box>
            <Box
              className='flex flex-col'>
              <Text
                className='text-xl font-bold mt-2 mb-4'>
                  Mais	
              </Text>
              <Box
                className='flex flex-row justify-around items-center bg-white rounded-xl p-4'
              >
                <TouchableOpacity
                  className='items-center flex flex-col justify-center'
                >
                <Icon
                  source='file-document-outline'
                  size={28}
                  color='#083061'
                />
                <Text
                  className='text-[#494949]  mt-2'>
                      Documentos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className='items-center flex flex-col justify-center'>
                  <Icon
                    source='download-outline'
                    size={28}
                    color='#083061'
                  />
                  <Text
                    className='text-[#494949]  mt-2'>
                      Edital
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className='items-center flex flex-col justify-center'
                    onPress={
                      () => {
                        Share.share({
                          message: 'Baixe o iLutas e fique por dentro de todos os eventos de lutas do Brasil! https://www.ilutas.com.br',
                          url: 'https://www.ilutas.com.br',
                          title: 'Conheça - iLutas'
                        });
                      }
                    }
                  >
                  <Icon
                    source='share-variant-outline'
                    size={28}
                    color='#083061'
                  />
                  <Text
                    className='text-[#494949]  mt-2'>
                      Compartilhar
                  </Text>
                </TouchableOpacity>

              </Box>
            </Box>
            <Box
              className='flex flex-col pb-4'>
              <Text
                className='text-xl font-bold mt-2 mb-4'>
                  Organização	
              </Text>
              <Box
                className='flex flex-col p-4 rounded-lg bg-white'
              >
                <Text
                  className='text-[#000] font-medium'
                >
                Sobre a organização e campeonato
                </Text>
                <Text
                  className='text-[#494949] mt-2'>
                  {event?.organization.responsible}
                </Text>
                <Text
                  className='text-[#494949] mt-2'>
                    <Text 
                      className='text-[#000] font-bold'>
                        Email:
                    </Text> {event?.organization.email}
                </Text>
                <Text
                  className='text-[#494949] mt-2'>
                    <Text 
                      className='text-[#000] font-bold'>
                        Telefone:
                    </Text> {event?.organization.phone}
                </Text>
                <Box
                  className='flex flex-row mt-2'
                > 
                  <Icon
                    source='help-circle-outline'
                    size={20}
                    color='#000'
                  />
                  <Box>

                  <Text
                    className='text-[#494949] ml-2 pr-6'>
                    Está com alguma dúvida ou problema? 
                  </Text>
                  <Text
                    className='text-[#494949] ml-2 pr-6'>
                      Mande uma mensagem para gente.
                    </Text>
                  </Box>

                </Box>
                  <TouchableOpacity
                    className='flex flex-row items-center justify-center my-8'
                    onPress={() => {
                      shareWhatsApp('Já conhece o iLutas? Baixe o app e fique por dentro! https://www.ilutas.com.br')
                    }}
                  >
                    <Icon
                      source={'whatsapp'}
                      size={20}
                      color='#27BD69'
                    />
                    <Text
                      className='text-[#27BD69] ml-2 text-base'
                    >
                      Compartilhe via Whatsapp
                    </Text>
                  </TouchableOpacity>

              </Box>
            </Box>
          </Box>

        </ScrollView>

        {event && <ModalListagemAtletas
          isOpen={isModalListagemOpen}
          onClose={closeModalListagem}
          event={event}
        />}
        {
          event && <ModalResultados
            isOpen={isResultadosModalOpen}
            onClose={closeResultadosModal}
            event={event}
          />
        }


      </Portal>
    </PaperProvider>
  )
}