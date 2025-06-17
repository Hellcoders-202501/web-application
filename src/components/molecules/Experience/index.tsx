import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import type {
  CreateExperience,
  Experience as ExperienceType,
} from "@models/user";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  return (
    <div className="flex flex-col gap-5 items-end max-w-xl w-full">
      <div className="flex gap-10 justify-between items-end w-full">
        <label htmlFor="">Trabajo</label>
        <p>{experience.job}</p>
      </div>
      <div className="flex gap-10 justify-between items-end w-full">
        <label htmlFor="">Tiempo</label>
        <p>{experience.duration}</p>
      </div>
    </div>
  );
};

const Experience = ({
  experiences,
  addExperience,
  experience,
  handleChangeExperience,
  createExperienceValidation,
  loading,
}: {
  experiences: ExperienceType[];
  addExperience: VoidFunction;
  experience: CreateExperience;
  handleChangeExperience: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createExperienceValidation: any;
  loading: boolean;
}) => {
  const [showAddExperience, setShowAddExperience] = useState(false);

  return (
    <div className="w-full lg:mx-10 flex flex-col gap-10">
      {experiences.map((experience, id) => (
        <ExperienceCard key={id} experience={experience} />
      ))}
      {!showAddExperience && (
        <Button
          variant="accept"
          className="w-fit self-end"
          onClick={() => setShowAddExperience(true)}
        >
          Agregar experiencia
        </Button>
      )}
      {showAddExperience && (
        <Formik
          enableReinitialize
          validationSchema={createExperienceValidation}
          initialValues={experience}
          onSubmit={() => {
            addExperience();
            setShowAddExperience(false);
          }}
        >
          <Form className="flex flex-col gap-5 items-end max-w-xl w-full">
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="job">Trabajo</label>
                <Input
                  name="job"
                  id="job"
                  className="w-8/12 text-center"
                  disabled={loading}
                  value={experience.job}
                  onChange={handleChangeExperience}
                />
              </div>

              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="job"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="duration">Tiempo</label>
                <Input
                  name="duration"
                  id="duration"
                  className="w-8/12 text-center"
                  disabled={loading}
                  value={experience.duration}
                  onChange={handleChangeExperience}
                />
              </div>
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="duration"
              />
            </div>
            <Button
              variant="accept"
              className="w-fit self-end"
              disabled={loading}
              loading={loading}
            >
              Crear
            </Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Experience;
