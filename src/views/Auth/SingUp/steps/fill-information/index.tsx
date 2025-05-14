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
		<div className="card mt-10 px-24 py-10">
			<Formik initialValues={state} onSubmit={handleSubmit}>
				<Form className="flex flex-col gap-5">
					<div className="flex flex-col md:flex-row gap-5 md:gap-10">
						<div className="flex flex-col gap-5">
							<Input
								placeholder="Nombre"
								onChange={handleChange}
								name="name"
								type="text"
							/>
							<Input
								placeholder="Apellido paterno"
								onChange={handleChange}
								name="firstLastName"
								type="text"
							/>
						</div>
						<div className="flex flex-col gap-5">
							<Input
								placeholder="Apellido materno"
								onChange={handleChange}
								name="secondLastName"
								type="text"
							/>
							<Input
								placeholder="Número telefónico"
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
						<option value="client">Cliente</option>
						<option value="driver">Conductor</option>
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
								Declaro haber leído los términos y condiciones
							</label>
						</div>
						<div className="flex gap-2 items-center">
							<Input
								type="checkbox"
								name="privacy"
								onChange={handleConditions}
							/>
							<label htmlFor="">Estoy de acuerdo con que usen mi información</label>
						</div>
					</div>
					<Button type="submit" className="mt-3">
						Registrar
					</Button>
				</Form>
			</Formik>
		</div>
	);
};
export default FillInformation;
