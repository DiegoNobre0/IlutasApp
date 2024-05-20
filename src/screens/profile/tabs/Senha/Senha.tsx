import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Box, Image, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { Icon, PaperProvider, Portal } from 'react-native-paper'; 
import { Button, LinkCard, ModalScreen, TextFieldInput } from 'src/components';
import { useAuth, useModal } from 'src/core';
import { ModalCadastroEquipe, ModalCadastroProfessor } from 'src/screens/auth';
import * as yup from "yup";

interface changePassword{
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export function ModalAlterarSenha({
  onClose
}: {
  onClose: () => void;
}) {  
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Campo obrigatório"),
    password:  yup.string().required("Campo obrigatório") ,
    confirmPassword: yup.string().required("Campo obrigatório").oneOf([yup.ref('password'), null as any], 'As senhas devem ser iguais') ,
  });
  const methods =
    useForm<changePassword>({
      resolver: yupResolver(schema as any),
      mode: "onChange",
    });

  const { control, formState, handleSubmit } = methods;
  const onSubmit: SubmitHandler<changePassword> = async (data) => {
    
    console.log(data);
    onClose(); 
 
    };

    return (
    <ModalScreen
      isOpen={true}
      title='Alterar Senha'
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
            <FormProvider 
              {...methods}
            >
               <>
               <Controller 
                control={control}
                name="currentPassword"
                render={({ field: { value, onChange }, ...rest }) => (
                  <TextFieldInput
                    value={value}
                    label='Senha atual'
                    onChangeText={onChange}
                    placeholder="Senha atual"
                    type='password' 
                    error={formState.errors.currentPassword?.message}
                    {...rest}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange }, ...rest }) => (
                  <TextFieldInput
                    value={value}
                    label='Nova senha'
                    onChangeText={onChange}
                    placeholder="Nova senha"
                    type='password' 
                    error={formState.errors.password?.message}
                    {...rest}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { value, onChange }, ...rest }) => (
                  <TextFieldInput
                    value={value}
                    label='Confirme a senha'
                    onChangeText={onChange}
                    placeholder="Confirme a senha"
                    type='password' 
                    error={formState.errors.confirmPassword?.message}
                    {...rest}
                  />
            )}
          />
        </>

            </FormProvider>
        <Button
          title="Salvar"
          className=''
          onPress={handleSubmit(onSubmit)}
          disabled={ !formState.isValid}
          // isLoading={isLoading}
        />  

            </Box>
        </ScrollView> 
    </ModalScreen>
    );
}