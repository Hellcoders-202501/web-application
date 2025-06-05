import { useContext, useState } from "react";
import { LoginState } from "@models/user";
import { AuthContext } from "@context/auth/AuthContext";
import { IRootState, useAppSelector } from "@core/store";

const useLogin = () => {
  const { handleLogIn } = useContext(AuthContext);
  const loading = useAppSelector((state: IRootState) => state.user.loading);

  const [loginSate, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleLogIn(loginSate);
  };

  return {
    loginSate,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
