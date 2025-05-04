"use client";
import useSignUp from "./hooks/useSignUp";
import Title from "@components/molecules/Title";

const SignUpView = () => {
	const { defineTitle, defineStep } = useSignUp();

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<Title title={defineTitle()} />
			{defineStep()}
		</div>
	);
};
export default SignUpView;
