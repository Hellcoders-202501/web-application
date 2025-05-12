"use client";
import UserProfile from "@components/molecules/UserProfile";
import ProfileTabs from "@components/organisms/ProfileTabs";
import useProfile from "./hooks/useProfile";

const ProfileView = () => {
	const { editable, setEditable, user, setUser, handleChange } = useProfile();

	return (
		<div className="flex justify-between gap-10 max-w-7xl w-full mx-auto py-20">
			{/* LEFT */}
			<UserProfile
				editable={editable}
				setEditable={() => setEditable(!editable)}
				description={user.description}
                setDescription={(description) => setUser({ ...user, description: description })}
			/>
			{/* RIGHT */}
			<ProfileTabs editable={editable} user={user} setUser={handleChange} />
		</div>
	);
};

export default ProfileView;
