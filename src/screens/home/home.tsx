import { useEffect, useState, useRef } from "react";
import { Box, Image, ScrollView, Text, View } from "native-base";
import { Icon, PaperProvider, Portal } from 'react-native-paper';
import { Button, FeedbackCard, HeaderHome, LinkCard } from 'src/components';
import { EventCard } from 'src/components/related';
import Carrousel from 'src/components/general/carrousel';
import { Share, TouchableOpacity } from 'react-native';
import { useAuth } from 'src/core';
import { useNavigation } from "@react-navigation/native";

export const HomePage = () => {

  const navigate = useNavigation();

  const [pendencias, setPendencias] = useState([{
    title: 'Você tem 1 pendencia',
    description: 'Seu pagamento para a inscrição do evento X ainda está pendente. Por favor, clique aqui para concluir o processo de pagamento.',
  }]);

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

  const [liveTransmission, setLiveTransmission] = useState<Array<{
    id: string;
    title: string;
    date: string;
    expireDate: string;
    image: string;
    url: string;
  }> | undefined>([{
    id: '1',
    title: 'Evento X',
    date: new Date().toISOString(),
    expireDate: new Date('2024-04-01').toISOString(),
    image: 'https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=720&h=440&crop=1',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  }]);

  const { currentAccount } = useAuth();

  return (
    <PaperProvider>
      <Portal>
        <ScrollView
          className='w-full h-full'>

          <HeaderHome />
          <Box className="h-full w-full flex flex-col gap-1 px-6 mt-4">
            <Text className="text-base font-medium text-start mb-4">Bem-vindo(a), usuário(a)!</Text>
            {
              pendencias.length > 0 && <Box
                className='mb-8'
              >
                <FeedbackCard
                  title="Você tem 1 pendencia"
                  description={
                    <>
                      Seu pagamento para a inscrição do evento X ainda está pendente. Por favor, <Text style={{ fontWeight: 'bold' }}
                        onPress={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('click');
                        }}
                      > clique aqui </Text> para concluir o processo de pagamento.
                    </>
                  }
                  onPress={() => {
                    const newPendencias = pendencias.filter((pendencia) => pendencia.title !== 'Você tem 1 pendencia');
                    setPendencias(newPendencias);
                  }}
                />
              </Box>}

            <Box
              className='flex w-full flex-col '
            >
              <Box
                className='flex w-full justify-between'
                style={{ flexDirection: 'row' }}
              >
                <Text
                  className='font-bold text-lg mb-4'>
                  Próximos eventos
                </Text>
                <Text
                  className='text-lg mb-4'
                  style={{ color: '#083061', fontSize: 22 }}
                  onPress={() => {
                    (navigate.navigate as any)('AllEvents');
                  }}>
                  Ver todos
                </Text>
              </Box>
              <Carrousel>
                {
                  events.map((event, index) => (
                    <EventCard
                      key={index}
                      event={event}
                    />
                  ))
                }

              </Carrousel>
            </Box>

            <Box
              className='flex w-full flex-col pt-4 '
            >
              <Text
                className='font-medium text-base mb-4'>
                Filiações
              </Text>
              <Button
                title='Filiar'
                onPress={() => {
                  console.log('click');
                }}
              />
              <Box
                className='flex w-full flex-row justify-between pt-4 mb-4 h-40 gap-2'
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log('click');
                  }}
                  className='flex justify-center items-center  bg-white w-[calc(48%)] rounded-xl '
                >
                  <Text
                    className='text-[#083061]'
                  >
                    Benefícios
                  </Text>
                  <Image
                    source={require('../../assets/hand-money.png')}
                    alt='beneficios'
                    className='w-6 h-6 mt-2'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log('click');
                  }}
                  className='flex justify-center items-center  bg-white w-[calc(49%)] rounded-xl '
                >
                  <Text
                    className='text-[#083061] mb-2'>
                    Atletas filiados
                  </Text>
                  <Icon
                    source='card-account-details-outline'
                    size={24}
                    color='#083061'
                  />
                </TouchableOpacity>
              </Box>

            </Box>

            <Box
              className='flex w-full flex-col pt-4 '
            >
              <Text
                className='font-medium text-base mb-4'>
                Serviços
              </Text>
              <View
                className='flex w-full flex-row   h-32 justify-between '>
                {
                  new Array(4).fill(0).map((_, index) => (
                    <View
                      key={index}
                      className='w-1/5 h-1/2 aspect-square'
                    >
                      <TouchableOpacity
                        onPress={() => {
                          console.log('click');
                        }}
                        className='flex justify-center items-center  bg-white rounded-xl w-full h-full'
                      >


                      </TouchableOpacity>
                      <Text
                        className='text-center text-xs mt-2'
                      >
                        Serviço {index + 1}
                      </Text>
                    </View>
                  ))
                }
              </View>
            </Box>

            <Box
              className='flex w-full flex-col'
            >
              <Text
                className='font-medium text-base mb-4'>
                Transmissão ao vivo
              </Text>
              {
                !liveTransmission && <Box
                  className='flex w-full items-center flex-row gap-2'
                >
                  <Image
                    source={require('../../assets/transmissao.png')}
                    alt='beneficios'
                    className='w-4 h-4'
                  />
                  <Text
                    className='text-[#34454F] text-xs pr-12'
                  >
                    Não há nenhum evento sendo transmitido nesse momento.
                  </Text>

                </Box>}
              {
                liveTransmission && <Carrousel
                  height={450}
                >
                  {
                    liveTransmission.map((event, index) => (
                      <View
                        key={index}
                        style={{
                          height: 400,
                        }}
                      >
                        <EventCard
                          event={{
                            id: event.id,
                            title: event.title,
                            date: event.date,
                            expireDate: event.expireDate,
                            image: event.image,
                            url: event.url,
                          }}
                          reduced
                        />
                        <View
                          className='pt-4'
                        >
                        </View>
                      </View>
                    ))
                  }

                </Carrousel>

              }
            </Box>

            <Box
              className='pt-6'
            >

              <Text
                className='font-medium text-base'>
                Outros
              </Text>
              <Box
                className='flex w-full flex-row justify-between pt-4 mb-4 h-40 gap-2'
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log('click');
                  }}
                  className='flex justify-center items-center  bg-white w-[calc(48%)] rounded-xl '
                >
                  <Text
                    className='text-[#083061]'
                  >
                    Benefícios
                  </Text>
                  <Image
                    source={require('../../assets/hand-money.png')}
                    alt='beneficios'
                    className='w-6 h-6 mt-2'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log('click');
                  }}
                  className='flex justify-center items-center  bg-white w-[calc(49%)] rounded-xl '
                >
                  <Text
                    className='text-[#083061] mb-2'>
                    Atletas filiados
                  </Text>
                  <Icon
                    source='card-account-details-outline'
                    size={24}
                    color='#083061'
                  />
                </TouchableOpacity>
              </Box>
            </Box>

            <Box
              className='flex w-full flex-col pt-4 pb-8 '
            >
              <LinkCard
                icon='support-agent'
                title='Precisa de ajuda?'
                onPress={() => {
                  console.log('click');
                }}

                material
              />
              <LinkCard
                icon='message-star-outline'
                title='Indique para amigos'
                onPress={() => {
                  Share.share({
                    message: 'Baixe o iLutas e fique por dentro de todos os eventos de lutas do Brasil! https://www.ilutas.com.br',
                    url: 'https://www.ilutas.com.br',
                    title: 'Conheça - iLutas'
                  });
                }}
              />
              <LinkCard
                icon='star-outline'
                title='Avalie o app'
                onPress={() => {
                  console.log('click');
                }}
              />
            </Box>

          </Box>
        </ScrollView>

      </Portal>
    </PaperProvider>

  );
};
