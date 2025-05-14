"use client";
import type { User } from "@models/user";
import { useEffect, useState } from "react";

const useProfile = () => {
	const [userType, setUserType] = useState<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("userType");
		setUserType(stored);

		if (stored === "client")
			setUser({
				...user,
				description:
					stored === "client"
						? "Soy Manuel y me interesa contratar servicios de transporte, mayormente para realizar viajes o excursiones."
						: "Hola. Me llamo Manuel y tengo un coche que uso para dar servicio turístico. Tengo mucha experiencia, ya que empecé en este trabajo hace 10 años. Prometo brindarte el mejor servicio y no te arrepentirás. Puedes llamarme a cualquier hora del día y también escribirme por WhatsApp.",
			});
	}, []);

	const [editable, setEditable] = useState(false);
	const [user, setUser] = useState<User>({
		id: 1,
		name: "Manuel",
		username: "msegura",
		firstLastName: "Segura",
		secondLastName: "Taype",
		email: "manuelsegura@gmail.com",
		phone: "982147238",
		description: "",
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
