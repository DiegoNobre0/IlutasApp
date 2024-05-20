import * as yup from "yup";

export const loginUserValidationSchema = yup.object({
  cpf: yup
    .string()
    .required("O campo é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: yup
    .string()
    .required("O campo é obrigatório")
    .max(80, "O campo atingiu o limite máximo de 80 caracteres"),
});
