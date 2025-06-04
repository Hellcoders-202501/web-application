import { useState } from "react";
import { sigin } from "@redux/user/userThunk";
import { LoginState } from "@models/user";
import { useAppDispatch } from "@core/store";

const useLogin = () => {
	const dispatch = useAppDispatch();

	const [loginSate, setLoginState] = useState<LoginState>({
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
		dispatch(sigin(loginSate));
        // TODO: Implement login logic
		// window.location.href = "/"; // Redirect to home page after login
		// localStorage.setItem("userType", "driver");
    }

	return {
		loginSate,
		handleChange,
		handleSubmit,
	};
};

export default useLogin;
