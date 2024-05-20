import dayjs from 'dayjs';
import { Box, Image, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, PaperProvider, Portal } from 'react-native-paper'; 
import { LinkCard, ModalScreen } from 'src/components';
import { useAuth, useModal } from 'src/core';
import { ModalCadastroEquipe, ModalCadastroProfessor } from 'src/screens/auth';
import RegisterForm from './tabs/register-form';

export function ModalAlterarDados({
  onClose
}: {
  onClose: () => void;
}) { 
  const {currentAccount, saveAccessToken, saveCurrentAccountToken } = useAuth();
  

  const [isModalEquipeOpen, openModalEquipe, closeModalEquipe] = useModal();
  const [isModalProfessorOpen, openModalProfessor, closeModalProfessor] = useModal();
 
  const [currentTab, setCurrentTab] = useState<number | undefined>(undefined);

  if(currentTab !== undefined){
    return(
      <>
      <ModalScreen
        isOpen={true}
        blueArrow
        title={
          currentTab === 1 ? 'Informações básicas' : 
          currentTab === 2 ? 'Informações do atleta' :
          currentTab === 3 ? 'Endereço' :
          'Contato'
        }
        onClose={() => {
          setCurrentTab(undefined);
        }}>
          <View
            className='w-full h-full px-4 pb-8'
          >
            <RegisterForm
              changeForm={
                () => setCurrentTab(undefined)
              }
              isLoading={false}
              openModalEquipe={openModalEquipe}
              openModalProfessor={openModalProfessor}
              step = {currentTab}            
              />
          </View>
        </ModalScreen>
              {
                isModalEquipeOpen && <ModalCadastroEquipe
                  onClose={closeModalEquipe}
                  isOpen={isModalEquipeOpen}
                  onSubmit={() => {}}
                />
              }
              {
                isModalProfessorOpen && <ModalCadastroProfessor
                  onClose={closeModalProfessor}
                  isOpen={isModalProfessorOpen}
                  onSubmit={() => {}}
                />
              }
      </>

    )
  }

    return (
    <ModalScreen
      isOpen={true}
      title='Alterar Dados'
      blueArrow
      onClose={onClose}
      styles={{
        backgroundColor: "#fff"
      }}
    > 
        <ScrollView
          className='w-full h-full'>
            <Box
              className='flex-1 items-center justify-start bg-white px-6'
            >   
              <Box
                className=' '
              >
                <Text
                  className='text-base mt-4 text-[#494949]'
                >
                  Perfil
                </Text>
                <LinkCard
                  className='px-0'
                  title='Informações básicas'
                  onPress={() => {
                    setCurrentTab(1);
                  }} 
                /> 
                <LinkCard
                  className='px-0'
                  title='Endereço'
                  onPress={() => {
                    setCurrentTab(3);
                  }} 
                />
                <LinkCard
                  className='px-0'
                  title='Contato'
                  onPress={() => {
                    setCurrentTab(4);
                  }}
                />
                <LinkCard
                  className='px-0'
                  title='Informações do atleta'
                  onPress={() => {
                    setCurrentTab(2);
                  }}
                />
              </Box>  
            </Box>
        </ScrollView> 
    </ModalScreen>
    );
}