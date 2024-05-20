import {
  HttpClient,
  UnexpectedError,
  ValidationError,
  setupAuthApiConfig,
} from "../../core";
import { LoginUserFormInput } from "../../domain-types";
import { HttpStatusCode } from "../../types";

type Input = {
  data: LoginUserFormInput;
};

export const loginUsuario = async ({ data }: Input): Promise<string> => {
  // const response = await HttpClient.of(setupAuthApiConfig()).request({
  //   url: "/oauth/token",
  //   method: "POST",
  //   body: {
  //     cpf: data.cpf,
  //     password: data.password,
  //   },
  // });

  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoi'

  // switch (response.statusCode) {
  //   case HttpStatusCode.Ok:
  //     const accessToken = response.body.access_token as string;
  //     return accessToken;
  //   case HttpStatusCode.Unauthorized:
  //     throw new ValidationError(response.body);
  //   default:
  //     throw new UnexpectedError();
  // }
};
