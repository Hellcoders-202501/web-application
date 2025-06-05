import { LoginState, User } from "@models/user";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: User;
  handleLogIn: (loginForm?: LoginState) => void;
  handleLogOut: () => void;
}

export const AuthContext = createContext({} as ContextProps);
