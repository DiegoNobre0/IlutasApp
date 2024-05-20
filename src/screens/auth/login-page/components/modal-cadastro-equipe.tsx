import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ModalBase, TextFieldInput } from 'src/components';
import * as yup from "yup";
export const ModalCadastroEquipe = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  interface ProfessorCadastroForm{
    teamName: string;
    name: string;
    phone: string;
  }

  
  const schema = yup.object().shape({
    teamName: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório").matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  });
  const methods = useForm<ProfessorCadastroForm>({
      resolver: yupResolver(schema as any),
      mode: "onChange",
    });

  const {control, formState} = methods;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose} 
      title='Cadastrar Equipe'
      titleConfirm='Cadastrar'
      onConfirm={
        () => {

        }
      }
    >
      <FormProvider
      {...methods}
      >
        <Controller
          control={control}
          name="teamName"
          render={({ field: { value, onChange }, ...rest }) => (
            <TextFieldInput
              label='Equipe'
              value={value}
              onChangeText={onChange}
              error={formState.errors.teamName?.message}
              {...rest}
            />
          )}
        />
         <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, ...rest }) => (
              <TextFieldInput
                label='Professor'
                value={value}
                onChangeText={onChange}
                error={formState.errors.name?.message}
                {...rest}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange }, ...rest }) => (
              <TextFieldInput
                label='Telefone'
                value={value}
                onChangeText={onChange}
                error={formState.errors.phone?.message}
                {...rest}
              />
            )}
          />
      </FormProvider>
    </ModalBase>
  )
}
