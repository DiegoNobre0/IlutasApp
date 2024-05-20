import { Box, Spinner, Text } from "native-base";
import { Controller, Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ModalFull, TextFieldInput } from "../../../../components";
import { ForgotPasswordFormInput } from "../../../../domain-types";
import { Masks } from 'src/utils';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { CodeInput } from 'src/components/form/code-input';
import { Icon, Portal } from 'react-native-paper';
import { AuthService } from 'src/services';
import { useAuth } from 'src/core';

type Props = { 
  isLoading: boolean;
  changeForm: (form: 'login' | 'reset-password' | 'create-account') => void;
};


const ResetPasswordForm = ({ isLoading, changeForm }: Props) => {
  const [step, setStep] = useState(0);

  const schema = yup.object().shape({
    cpf: yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    password: step === 3 ? yup.string().required("Campo obrigatório") : yup.string(),
    confirmPassword: step === 3 ? yup.string().required("Campo obrigatório").oneOf([yup.ref('password'), null as any], 'As senhas devem ser iguais') : yup.string(),
  });
  const methods =
    useForm<ForgotPasswordFormInput>({
      resolver: yupResolver(schema as any),
      mode: "onChange",
    });

  const { control, formState, handleSubmit } = methods;


  const [validationMethod, setValidationMethod] = useState<'email' | 'phone' | 'no-access'>('phone');

  const { saveAccessToken, saveCurrentAccountToken } = useAuth();

  const onSubmit: SubmitHandler<ForgotPasswordFormInput> = async (data) => {
    if(step === 0) {
      setStep(1);
      return;
    }
    if(step === 1) {
      setStep(2);
      return;
    }
    if(step === 2) {
      setStep(3);
      return;
    }

    console.log(data);
    setStep(4);

    const response = '123';
    console.log(response);
    const user = await AuthService.GetCurrentAccount();
    console.log('user', user);

    setTimeout(() => {
          saveAccessToken(response);
          saveCurrentAccountToken(user);  
    }, 3000); 
 
    };

  return (
    <FormProvider
      {...methods}
    >
      {
        step <3 ? 
        <Text className="text-2xl font-bold mb-4 text-center">Recuperação de conta</Text>
        : 
        <Text className="text-2xl font-bold mb-4 text-center">Crie nova senha</Text>
      }
      {
        step === 0 && <Text className="text-[#494949]  mb-4 text-center">Por favor, forneça-nos seu CPF para que possamos verificar se há um perfil correspondente à sua conta.</Text>
      }
     {
      step === 0 && <Controller
        control={control}
        name="cpf"
        render={({ field: { value, onChange }, ...rest }) => (
          <TextFieldInput
            value={value}
            label='CPF'
            onChangeText={onChange}
            mask={Masks.CPFMask}
            keyboardType='numeric'
            placeholder="000.000.000-00" 
            error={formState.errors.cpf?.message}
            {...rest}
          />
        )}
      />  }
      
      {
        step === 1 &&(
          validationMethod === 'no-access' ?
          <Box
              className="w-full flex flex-col justify-start items-start break-words"
            >
              <Text className="text-[#494949]  mb-4 text-start">Não tem mais acesso ao e-mail? Siga as instruções abaixo para recuperação de conta.</Text>
              <Text className="text-[#494949]  mb-4 text-start">1. Mande um email para email@email.com</Text>
              <Text className="text-[#494949]  mb-4 text-start">2. Lorem Ipsum</Text>
            </Box>
            :          
          <Text className="text-[#494949]  mb-4 text-center">
          {
            validationMethod === 'email' ?
            `Identificamos o e-mail email@exemplo.com em nosso sistema. Você tem acesso ao e-mail?`
            :
            `Identificamos o número (00) 00000-000 em nosso sistema. Confirma se este é o seu número atual?` 
          }
        </Text>
        )
      }
      

      {
        step === 1 && <>

        </>
      }
      {
        step === 2 && <>
          <Text className="text-[#494949]  mb-4 text-start">Enviamos um código de validação para o {
            validationMethod === 'phone' ? <>
              número <Text className='font-bold'>(00) 00000-000.</Text> Por favor, insira-o abaixo.
            </> :
            <>
              e-mail <Text className='font-bold'>email@exemplo.com.</Text> Por favor, insira-o abaixo.
            </>
          }
          </Text>
          <CodeInput 
            dispositivo='email'
            getCode={() => '1234'}
            setCodigoValido={
              () => console.log('Código válido')
            }
          
          />
        </> 
      }
      {
        step === 3 && <>
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
      }
      {
        step === 4 && <Portal>

          <ModalFull
            isOpen={true}
            onClose={() => {}}
            title=''

          >
            <Box
            className=" flex flex-col justify-center items-center gap-8" 
            >
              <Box
                className='bg-[#27BD69] text-white h-32 w-32 rounded-full flex justify-center items-center'
              >
                <Icon 
                  source='checkbox-marked-circle-outline'
                  size={48}
                  color='white'
                  />
              </Box>
              <Text 
                className='!text-textPrimary font-bold mt-4 text-xl'>
                  Parabéns!!!!
                </Text>
              <Text
                className='text-textSecondary mt-4 text-center px-6'>
                Sua conta está pronta para uso. Você irá ser redirecionado para a página inicial em um alguns segundos...
              </Text>
              <Spinner
                color={'#87898E'}
                size={56}
              />
            </Box>
          </ModalFull>
        </Portal>
      }
      {
        step !== 4 && <Button
        className=""
        title={
          step === 0 ? "Confirmar" : step === 1 ?(validationMethod === 'no-access' ? "Entrar em contato" : "Sim" ): step === 2 ? "Verificar" : step === 3 ? "Enviar" : "Confirmar"
        }
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
        isLoading={isLoading}
      />}
      {
        step === 1 && validationMethod !== 'no-access' && <Button
        className="mt-4"
        title="Não"
        variant="secondary"
        onPress={() => {
          validationMethod === 'phone' ? setValidationMethod('email') : setValidationMethod('no-access');
        }}
      />
      }
      <Text
        className="text-[#083061] mt-4 underline text-base font-bold text-center"
        onPress={() => {
          if(step === 0 ){
            changeForm('login');
            return
          }
          setStep(step - 1);
        }}
      >
        Voltar
      </Text> 
       
    </FormProvider>
  );
};

export default ResetPasswordForm;
