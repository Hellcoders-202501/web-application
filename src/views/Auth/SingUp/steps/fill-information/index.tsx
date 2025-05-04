import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import type { RegisterUser } from "@models/user";
import { Form, Formik } from "formik";
import type { FC } from "react";

interface Props {
	state: RegisterUser;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleUserType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleConditions: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: VoidFunction;
}

const FillInformation: FC<Props> = ({
	state,
	handleChange,
	handleUserType,
	handleConditions,
	handleSubmit,
}) => {
	return (
		<div className="card-form mt-10 px-24 py-10">
			<Formik initialValues={state} onSubmit={handleSubmit}>
				<Form className="flex flex-col gap-5">
					<div className="flex flex-col md:flex-row gap-5 md:gap-10">
						<div className="flex flex-col gap-5">
							<Input
								placeholder="Name"
								onChange={handleChange}
								name="name"
								type="text"
							/>
							<Input
								placeholder="First Lastname"
								onChange={handleChange}
								name="firstLastName"
								type="text"
							/>
						</div>
						<div className="flex flex-col gap-5">
							<Input
								placeholder="Second Lastname"
								onChange={handleChange}
								name="secondLastName"
								type="text"
							/>
							<Input
								placeholder="Phonenumber"
								onChange={handleChange}
								name="phone"
								type="number"
							/>
						</div>
					</div>

					<select
						name="userType"
						id="userType"
						className="border rounded-2xl mx-2 py-4 px-8"
						onChange={handleUserType}
					>
						<option value="client">Client</option>
						<option value="driver">Driver</option>
					</select>

					<div className="flex flex-col gap-2">
						<div className="flex gap-2 items-center">
							<Input
								type="checkbox"
								className="self-start md:self-auto mt-2 md:mt-0"
								name="terms"
								onChange={handleConditions}
							/>
							<label htmlFor="">
								I declare that I have read and accepted the terms and conditions
							</label>
						</div>
						<div className="flex gap-2 items-center">
							<Input
								type="checkbox"
								name="privacy"
								onChange={handleConditions}
							/>
							<label htmlFor="">I agree to the use of my information.</label>
						</div>
					</div>
					<Button type="submit" className="mt-3">
						Sign Up
					</Button>
				</Form>
			</Formik>
		</div>
	);
};
export default FillInformation;
