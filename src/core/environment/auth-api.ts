import { SetupApiConfig } from "../../types";

export const setupAuthApiConfig: SetupApiConfig = () => {
  return {
    baseUrl: process.env["EXPO_API_BASE_URL"],
    headers: {
      Authorization:
        "Basic OTg1OGI1NGQyMDA1N2NmMjNmOTNkNzk4OWE0MzljYWY6NGYwNTU4YTE0YTUxMDkwNjk5YjgxMjczMzE5MDYxMjg=",
    },
  };
};
