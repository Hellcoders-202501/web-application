import { useContext, useState } from "react";
import type { LoginState } from "@models/user";
import { AuthContext } from "@context/auth/AuthContext";
import { type IRootState, useAppSelector } from "@core/store";
import * as Yup from "yup";

const useLogin = () => {
  const { handleLogIn } = useContext(AuthContext);
  const loading = useAppSelector((state: IRootState) => state.user.loading);

  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido.")
      .required("Correo electrónico requerido.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "El correo debe tener el siguiente formato: ejemplo@google.com",
      ),
    password: Yup.string()
      .min(8, "Se requiere un mínimo de 8 carácteres.")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        "La contraseña debe contener un número, una mayúscula y una minúscula.",
      )
      .required("Contraseña requerida."),
  });

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
    loginValidation,
  };
};

export default useLogin;
