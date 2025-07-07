"use client";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import Title from "@components/molecules/Title";
import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";
import useForgotPassword from "./hooks/useForgotPassword";

const ForgotPasswordView = () => {
  const {
    forgotPasswordState,
    loading,
    handleChange,
    handleSubmit,
    forgotPasswordValidation,
  } = useForgotPassword();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Title title="Olvidaste tu contraseña?" />
      <div className="card md:w-xl mt-10 px-24 py-10">
        <Formik
          enableReinitialize
          initialValues={forgotPasswordState}
          onSubmit={handleSubmit}
          validationSchema={forgotPasswordValidation}
        >
          <Form className="flex flex-col gap-5">
            <Input
              placeholder="Correo electrónico"
              value={forgotPasswordState.email}
              onChange={(e) => handleChange(e)}
              type="email"
              id="email"
              name="email"
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2"
              name="email"
            />
            <Input
              placeholder="Nueva Contraseña"
              value={forgotPasswordState.newPassword}
              onChange={handleChange}
              type="password"
              id="newPassword"
              name="newPassword"
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2"
              name="newPassword"
            />
            <Button
              type="submit"
              className="mt-3"
              disabled={loading}
              loading={loading}
            >
              Iniciar sesión
            </Button>
          </Form>
        </Formik>
        <div className="flex flex-col gap-4 mt-10 items-center">
          <div className="flex gap-2">
            <p className="text-[#62637C]">Quieres volver a iniciar sesión?</p>
            <Link href="/login" className="text-[#60A3F0] underline">
              Iniciar sesión
            </Link>
          </div>
          <div className="flex gap-2">
            <p className="text-[#62637C]">No tienes una cuenta todavía?</p>
            <Link href="/signup" className="text-[#60A3F0] underline">
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
