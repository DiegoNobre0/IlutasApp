import { createContext, useState } from "react";
import { AuthContextProps, AuthProviderProps } from "../../types";
import { UserAccount } from "../../domain-types";
import { Cache } from "../adapters";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const getAccessToken = () => {
    return Cache.get({ key: "accessToken" }) as string | undefined;
  };

  const [accessToken, setAccessToken] = useState<string | undefined>(
    getAccessToken()
  );
  const [currentAccount, setCurrentAccount] = useState<UserAccount | undefined>(
    undefined
  );

  const saveAccessToken = (accessToken: string | undefined) => {
    !!accessToken
      ? Cache.set({
          key: "accessToken",
          value: accessToken,
        })
      : Cache.remove({ key: "accessToken" });

    setAccessToken(accessToken);
  };

  const saveCurrentAccountToken = (currentAccount: UserAccount | undefined) => {
    setCurrentAccount(currentAccount);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentAccount,
        saveAccessToken,
        saveCurrentAccountToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
