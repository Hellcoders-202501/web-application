import Input from "@components/atoms/Input";
import type { User } from "@models/user";
import { Form, Formik } from "formik";

const PersonalInformation = ({
	editable = false,
	information,
	setInformation,
}: {
	editable: boolean;
	information: User;
	setInformation: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="w-full lg:mx-10">
			<Formik initialValues={information} onSubmit={() => {}}>
				<Form className="flex flex-col gap-10">
					<div className="flex gap-10 justify-between items-end">
						<label htmlFor="">Nombre</label>
						<Input
							variant={editable ? "primary" : "disabled"}
							disabled={!editable}
							className="w-8/12 text-center"
							value={information.name}
							onChange={(e) => setInformation(e)}
						/>
					</div>
					<div className="flex gap-10 justify-between items-end">
						<label htmlFor="">Apellido paterno</label>
						<Input
							variant={editable ? "primary" : "disabled"}
							disabled={!editable}
							className="w-8/12 text-center"
							value={information.firstLastName}
							onChange={(e) => setInformation(e)}
						/>
					</div>
					<div className="flex gap-10 justify-between items-end">
						<label htmlFor="">Apellido materno</label>
						<Input
							variant={editable ? "primary" : "disabled"}
							disabled={!editable}
							className="w-8/12 text-center"
							value={information.secondLastName}
							onChange={(e) => setInformation(e)}
						/>
					</div>
					<div className="flex gap-10 justify-between items-end">
						<label htmlFor="">Número telefónico</label>
						<Input
							variant={editable ? "primary" : "disabled"}
							disabled={!editable}
							className="w-8/12 text-center"
							value={information.phone}
							onChange={(e) => setInformation(e)}
						/>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default PersonalInformation;
