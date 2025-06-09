import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";
import TextArea from "@components/atoms/TextArea";
import { ServiceType } from "@models/common";
import type { RequestContract } from "@models/contract";
import { es } from "date-fns/locale";
import { ErrorMessage, Form, Formik } from "formik";
import type { FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface RequestFormProps {
	requestState: RequestContract;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	handleSubmit: VoidFunction,
	requestValidation: VoidFunction,
	loading: boolean,
	editable?: boolean;
	serviceTypes: Array<ServiceType>
}

const RequestForm: FC<RequestFormProps> = ({
	requestState,
	handleChange,
	handleSubmit,
	requestValidation,
	loading,
	editable,
	serviceTypes
}) => {
	const hours = Array.from(
		{ length: 24 },
		(_, i) => `${i.toString().padStart(2, "0")}:00`,
	);

	return (
		<Formik
			enableReinitialize
			initialValues={requestState}
			onSubmit={handleSubmit}
			validationSchema={requestValidation}
		>
			<Form
				className="flex flex-col lg:flex-row justify-center lg:justify-between 
        lg:gap-10 w-full"
			>
				<div className="flex flex-col gap-7 flex-1/2">
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<label htmlFor="origin">Desde</label>
							<Input
								name="origin"
								id="origin"
								variant={!editable ? "disabled" : "primary"}
								disabled={!editable}
								value={requestState.origin}
								onChange={handleChange}
							/>
						</div>
						<ErrorMessage
							component="div"
							className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="origin"
						/>
					</div>
					<div className="flex flex-col">
						<div className="lg:hidden flex justify-between items-center">
							<label htmlFor="destination">Hasta</label>
							<Input
								name="destination"
								id="destination"
								variant={!editable ? "disabled" : "primary"}
								disabled={!editable}
								value={requestState.destination}
								onChange={handleChange}
							/>
						</div>
						<ErrorMessage
							component="div"
							className="lg:hidden text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="destination"
						/>
					</div>
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<label htmlFor="typeService">Tipos de Servicio</label>
							<Select
								name="typeService"
								id="typeService"
								disabled={!editable}
								defaultOption={!editable}
								value={requestState.typeService}
								onChange={handleChange}
							>
								{serviceTypes.map((service) => (
									<option value={service.id} key={service.id}>{service.name}</option>
								))}
							</Select>
						</div>
						<ErrorMessage
							component="div"
							className="lg:hidden text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="typeService"
						/>
					</div>
					<div className="flex flex-col gap-2 lg:gap-0 md:flex-row justify-between items-start">
						<label htmlFor="date">Fecha</label>
						<div className="bg-main p-6 rounded-xl w-[320px] text-white">
							<DayPicker
								mode="single"
								defaultMonth={new Date()}
								selected={new Date()}
								locale={es}
								classNames={{
									selected: "bg-white text-main rounded-full",
									today: "text-accept",
									chevron: "fill-white",
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-7 flex-1/2 mt-5 lg:mt-0">
					<div className="flex flex-col">
						<div className="lg:flex justify-between items-center hidden">
							<label htmlFor="destination">Hasta</label>
							<Input
								name="destination"
								id="destination"
								variant={!editable ? "disabled" : "primary"}
								disabled={!editable}
								value={requestState.destination}
								onChange={handleChange}
							/>
						</div>
						<ErrorMessage
							component="div"
							className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="destination"
						/>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-2">
							<label htmlFor="startTime">Hora salida</label>
							<Select
								name="startTime"
								id="startTime"
								defaultOption={false}
								disabled={!editable}
								value={requestState.startTime}
								onChange={handleChange}
							>
								{hours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</Select>
							<ErrorMessage
								component="div"
								className="text-red-500 text-sm pl-2"
								name="startTime"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="endTime">Hora llegada</label>
							<Select
								name="endTime"
								id="endTime"
								defaultOption={false}
								disabled={!editable}
								value={requestState.endTime}
								onChange={handleChange}
							>
								{hours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</Select>
							<ErrorMessage
								component="div"
								className="text-red-500 text-sm pl-2"
								name="endTime"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<label htmlFor="capacity">Capacidad</label>
							<Input
								name="capacity"
								id="capacity"
								variant={!editable ? "disabled" : "primary"}
								disabled={!editable}
								value={requestState.capacity}
								onChange={handleChange}
								type="number"
							/>
						</div>
						<ErrorMessage
							component="div"
							className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="capacity"
						/>
					</div>
					<div className="flex flex-col">
						<div className="flex justify-between items-center">
							<label htmlFor="amount">Pago</label>
							<Input
								name="amount"
								id="amount"
								value={requestState.amount}
								onChange={handleChange}
								type="number"
							/>
						</div>
						<ErrorMessage
							component="div"
							className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
							name="amount"
						/>
					</div>
					<div className="flex justify-between items-center">
						<label htmlFor="description">Descripción</label>
						<TextArea
							name="description"
							id="description"
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.description}
							onChange={handleChange}
						/>
						<ErrorMessage
							component="div"
							className="text-red-500 text-sm pl-2"
							name="description"
						/>
					</div>
					<Button variant="accept" className="w-full" loading={loading} disabled={loading}>
						{!editable ? "Ofertar" : "Solicitar"}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default RequestForm;
