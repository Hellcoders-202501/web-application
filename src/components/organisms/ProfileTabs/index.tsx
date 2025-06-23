"use client";
import Experience from "@components/molecules/Experience";
import PersonalInformation from "@components/molecules/PersonalInformation";
import Vehicle from "@components/molecules/Vehicle";
import Ratings from "@components/molecules/Ratings";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type {
  User,
  Experience as ExperienceType,
  Vehicle as VehicleType,
  CreateExperience,
  CreateVehicle,
} from "@models/user";
import { Fragment } from "react";
import useAuth from "@hooks/useAuth";
import { ServiceType } from "@models/common";

const ProfileTabs = ({
  isDriverView = false,
  editable = false,
  user,
  setUser,
  loading,
  handleSubmit,
  updateInformationValidation,
  experiences,
  addExperience,
  experience,
  handleChangeExperience,
  createExperienceValidation,
  serviceTypes,
  vehicles,
  addVehicle,
  vehicle,
  handleChangeVehicle,
  createVehicleValidation,
}: {
  isDriverView?: boolean;
  editable: boolean;
  user: User;
  setUser?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleSubmit?: VoidFunction;
  updateInformationValidation?: any;
  experiences: ExperienceType[];
  addExperience?: VoidFunction;
  experience?: CreateExperience;
  handleChangeExperience?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createExperienceValidation?: any;
  serviceTypes: ServiceType[];
  vehicles: VehicleType[];
  addVehicle?: VoidFunction;
  vehicle?: CreateVehicle;
  handleChangeVehicle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  createVehicleValidation?: any;
}) => {
  const { userType } = useAuth();

  const fields = [
    {
      label: "Información personal",
      value: "personal",
    },
    ...(userType === "DRIVER" || isDriverView
      ? [
          { label: "Experiencia", value: "experience" },
          { label: "Vehículos", value: "vehicle" },
          { label: "Calificación y comentarios", value: "ratings" },
        ]
      : []),
  ];

  const defineProfileTab = (tab: string) => {
    switch (tab) {
      case "personal":
        return (
          <PersonalInformation
            editable={editable}
            information={user}
            setInformation={setUser}
            handleSubmit={handleSubmit}
            updateInformationValidation={updateInformationValidation}
          />
        );
      case "experience":
        return (
          <Experience
            isDriverView
            experiences={experiences}
            addExperience={addExperience}
            experience={experience}
            handleChangeExperience={handleChangeExperience}
            createExperienceValidation={createExperienceValidation}
            loading={loading}
          />
        );
      case "vehicle":
        return (
          <Vehicle
            isDriverView
            serviceTypes={serviceTypes}
            vehicles={vehicles}
            addVehicle={addVehicle}
            vehicle={vehicle}
            handleChangeVehicle={handleChangeVehicle}
            createVehicleValidation={createVehicleValidation}
            loading={loading}
          />
        );
      case "ratings":
        return <Ratings />;
      default:
        return <p>Personal Information</p>;
    }
  };

  return (
    <TabGroup className="w-full">
      <TabList className="flex w-full border-b">
        {fields.map((field, index) => (
          <Tab key={field.value} as={Fragment}>
            {({ hover, selected }) => (
              <div
                className={`flex justify-center outline-0 ${
                  userType === "DRIVER" ? "w-1/4" : "w-full"
                }`}
              >
                <button
                  className={`${
                    (hover || selected) && "border-b-4 border-accept"
                  }`}
                  type="button"
                >
                  {field.label}
                </button>
              </div>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {fields.map((field, index) => (
          <TabPanel
            key={field.value}
            className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
                        mt-10 mx-4"
          >
            {defineProfileTab(field.value)}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default ProfileTabs;
