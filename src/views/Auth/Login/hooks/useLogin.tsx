import { useContext, useState } from "react";
import { LoginState } from "@models/user";
import { AuthContext } from "@context/auth/AuthContext";

const useLogin = () => {
  const { handleLogIn } = useContext(AuthContext);

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
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
