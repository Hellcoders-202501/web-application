"use client";
import { useAppDispatch } from "@core/store";
import useAuth from "@hooks/useAuth";
import type { User } from "@models/user";
import { updateUser } from "@redux/user/userThunk";
import { useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const { currentUser, userType } = useAuth();

  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState<User>(currentUser);

  const region = "PE";

  const updateInformationValidation = Yup.object().shape({
    name: Yup.string()
      .required("Nombre requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El nombre de usuario debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres.")
      .max(50, "El nombre de usuario no puede tener más de 50 caracteres."),
    firstLastName: Yup.string()
      .required("Apellido paterno requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El nombre debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(50, "El nombre no puede tener más de 50 caracteres."),
    secondLastName: Yup.string()
      .required("Apellido materno requerido.")
      .matches(
        /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        "El apellido debe tener letras, números, espacios y caracteres especiales.",
      )
      .min(3, "El apellido debe tener al menos 3 caracteres.")
      .max(50, "El apellido no puede tener más de 50 caracteres."),
    phone: Yup.string()
      .phone(region, "Formato inválido")
      .required("El campo es requerido."),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setEditable(false);
    dispatch(updateUser({ userInformation: user, type: userType }));
  };

  return {
    editable,
    setEditable,
    user,
    setUser,
    handleChange,
    handleSubmit,
    updateInformationValidation,
  };
};

export default useProfile;
