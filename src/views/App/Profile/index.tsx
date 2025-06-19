"use client";
import UserProfile from "@components/molecules/UserProfile";
import ProfileTabs from "@components/organisms/ProfileTabs";
import useProfile from "./hooks/useProfile";
import { Experience, Vehicle } from "@models/user";

const ProfileView = () => {
  const {
    editable,
    setEditable,
    user,
    setUser,
    loading,
    handleChange,
    handleSubmit,
    updateInformationValidation,
    experiences,
    handleSubmitExperience,
    experience,
    handleChangeExperience,
    createExperienceValidation,
    serviceTypes,
    vehicles,
    handleSubmitVehicle,
    vehicle,
    handleChangeVehicle,
    createVehicleValidation,
  } = useProfile();

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-7xl w-full mx-auto py-20">
      {/* LEFT */}
      <UserProfile
        editable={editable}
        setEditable={() => {
          if (!editable) setEditable(!editable);
          else handleSubmit();
        }}
        user={user}
        setDescription={(description) =>
          setUser({ ...user, description: description })
        }
      />
      {/* RIGHT */}
      <ProfileTabs
        editable={editable}
        user={user}
        setUser={handleChange}
        loading={loading}
        handleSubmit={handleSubmit}
        updateInformationValidation={updateInformationValidation}
        experiences={experiences as Experience[]}
        addExperience={handleSubmitExperience}
        experience={experience}
        handleChangeExperience={handleChangeExperience}
        createExperienceValidation={createExperienceValidation}
        serviceTypes={serviceTypes}
        vehicles={vehicles as Vehicle[]}
        addVehicle={handleSubmitVehicle}
        vehicle={vehicle}
        handleChangeVehicle={handleChangeVehicle}
        createVehicleValidation={createVehicleValidation}
      />
    </div>
  );
};

export default ProfileView;
