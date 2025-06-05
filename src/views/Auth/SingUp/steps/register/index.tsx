import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import { ErrorMessage, Form, Formik } from "formik";
import type { FC } from "react";
import * as Yup from "yup";

interface Props {
  state: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: VoidFunction;
  registerValidation: Yup.ObjectSchema<any>;
}

const Register: FC<Props> = ({
  state,
  handleChange,
  handleSubmit,
  registerValidation,
}) => {
  return (
    <div className="card md:w-xl mt-10 px-24 py-10">
      <Formik
        enableReinitialize
        initialValues={state}
        onSubmit={handleSubmit}
        validationSchema={registerValidation}
      >
        <Form className="flex flex-col gap-5">
          <Input
            placeholder="Correo electrónico"
            onChange={handleChange}
            name="email"
            type="email"
          />
          <ErrorMessage
            component="div"
            className="text-red-500 text-sm pl-2"
            name="email"
          />
          <Input
            placeholder="Contraseña"
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
          />
          <ErrorMessage
            component="div"
            className="text-red-500 text-sm pl-2"
            name="password"
          />
          <Input
            placeholder="Confirmar contraseña"
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
          <ErrorMessage
            component="div"
            className="text-red-500 text-sm pl-2"
            name="confirmPassword"
          />
          <Button type="submit" className="mt-3">
            Continuar
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
