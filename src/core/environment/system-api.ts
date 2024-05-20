import { SetupApiConfig } from "../../types";
import { Cache } from "../adapters"

export const setupSystemApiConfig: SetupApiConfig = () => {
  const accessToken = Cache.get({ key: "accessToken" }) as string | undefined ?? "";

  return {
    baseUrl: process.env["EXPO_API_BASE_URL"],
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
