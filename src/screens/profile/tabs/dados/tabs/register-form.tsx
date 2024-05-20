import { Box, Spinner, Text, Image } from "native-base";
import { Controller, Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, KeyboardScrollView, ModalFull, SelectField, TextFieldInput } from "../../../../../components";
import { CreateAccountFormInput, ForgotPasswordFormInput } from "../../../../../domain-types";
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
import * as ImagePicker from 'expo-image-picker';
import { CustomAutocomplete } from 'src/components/form/autocomplete';

type Props = { 
  isLoading: boolean;
  changeForm: () => void;
  openModalEquipe: () => void;
  openModalProfessor: () => void;
  step: number;
};


const RegisterForm = ({ isLoading, changeForm,
  openModalEquipe, openModalProfessor,
  step
}: Props) => { 
  const schema = yup.object().shape(
    step === 1 ? {
      cpf: yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
      name: yup.string().required("Campo obrigatório"),
      birthDate: yup.string().required("Campo obrigatório").matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida"), 
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
    } : {
      step: 4 ? {  
        email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
        phone: yup.string().required("Campo obrigatório").matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
      } : {}
    }
  ); 
  const { saveAccessToken, saveCurrentAccountToken, currentAccount } = useAuth();

  const [image, setImage] = useState<any>(null);
  const methods =
    useForm<CreateAccountFormInput>({
      resolver: yupResolver(schema as any),
      mode: "onChange",
      defaultValues: currentAccount && {
        name: currentAccount?.name,
        cpf: currentAccount?.cpf,
        email: currentAccount?.email,
        phone: currentAccount?.phone,
        gender: currentAccount?.gender,
        birthDate: currentAccount?.birthDate, 
        athleteInfo: currentAccount?.athleteInfo,
        address: currentAccount?.address
      }
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


  const onSubmit: SubmitHandler<CreateAccountFormInput> = async (data) => { 

    const user = await AuthService.UpdateAccount(data as any);
    changeForm(); 

    saveCurrentAccountToken(user as any);
    
    
    // const response = '123';
    // console.log(response);
    // // const user = await AuthService.GetCurrentAccount();
    // console.log('user', user);

    // setTimeout(() => {
    //       saveAccessToken(response);  
    // }, 3000);
      
    };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } 
  };

  const teams = [
    { title: 'Equipe 1', id: '1' },
    { title: 'Equipe 2', id: '2' },
    { title: 'Equipe 3', id: '3' },
  ]

  const teachers = [
    { title: 'Professor 1', id: '1' },
    { title: 'Professor 2', id: '2' },
    { title: 'Professor 3', id: '3' },
  ]

  return (  
      
      <FormProvider 
        {...methods}
      >  
          <Text className="text-xl font-bold mb-2 ">
            {
              step === 1 ? 'Dados gerais' :
              step === 2 ? 'Dados do atleta' :
              step === 3 ? 'Seu Endereço' :
              'Informações de contato' 
            }
          </Text>    
          {
            step === 1 && <>
            <Box
              className='flex w-full justify-center items-center'
            >
              <Text
                className='pb-4'
              >Alterar Foto</Text>
              <TouchableOpacity
                className='w-24 h-24 rounded-full border bg-[#F2F2F2] border-white justify-center items-center'
                onPress={pickImage}
                >
                  {
                    image ? <Image
                      source={{ uri: image }}
                      className="object-contain w-[99%] h-[99%] rounded-full"
                      />
                      : <Icon
                      source='camera-wireless-outline'
                      size={24}
                      color='#083061'
                      />
                  }
              </TouchableOpacity>
            </Box>
          
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
            </>
          } 
          {
            step === 2 && <>
       
       <Controller
          control={control}
          name="athleteInfo.team"
          render={({ field: { value, onChange }, ...rest }) => (
            <CustomAutocomplete
              initialValue={
                teams.find(team => +team.id == currentAccount?.athleteInfo?.teamId)
              }
              value={value} 
              label='Equipe'
              onChange={onChange}  
              options={teams} 
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
              initialValue={
                teachers.find(teacher => +teacher.id == currentAccount?.athleteInfo?.teacherId)
              } 
              options={teachers} 
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
          step === 4 && 
          <> 
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
          </>
        } 
        <Button
          title="Salvar"
          className=''
          onPress={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting}
          isLoading={isLoading}
        />  
      </FormProvider> 

  );
};

export default RegisterForm;
