import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import type { RegisterUser } from "@models/user";
import { ErrorMessage, Form, Formik } from "formik";
import type { FC } from "react";
import * as Yup from "yup";

interface Props {
  state: RegisterUser;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleConditions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: VoidFunction;
  fillInformationValidation: Yup.ObjectSchema<any>;
  loading: boolean;
}

const FillInformation: FC<Props> = ({
  state,
  handleChange,
  handleUserType,
  handleConditions,
  handleSubmit,
  fillInformationValidation,
  loading,
}) => {
  return (
    <div className="card mt-10 px-24 py-10">
      <Formik
        enableReinitialize
        initialValues={state}
        onSubmit={handleSubmit}
        validationSchema={fillInformationValidation}
      >
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="flex flex-col gap-5">
              <Input
                placeholder="Nombre"
                onChange={handleChange}
                name="name"
                type="text"
              />
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2"
                name="name"
              />
              <Input
                placeholder="Apellido paterno"
                onChange={handleChange}
                name="firstLastName"
                type="text"
              />
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2"
                name="firstLastName"
              />
            </div>
            <div className="flex flex-col gap-5">
              <Input
                placeholder="Apellido materno"
                onChange={handleChange}
                name="secondLastName"
                type="text"
              />
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2"
                name="secondLastName"
              />
              <Input
                placeholder="Número telefónico"
                onChange={handleChange}
                name="phone"
                type="number"
              />
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2"
                name="phone"
              />
            </div>
          </div>

          <select
            name="userType"
            id="userType"
            className="border rounded-2xl mx-2 py-4 px-8"
            onChange={handleUserType}
          >
            <option value="CLIENT">Cliente</option>
            <option value="DRIVER">Conductor</option>
          </select>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Input
                type="checkbox"
                className="self-start md:self-auto mt-2 md:mt-0"
                id="terms"
                name="terms"
                onChange={handleConditions}
              />
              <label htmlFor="terms">
                Declaro haber leído los términos y condiciones
              </label>
            </div>
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2"
              name="terms"
            />
            <div className="flex gap-2 items-center">
              <Input
                type="checkbox"
                id="privacy"
                name="privacy"
                onChange={handleConditions}
              />
              <label htmlFor="privacy">
                Estoy de acuerdo con que usen mi información
              </label>
            </div>
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2"
              name="privacy"
            />
          </div>
          <Button
            type="submit"
            className="mt-3"
            disabled={loading}
            loading={loading}
          >
            Registrar
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
export default FillInformation;
