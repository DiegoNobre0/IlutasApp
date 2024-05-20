export type UserAccount = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  gender: 1 | 2;
  imagem?: string;
  athleteInfo: {
    team: string;
    teamId: number;
    teacher: string;
    teacherId: number;
    sport: string;
    graduation: string;
    weight: string;
    weightDressed: string;
    isSpecial: boolean;
    superClass?: string;
    superSubClass?: string;
  };
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
};

export type LoginUserFormInput = {
  cpf: string;
  password: string;
};

export type ForgotPasswordFormInput = {
  cpf: string;
  password: string;
  confirmPassword: string;
};

export type CodeForgotPasswordFormInput = {
  code: string;
};

export type ResetPasswordFormInput = {
  password: string;
  confirmPassword: string;
};


export type CreateAccountFormInput = {
  name: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  gender: 1 | 2;
  birthDate: string;
  athleteInfo: {
    team: string;
    teacher: string;
    sport: string;
    graduation: string;
    weight: string;
    weightDressed: string;
    isSpecial: boolean;
    superClass?: string;
    superSubClass?: string;
  };
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
};