"use client";
import UserProfile from "@components/molecules/UserProfile";
import ProfileTabs from "@components/organisms/ProfileTabs";
import useProfile from "./hooks/useProfile";
import { Experience } from "@models/user";

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
    vehicles,
    handleSubmitExperience,
    experience,
    handleChangeExperience,
    createExperienceValidation,
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
        vehicles={vehicles}
        addExperience={handleSubmitExperience}
        experience={experience}
        handleChangeExperience={handleChangeExperience}
        createExperienceValidation={createExperienceValidation}
      />
    </div>
  );
};

export default ProfileView;
