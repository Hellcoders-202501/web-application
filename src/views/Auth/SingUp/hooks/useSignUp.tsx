import { useState } from "react";
import Register from "../steps/register";
import FillInformation from "../steps/fill-information";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { signup } from "@redux/user/userThunk";
import * as Yup from "yup";
import "yup-phone-lite";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(0);

  const [signUpState, setSignUpState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    firstLastName: "",
    secondLastName: "",
    phone: "",
    username: "",
  });

  const [userType, setUserType] = useState("CLIENT");
  const [conditions, setConditions] = useState({
    terms: false,
    privacy: false,
  });

  const loading = useAppSelector((state: IRootState) => state.user.loading);

  const registerValidation = Yup.object().shape({
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Confirmar contraseña requerida."),
  });

  const region = "PE";

  const fillInformationValidation = Yup.object().shape({
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
    terms: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones.",
    ),
    privacy: Yup.boolean().oneOf(
      [true],
      "Debes aceptar la política de privacidad.",
    ),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const handleConditions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConditions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    const { confirmPassword, username, ...user } = signUpState;
    dispatch(signup({ userType, user }));
    // window.location.href = "/"; // Redireccionar a la página de inicio después del registro
  };

  const defineTitle = () => {
    switch (step) {
      case 0:
        return "Crear una nueva cuenta";
      case 1:
        return "Completar tu información de usuario";
      default:
        return "Registro";
    }
  };

  const defineStep = () => {
    switch (step) {
      case 0:
        return (
          <Register
            state={{
              email: signUpState.email,
              password: signUpState.password,
              confirmPassword: signUpState.confirmPassword,
            }}
            handleChange={handleChange}
            handleSubmit={() => setStep(1)}
            registerValidation={registerValidation}
          />
        );
      case 1:
        return (
          <FillInformation
            state={{
              ...signUpState,
              userType,
              ...conditions,
            }}
            handleChange={handleChange}
            handleUserType={handleUserType}
            handleConditions={handleConditions}
            handleSubmit={handleSubmit}
            fillInformationValidation={fillInformationValidation}
            loading={loading}
          />
        );
      default:
        return <p>Registo</p>;
    }
  };

  return {
    defineTitle,
    defineStep,
  };
};

export default useLogin;
