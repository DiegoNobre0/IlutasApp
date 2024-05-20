import { Box, Spinner, Text } from "native-base";
import { Controller, Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, KeyboardScrollView, ModalFull, SelectField, TextFieldInput } from "../../../../components";
import { CreateAccountFormInput, ForgotPasswordFormInput } from "../../../../domain-types";
import { Masks } from 'src/utils';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { CodeInput } from 'src/components/form/code-input';
import { Icon, Portal } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { RadioForm, RadioGroupFlex } from 'src/components/form/CheckBox';
import { AuthService } from 'src/services';
import { useAuth, useModal } from 'src/core';
import { CustomAutocomplete } from 'src/components/form/autocomplete';
import { ModalCadastroEquipe } from './modal-cadastro-equipe';
import { ModalCadastroProfessor } from './modal-cadastro-professor';

type Props = { 
  isLoading: boolean;
  changeForm: (form: 'login' | 'reset-password' | 'create-account' | 'create-account-step-2') => void;
  openModalEquipe: () => void;
  openModalProfessor: () => void;
};


const RegisterForm = ({ isLoading, changeForm,
  openModalEquipe, openModalProfessor
}: Props) => {
  const [step, setStep] = useState(2);
  const schema = yup.object().shape(
    step === 1 ? {
      cpf: yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
      name: yup.string().required("Campo obrigatório"),
      email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
      birthDate: yup.string().required("Campo obrigatório").matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida"),
      phone: yup.string().required("Campo obrigatório").matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"), 
      password: yup.string().required("Campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres"),
      confirmPassword: yup.string().required("Campo obrigatório").oneOf([yup.ref('password'), null as any], 'As senhas devem ser iguais'),
    } : step === 2 ? {
      athleteInfo: yup.object().shape({
        // team: yup.string().required("Campo obrigatório"),
        // teacher: yup.string().required("Campo obrigatório"),
        // sport: yup.string().required("Campo obrigatório"),
        // graduation: yup.string().required("Campo obrigatório"),
        weight: yup.string().required("Campo obrigatório"),
        weightDressed: yup.string().required("Campo obrigatório"),
        isSpecial: yup.boolean().required("Campo obrigatório")
      })
    } : step === 3 ? {
      address: yup.object().shape({
        cep: yup.string().required("Campo obrigatório").matches(/^\d{5}-\d{3}$/, "CEP inválido"),
        state: yup.string().required("Campo obrigatório"),
        city: yup.string().required("Campo obrigatório"),
        street: yup.string().required("Campo obrigatório"),
        number: yup.string().required("Campo obrigatório"),
        neighborhood: yup.string().required("Campo obrigatório"),
      })
    } : {}
  ); 

  const methods =
    useForm<CreateAccountFormInput>({
      resolver: yupResolver(schema as any),
      mode: "onChange",
    });

  const { control, formState, handleSubmit } = methods;


  const [accountType, setAccountType] = useState<'athlete' | 'responsible'>('athlete');

  const cep = methods.watch('address.cep');

  const isSpecial = methods.watch('athleteInfo.isSpecial');

  async function getAddressByCEP(cep: string) {
    if(cep.length !== 9)
      return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      const data = await response.json();
      console.log(data)
      if(data.erro || !data) {
        return;
      }
      methods.setValue('address.state', data.uf);
      methods.setValue('address.city', data.localidade);
      methods.setValue('address.street', data.logradouro);
      methods.setValue('address.neighborhood', data.bairro);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAddressByCEP(cep);
  }, [cep]);

  const { saveAccessToken, saveCurrentAccountToken } = useAuth();

  const onSubmit: SubmitHandler<ForgotPasswordFormInput> = async (data) => { 
    if(step === 0) {
      setStep(1);
      changeForm('create-account-step-2');
      return;
    } 

    if(step < 3) {
      setStep(step + 1);
      return;
    }

    setStep(4);

    // const response = await AuthService.loginUsuario({ data })

    // await AuthService.createAccount({ data });
    // console.log(data);
    
    
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
          <Text className="text-2xl font-bold mb-2 text-center">
            {
              step < 2 ? 'Criar conta' : 
              step === 2 ? 'Informações do atleta' :
              step === 3 ? 'Endereço' : 'Contato'
            } 
          </Text>   
        {
          step === 0 && <Box
            className="flex flex-col max-w-full justify-start items-start break-words px-4"
          >
            <Text className="text-[#494949]  mb-4 text-center">Por favor, indique se você é o atleta ou o responsável. Esta informação será utilizada para direcioná-lo ao formulário de cadastro adequado. Obrigado!</Text>
            <Box
              className="w-full flex flex-row justify-between items-center gap-4 mb-6"
            >
              <TouchableOpacity
                onPress={() => setAccountType('athlete')}
                className="w-1/2 flex flex-col gap-2 items-center justify-center border-[1px] rounded-lg aspect-square max-h-28"
                style={
                  accountType === 'athlete' ? {
                    borderColor: '#083061',
                    backgroundColor: '#F2F2F2'
                  } : {
                    borderColor: '#00000000'
                  }
                }
              > 
                  <Box
                    // mirror icon 
                    className="transform scale-x-[-1]"
                  >
                  <Icon
                    source='karate'
                    size={48}
                    color= {
                    accountType === 'athlete' ? '#083061' : '#494949'}
                    />
                  </Box>
                  <Text className="font-bold"
                    style={{
                      color: accountType === 'athlete' ? '#083061' : '#494949'
                    }}
                  >Atleta</Text> 
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAccountType('responsible')}
                className="w-1/2 flex flex-col gap-2 items-center justify-center  border-[1px] rounded-lg aspect-square max-h-28"
                style={
                  accountType === 'responsible' ? {
                    borderColor: '#083061',
                    backgroundColor: '#F2F2F2'
                  } : {
                    borderColor: '#00000000'
                  }
                }
                
              > 
                <Icon
                  source='account-group'
                  size={48}
                  color= {
                    accountType === 'responsible' ? '#083061' : '#494949'}

                  />
                <Text className="font-bold"
                  style={{
                    color: accountType === 'responsible' ? '#083061' : '#494949'
                  }}
                >Responsável</Text> 
              </TouchableOpacity>



            </Box>
          </Box>
        }
          {
            step === 1 && <>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Nome'
              onChangeText={onChange}
              placeholder="Nome" 
              error={formState.errors.name?.message}
              {...rest}
            />
          )}
        />
        <Controller
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
        />
        <Controller
          name='gender'
          control={control}
          render={({ field: { value, onChange }, ...rest }) => (
            <RadioGroupFlex
              label='Gênero'
              value={value as any}
              onChange={onChange}
              {...rest}
              options={
                [ {
                  label: 'Masculino',
                  value: 1
                },{
                  label: 'Feminino',
                  value: 2
                }]
              }
            />
          )}
        />
        <Box
          className="h-4"
        />

        <Controller
          control={control}
          name="birthDate"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Data de nascimento'
              onChangeText={onChange}
              mask={Masks.DATEMaskStart}
              keyboardType='numeric'
              placeholder="00/00/0000" 
              error={formState.errors.birthDate?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Telefone'
              onChangeText={onChange}
              mask={Masks.TELEFONEMask}
              keyboardType='numeric'
              placeholder="(00) 00000-0000" 
              error={formState.errors.phone?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='E-mail'
              onChangeText={onChange}
              placeholder="E-mail" 
              error={formState.errors.email?.message}
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
          } 
          {
            step === 2 && <>
        <Controller
          control={control}
          name="athleteInfo.team"
          render={({ field: { value, onChange }, ...rest }) => (
            <CustomAutocomplete
              value={value}
              label='Equipe'
              onChange={onChange}  
              options={[
                { title: 'Equipe 1', id: '1' },
                { title: 'Equipe 2', id: '2' },
                { title: 'Equipe 3', id: '3' },
              ]} 
              {...rest}
              /> 
          )}
        />
        <Box
          className="h-6 mb-2 flex flex-row"
        >
          <Text
            className='text-start text-[#494949]'
          >
            Caso não localize a equipe
          </Text>
              <Text
                className='text-primary font-bold underline ml-1'
                onPress={openModalEquipe}
                >
                  Cadastre aqui
                </Text>
        </Box>
        <Controller
          control={control}
          name="athleteInfo.teacher"
          render={({ field: { value, onChange }, ...rest }) => (
            <CustomAutocomplete
              value={value}
              label='Professor'
              onChange={onChange}  
              options={[
                { title: 'Professor 1', id: '1' },
                { title: 'Professor 2', id: '2' },
                { title: 'Professor 3', id: '3' },
              ]} 
              {...rest}
              />

          )}
        />
        <Box
          className="h-6 mb-2 flex flex-row"
        >
          <Text
            className='text-start text-[#494949]'
          >
            Caso não localize o professor
          </Text>
              <Text
                className='text-primary font-bold underline ml-1'
                onPress={openModalProfessor}
                >
                  Cadastre aqui
                </Text>
        </Box>
        <Controller
          control={control}
          name="athleteInfo.sport"
          render={({ field: { value, onChange }, ...rest }) => (
            <SelectField
              value={value}
              label='Esporte'
              onChange={onChange} 
              variant='primary'
              options={[
                { name: 'Judo', value: '1' },
                { name: 'Karate', value: '2' },
                { name: 'Jiu-jitsu', value: '3' },
              ]} 
              {...rest}
              />
          )}
        /> 
        <Box
          className="h-4"
        />
        <Controller
          control={control}
          name="athleteInfo.graduation"
          render={({ field: { value, onChange }, ...rest }) => (
            <SelectField
              value={value}
              label='Graduação'
              onChange={onChange} 
              variant='primary'
              options={[
                { name: 'Branca', value: '1' },
                { name: 'Amarela', value: '2' },
                { name: 'Laranja', value: '3' },
              ]} 
              {...rest}
              />
          )}
        />
        <Box
          className="h-2"
        />
        <Controller
          control={control}
          name="athleteInfo.weightDressed"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Peso (com kimono)'
              onChangeText={onChange}
              placeholder="Peso (com kimono)" 
              error={formState.errors.athleteInfo?.weightDressed?.message}
              {...rest}
            />
          )}
        />

        <Controller
          control={control}
          name="athleteInfo.weight"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Peso (sem kimono)'
              onChangeText={onChange}
              placeholder='Peso (sem kimono)'
              error={formState.errors.athleteInfo?.weight?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="athleteInfo.isSpecial"
          render={({ field: { value, onChange }, ...rest }) => (
            <RadioForm
              value={value}
              label='Possui alguma necessidade especial?'
              onChange={onChange}
              {...rest}
            />
          )}
        />
        {
          isSpecial && <>
            <Controller
              control={control}
              name="athleteInfo.superClass"
              render={({ field: { value, onChange }, ...rest }) => (
                <TextFieldInput
                  value={value}
                  label='Super classe'
                  onChangeText={onChange}
                  placeholder="Super classe" 
                  error={formState.errors.athleteInfo?.superClass?.message}
                  {...rest}
                />
              )}
            />
            <Controller
              control={control}
              name="athleteInfo.superSubClass"
              render={({ field: { value, onChange }, ...rest }) => (
                <TextFieldInput
                  value={value}
                  label='Classe'
                  onChangeText={onChange}
                  placeholder="B1 - paratletas cego total" 
                  error={formState.errors.athleteInfo?.superSubClass?.message}
                  {...rest}
                />
              )}
            />
          </>
        }
        </>
        }

        {
          step === 3 && <>
        <Controller
          control={control}
          name="address.cep"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='CEP'
              onChangeText={onChange}
              mask={Masks.CEPMask}
              keyboardType='numeric'
              placeholder="00000-000" 
              error={formState.errors.address?.cep?.message}
              {...rest}
            />
          )}
        /> 
        
        <Controller
          control={control}
          name="address.state"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Estado'
              onChangeText={onChange}
              placeholder="Estado" 
              error={formState.errors.address?.state?.message}
              {...rest}
            />
          )}
        />
        
        <Controller
          control={control}
          name="address.city"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Cidade'
              onChangeText={onChange}
              placeholder="Cidade" 
              error={formState.errors.address?.city?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="address.street"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Endereço'
              onChangeText={onChange}
              placeholder="Nome da rua/Avenida" 
              error={formState.errors.address?.street?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="address.number"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Nº e complemento'
              onChangeText={onChange}
              placeholder="Ex: 123, apartamento 1" 
              error={formState.errors.address?.number?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="address.complement"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Complemento'
              onChangeText={onChange}
              placeholder="Complemento" 
              error={formState.errors.address?.complement?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="address.neighborhood"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              value={value}
              label='Bairro'
              onChangeText={onChange}
              placeholder="Bairro" 
              error={formState.errors.address?.neighborhood?.message}
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
        <Button
          title={
            step < 3 ? 'Próximo' : 'Salvar'
          }
          className=''
          onPress={handleSubmit(onSubmit)}
          disabled={step!==0 && !formState.isValid}
          isLoading={isLoading}
        /> 
        <Text
          className='text-center mt-4 mb-28 text-primary text-base font-bold underline'
          onPress={() => {
            if(step === 0) {
              changeForm('login');
              return;
            }
            setStep(step - 1);
          }}
        >
          Voltar
        </Text>
      </FormProvider> 

  );
};

export default RegisterForm;
