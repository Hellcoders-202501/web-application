"use client";
import UserProfile from "@components/molecules/UserProfile";
import ProfileTabs from "@components/organisms/ProfileTabs";
import type { Comment, Experience, User, Vehicle } from "@models/user";
import useDriverProfile from "./hooks/useDriverProfile";

const DriverProfileView = ({ userId }: { userId: number }) => {
  const { driver, experiences, vehicles, comments, loading, serviceTypes } =
    useDriverProfile({ driverId: userId });

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-7xl w-full mx-auto py-20">
      {/* LEFT */}
      <UserProfile isDriverView editable={false} user={driver as User} />
      {/* RIGHT */}
      <ProfileTabs
        isDriverView
        editable={false}
        user={driver as User}
        loading={loading}
        experiences={experiences as Experience[]}
        comments={comments as Comment[]}
        serviceTypes={serviceTypes}
        vehicles={vehicles as Vehicle[]}
      />
    </div>
  );
};

export default DriverProfileView;
