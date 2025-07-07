import { type IRootState, useAppDispatch, useAppSelector } from "@core/store";
import type { ForgotPasswordState } from "@models/user";
import { forgotPassword } from "@redux/user/userThunk";
import { useState } from "react";
import * as Yup from "yup";

const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: IRootState) => state.user.loading);

  const forgotPasswordValidation = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido.")
      .required("Correo electrónico requerido.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "El correo debe tener el siguiente formato: ejemplo@google.com"
      ),
    newPassword: Yup.string()
      .min(8, "Se requiere un mínimo de 8 carácteres.")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        "La contraseña debe contener un número, una mayúscula y una minúscula."
      )
      .required("Contraseña requerida."),
  });

  const [forgotPasswordState, setForgotPasswordState] =
    useState<ForgotPasswordState>({
      email: "",
      newPassword: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotPasswordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(forgotPassword(forgotPasswordState));
  };

  return {
    forgotPasswordState,
    loading,
    handleChange,
    handleSubmit,
    forgotPasswordValidation,
  };
};

export default useForgotPassword;
