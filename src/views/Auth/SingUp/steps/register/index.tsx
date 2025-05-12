import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import { Form, Formik } from "formik";
import type { FC } from "react";

interface Props {
	state: {
		email: string;
		password: string;
		confirmPassword: string;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: VoidFunction;
}

const Register: FC<Props> = ({ state, handleChange, handleSubmit }) => {
	return (
		<div className="card w-xl mt-10 px-24 py-10">
			<Formik initialValues={state} onSubmit={handleSubmit}>
				<Form className="flex flex-col gap-5">
					<Input
						placeholder="Email address"
						onChange={handleChange}
						name="email"
						type="email"
					/>
					<Input
						placeholder="Password"
						onChange={handleChange}
						name="password"
						type="password"
					/>
					<Input
						placeholder="Confirm password"
						onChange={handleChange}
						name="confirmPassword"
						type="password"
					/>
					<Button type="submit" className="mt-3">
						Continue
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default Register;
