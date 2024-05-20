import dayjs from 'dayjs';
import { Box, Image, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, PaperProvider, Portal } from 'react-native-paper';
import { LinkCard } from 'src/components';
import { useAuth } from 'src/core';
import { CreateAccountFormInput } from 'src/domain-types';
import { ModalAlterarDados } from './tabs/dados/dados';
import { ModalAlterarSenha } from './tabs/Senha/Senha';


export function ProfilePage() {
  const mockData: CreateAccountFormInput = {
    name: "João da Silva",
    cpf: "123.456.789-00",
    password: "senha123",
    confirmPassword: "senha123",
    email: "joao@example.com",
    phone: "(12) 3456-7890",
    gender: 1,
    birthDate: "1990-01-01",
    athleteInfo: {
      team: "Time A",
      teacher: "Professor X",
      sport: "Futebol",
      graduation: "Avançado",
      weight: "75",
      weightDressed: "80",
      isSpecial: false,
      superClass: "Categoria A",
      superSubClass: "Subcategoria B"
    },
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "Cidade Exemplo",
      state: "Estado Exemplo",
      cep: "12345-678"
    }
  };
  const {currentAccount, saveAccessToken, saveCurrentAccountToken } = useAuth();

  const [currentTab, setCurrentTab] = useState<string | undefined>(undefined);
 
    if(currentTab === 'alterar-dados') 
    return <ModalAlterarDados
      onClose={() => {
        setCurrentTab(undefined);
      }}
    /> 
    if(currentTab === 'alterar-senha')
    return <ModalAlterarSenha
      onClose={() => {
        setCurrentTab(undefined);
      }}
    />
    
    return (
    <PaperProvider>
      <Portal>
        <ScrollView
          className='w-full h-full'>
            <Box
              className='flex-1 items-center justify-start bg-white px-6 mt-10'
            >  
              <Box
                className='bg-[#F2F2F2] w-full px-[10px] py-4 rounded-lg items-center justify-center'
              >
                  <View className="w-20 h-20 rounded-full border border-white justify-center items-center">
                      {currentAccount?.imagem ? (
                        <Image
                          source={{ uri: currentAccount.imagem }}
                          className="object-contain w-[99%] h-[99%] rounded-full"
                        />
                      ) : (
                        <View className="w-[99%] h-[99%] rounded-full bg-secondaryLight justify-center items-center">
                          <Text className="text-xl font-bold text-white">{currentAccount?.name[0].toUpperCase()}</Text>
                        </View>
                      )}
                  </View> 
                <Text className="text-2xl font-bold text-center">
                  {currentAccount?.name}
                </Text>
                <Text className="text-sm text-center text-[#494949]">
                  {dayjs(currentAccount?.birthDate).format('DD/MM/YYYY')}, {currentAccount?.athleteInfo?.graduation},
                  {currentAccount?.athleteInfo?.weight}kg
                </Text>
                <Text className="text-sm text-center text-[#494949]">
                  {currentAccount?.athleteInfo?.team}
                </Text>
                <Text className="text-sm text-center text-[#494949]">
                  {currentAccount?.athleteInfo?.teacher}
                </Text>
                <Text className="text-sm text-center text-[#494949]">
                  {currentAccount?.email}
                </Text> 
              </Box> 
              <Box
                className=' border-b-[1px] border-[#CACACA]'
              >
                <Text
                  className='text-base mt-4 text-[#494949]'
                >
                  Perfil
                </Text>
                <LinkCard
                  className='px-0'
                  title='Alterar Dados'
                  onPress={() => {
                    setCurrentTab('alterar-dados');
                  }}
                  icon='pencil-outline'
                /> 
                <LinkCard
                  className='px-0'
                  title='Alterar Senha'
                  onPress={() => {
                    setCurrentTab('alterar-senha');
                  }}
                  icon='lock-outline'
                />
              </Box>
              <Box
                className='pb-4 border-b-[1px] border-[#CACACA]'
              >
                <Text
                  className='text-base mt-4 text-[#494949]'
                >
                  Mais
                </Text>
                <LinkCard
                  className='bg-black'
                  ionic
                  title='Meus resultados'
                  onPress={() => {}}
                  icon='podium'
                /> 
                <LinkCard
                  className='px-0'
                  title='Meus ingressos'
                  onPress={() => {}}
                  icon='ticket'
                />
                <LinkCard
                  className='px-0'
                  title='Configurações'
                  onPress={() => {}}
                  icon='cogs'
                />
                <LinkCard
                  className='px-0'
                  title='Fale conosco'
                  onPress={() => {}}
                  icon='support-agent'
                  material
                />
              </Box>
              <Box
                className='py-4 flex-row items-center justify-start w-full'>
                  <TouchableOpacity
                    className='flex-row items-center justify-start'
                    onPress={() => {
                      saveAccessToken(undefined);
                      saveCurrentAccountToken(undefined);
                    }}
                  >

                  <Text
                    className='text-[#000] pr-2'
                  >
                    Sair 
                  </Text>
                  <Icon  
                      source='logout'
                      size={20}
                      color='#083061'
                      />
                </TouchableOpacity>

              </Box>
            </Box>
        </ScrollView>
      </Portal>
    </PaperProvider>
    );
}