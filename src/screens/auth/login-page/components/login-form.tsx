import { Box, KeyboardAvoidingView, Text } from "native-base";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { Button, KeyboardScrollView, TextFieldInput } from "../../../../components";
import { LoginUserFormInput } from "../../../../domain-types";
import { Masks } from 'src/utils';
import * as yup from "yup";

type Props = {
  onSubmit: SubmitHandler<LoginUserFormInput>;
  isLoading: boolean;
  changeForm: (form: 'login' | 'reset-password' | 'create-account') => void;
};

const schema = yup.object().shape({
  cpf: yup.string().required("Campo obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: yup.string().required("Campo obrigatório"),
});

const LoginForm = ({ onSubmit, isLoading, changeForm }: Props) => {
  const { control, formState, handleSubmit } =
    useFormContext<LoginUserFormInput>(); 

  return (
    <KeyboardScrollView 
    >
      <Text className="text-2xl font-bold mb-8 text-center">Bem vindo!</Text>
      <Controller
        control={control}
        name="cpf"
        render={({ field: { value, onChange }, ...rest }) => (
          <TextFieldInput
            value={value}
            label='Login'
            onChangeText={onChange}
            mask={Masks.CPFMask}
            placeholder="CPF" 
            keyboardType='numeric'
            error={formState.errors.cpf?.message}
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
            label='Senha'
            onChangeText={onChange}
            placeholder="Senha"
            type='password' 
            error={formState.errors.password?.message}
            {...rest}
          />
        )}
      />
      <Box className="w-full text-center mb-4 justify-center items-start">
        <Text className="font-bold text-sm text-[#083061] underline"
          onPress={() => changeForm('reset-password')}
        >
          Esqueci minha senha
        </Text>
      </Box>
      <Button
        className=""
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
        isLoading={isLoading}
      />
      <Button
        className="mt-4"
        title="Criar conta"
        variant="secondary"
        onPress={() => {
          changeForm('create-account');
        }}
      />
      
      {/* <Box className="w-full flex flex-row text-start gap-1  items-center my-2">
        <Text
          className="font-bold text-sm text-textSecondary"
        >
          Já tem uma conta?
        </Text>
        <Text className="font-bold text-sm text-[#083061] underline"
          onPress={() => changeForm('reset-password')}
        >
          Recupere aqui
        </Text>
      </Box>  */}
    </KeyboardScrollView>
  );
};

export default LoginForm;
