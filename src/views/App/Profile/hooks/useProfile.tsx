import type { User } from "@models/user";
import { useState } from "react";

const useProfile = () => {
	const [editable, setEditable] = useState(false);
	const [user, setUser] = useState<User>({
		id: 1,
		name: "Manuel",
		username: "msegura",
		firstLastName: "Segura",
		secondLastName: "Taype",
		email: "manuelsegura@gmail.com",
		phone: "982147238",
		description: "Hello. My name is Mario and I have a car that I use to give tourism service. I have too much experience because I started in this job 15 years ago. I promise to give the best service and you won’t regret. You can phone any time of the day and you can text me on WhatsApp too."
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return {
		editable,
		setEditable,
		user,
		setUser,
		handleChange,
	};
};

export default useProfile;
