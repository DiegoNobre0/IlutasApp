import { ReactNode } from "react";
import { UserAccount } from "../../domain-types";

export type AuthContextProps = {
  accessToken?: string;
  currentAccount?: UserAccount;
  saveAccessToken: (accessToken: string | undefined) => void;
  saveCurrentAccountToken: (currentAccount: UserAccount | undefined) => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
