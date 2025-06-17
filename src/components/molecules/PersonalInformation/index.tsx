import Input from "@components/atoms/Input";
import type { User } from "@models/user";
import { Form, Formik, ErrorMessage } from "formik";

const PersonalInformation = ({
  editable = false,
  information,
  setInformation,
  handleSubmit,
}: {
  editable: boolean;
  information: User;
  setInformation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: VoidFunction;
  updateInformationValidation: any;
}) => {
  return (
    <div className="w-full lg:mx-10">
      <Formik initialValues={information} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-10">
          <div className="flex gap-10 justify-between items-end">
            <label htmlFor="">Nombre</label>
            <Input
              name="name"
              id="name"
              variant={editable ? "primary" : "disabled"}
              disabled={!editable}
              className="w-8/12 text-center"
              value={information.name}
              onChange={(e) => setInformation(e)}
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2 mt-2"
              name="name"
            />
          </div>
          <div className="flex gap-10 justify-between items-end">
            <label htmlFor="">Apellido paterno</label>
            <Input
              name="firstLastName"
              id="firstLastName"
              variant={editable ? "primary" : "disabled"}
              disabled={!editable}
              className="w-8/12 text-center"
              value={information.firstLastName}
              onChange={(e) => setInformation(e)}
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2 mt-2"
              name="firstLastName"
            />
          </div>
          <div className="flex gap-10 justify-between items-end">
            <label htmlFor="">Apellido materno</label>
            <Input
              name="secondLastName"
              id="secondLastName"
              variant={editable ? "primary" : "disabled"}
              disabled={!editable}
              className="w-8/12 text-center"
              value={information.secondLastName}
              onChange={(e) => setInformation(e)}
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2 mt-2"
              name="secondLastName"
            />
          </div>
          <div className="flex gap-10 justify-between items-end">
            <label htmlFor="phone">Número telefónico</label>
            <Input
              name="phone"
              id="phone"
              variant={editable ? "primary" : "disabled"}
              disabled={!editable}
              className="w-8/12 text-center"
              value={information.phone}
              type="number"
              onChange={(e) => setInformation(e)}
            />
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm pl-2 mt-2"
              name="phone"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PersonalInformation;
