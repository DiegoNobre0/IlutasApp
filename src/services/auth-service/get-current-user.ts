import {
  HttpClient,
  UnexpectedError,
  ValidationError,
  setupAuthApiConfig,
} from "../../core";
import { UserAccount } from "../../domain-types";
import { HttpStatusCode } from "../../types";

export const GetCurrentAccount = async (): Promise<UserAccount> => {
  // const response = await HttpClient.of(setupAuthApiConfig()).request({
  //   url: "/rest/v1/usuarios",
  //   method: "GET",
  // });

  return {
    id: 123,
    name: "João da Silva",
    cpf: "123.456.789-00",
    email: "joao@example.com",
    phone: "(12) 3456-7890",
    birthDate: "1990-01-01",
    gender: 1,
    athleteInfo: {
      team: "Time A",
      teamId: 1,
      teacher: "Professor X",
      teacherId: 2,
      sport: "Futebol",
      graduation: "Avançado",
      weight: "75",
      weightDressed: "80",
      isSpecial: false,
      superClass: "",
      superSubClass: ""
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
  }

  // switch (response.statusCode) {
  //   case HttpStatusCode.Ok:
  //     return response.body as UserAccount;
  //   case HttpStatusCode.Unauthorized:
  //     throw new ValidationError(response.body);
  //   default:
  //     throw new UnexpectedError();
  // }
};

export const UpdateAccount = async (data: UserAccount): Promise<UserAccount> => {
  // const response = await HttpClient.of(setupAuthApiConfig()).request({
  //   url: "/rest/v1/usuarios",
  //   method: "PUT",
  //   body: data,
  // });

  return data;

  // switch (response.statusCode) {
  //   case HttpStatusCode.Ok:
  //     return response.body as UserAccount;
  //   case HttpStatusCode.Unauthorized:
  //     throw new ValidationError(response.body);
  //   default:
  //     throw new UnexpectedError();
  // }
};