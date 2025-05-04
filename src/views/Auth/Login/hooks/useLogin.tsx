import { useState } from "react";

const useLogin = () => {
	const [loginSate, setLoginState] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

    const handleSubmit = () => {
        // TODO: Implement login logic
    }

	return {
		loginSate,
		handleChange,
		handleSubmit,
	};
};

export default useLogin;
