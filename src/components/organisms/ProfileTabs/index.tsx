"use client";
import BankAccount from "@components/molecules/BankAccount";
import Experience from "@components/molecules/Experience";
import PersonalInformation from "@components/molecules/PersonalInformation";
import Ratings from "@components/molecules/Ratings";
import Vehicle from "@components/molecules/Vehicle";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useAuth from "@hooks/useAuth";
import type { BankAccountType, ServiceType } from "@models/common";
import type {
  Comment,
  CreateBankAccount,
  CreateComment,
  CreateExperience,
  CreateVehicle,
  EditBankAccount,
  Experience as ExperienceType,
  BankAccount as IBankAccount,
  User,
  Vehicle as VehicleType,
} from "@models/user";
import { Fragment } from "react";

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
  handleRemoveExperience,
  serviceTypes,
  vehicles,
  addVehicle,
  vehicle,
  handleChangeVehicle,
  createVehicleValidation,
  handleRemoveVehicle,
  comments,
  bankAccountTypes,
  bankAccountData,
  addBankAccount,
  bankAccount,
  handleChangeBankAccount,
  createBankAccountValidation,
  handleRemoveBankAccount,
  handleEditBankAccount,
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
  handleRemoveExperience?: (id: number) => void;
  serviceTypes: ServiceType[];
  vehicles: VehicleType[];
  addVehicle?: VoidFunction;
  vehicle?: CreateVehicle;
  handleChangeVehicle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  createVehicleValidation?: any;
  handleRemoveVehicle?: (id: number) => void;
  comments: Comment[];
  addComment?: VoidFunction;
  comment?: CreateComment;
  handleChangeComment?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createCommentValidation?: any;
  handleRemoveComment?: (id: number) => void;
  bankAccountTypes?: BankAccountType[];
  bankAccountData?: IBankAccount;
  addBankAccount?: VoidFunction;
  bankAccount?: CreateBankAccount | EditBankAccount;
  handleChangeBankAccount?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  createBankAccountValidation?: any;
  handleRemoveBankAccount?: (id: number) => void;
  handleEditBankAccount?: VoidFunction;
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
    ...(userType === "DRIVER" && !isDriverView
      ? [{ label: "Cuenta bancaria", value: "bank_account" }]
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
            isDriverView={userType === "CLIENT"}
            experiences={experiences}
            addExperience={addExperience}
            experience={experience}
            handleChangeExperience={handleChangeExperience}
            createExperienceValidation={createExperienceValidation}
            handleRemoveExperience={handleRemoveExperience}
            loading={loading}
          />
        );
      case "vehicle":
        return (
          <Vehicle
            isDriverView={userType === "CLIENT"}
            serviceTypes={serviceTypes}
            vehicles={vehicles}
            addVehicle={addVehicle}
            vehicle={vehicle}
            handleChangeVehicle={handleChangeVehicle}
            createVehicleValidation={createVehicleValidation}
            handleRemoveVehicle={handleRemoveVehicle}
            loading={loading}
          />
        );
      case "ratings":
        return (
          <Ratings
            comments={comments}
            loading={loading}
          />
        );
      case "bank_account":
        return (
          <BankAccount
            bankAccountData={bankAccountData}
            bankAccountTypes={bankAccountTypes}
            bankAccount={bankAccount}
            addBankAccount={addBankAccount}
            handleChangeBankAccount={handleChangeBankAccount}
            createBankAccountValidation={createBankAccountValidation}
            handleRemoveBankAccount={handleRemoveBankAccount}
            handleEditBankAccount={handleEditBankAccount}
            loading={loading}
          />
        );
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
