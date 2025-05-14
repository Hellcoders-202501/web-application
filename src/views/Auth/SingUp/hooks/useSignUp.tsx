import { useState } from "react";
import Register from "../steps/register";
import FillInformation from "../steps/fill-information";

const useLogin = () => {
	const [step, setStep] = useState(0);

	const [signUpState, setSignUpState] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		firstLastName: "",
		secondLastName: "",
		phone: "",
		username: "",
	});

	const [userType, setUserType] = useState("client");
	const [conditions, setConditions] = useState({
		terms: false,
		privacy: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignUpState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserType(e.target.value);
	};

	const handleConditions = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setConditions((prevState) => ({
			...prevState,
			[name]: checked,
		}));
	};

	const handleSubmit = () => {
		// TODO: Implement singup logic
		localStorage.setItem("userType", userType);
		window.location.href = "/"; // Redireccionar a la página de inicio después del registro
	};

	const defineTitle = () => {
		switch (step) {
			case 0:
				return "Crear una nueva cuenta";
			case 1:
				return "Completar tu información de usuario";
			default:
				return "Registro";
		}
	};

	const defineStep = () => {
		switch (step) {
			case 0:
				return (
					<Register
						state={{
							email: signUpState.email,
							password: signUpState.password,
							confirmPassword: signUpState.password,
						}}
						handleChange={handleChange}
						handleSubmit={() => setStep(1)}
					/>
				);
			case 1:
				return (
					<FillInformation
						state={{
							...signUpState,
							userType,
							...conditions,
						}}
						handleChange={handleChange}
						handleUserType={handleUserType}
						handleConditions={handleConditions}
						handleSubmit={handleSubmit}
					/>
				);
			default:
				return <p>Registo</p>;
		}
	};

	return {
		defineTitle,
		defineStep,
	};
};

export default useLogin;
