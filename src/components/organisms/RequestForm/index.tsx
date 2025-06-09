import { Form, Formik } from "formik";
import Select from "@components/atoms/Select";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { FC } from "react";
import TextArea from "@components/atoms/TextArea";
import type { RequestContract } from "@models/contract";
import { es } from "date-fns/locale";
import { ServiceType } from "@models/common";

interface RequestFormProps {
	requestState: RequestContract;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	editable?: boolean;
	serviceTypes: Array<ServiceType>
}

const RequestForm: FC<RequestFormProps> = ({ requestState, handleChange, editable, serviceTypes }) => {
	const hours = Array.from(
		{ length: 24 },
		(_, i) => `${i.toString().padStart(2, "0")}:00`,
	);

	return (
		<Formik initialValues={requestState} onSubmit={() => { }}>
			<Form
				className="flex flex-col lg:flex-row justify-center lg:justify-between 
        lg:gap-10 w-full"
			>
				<div className="flex flex-col gap-7 flex-1/2">
					<div className="flex justify-between items-center">
						<label htmlFor="from">Desde</label>
						<Input
							name="from"
							id="from"
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.from}
							onChange={handleChange}
						/>
					</div>
					<div className="lg:hidden flex justify-between items-center">
						<label htmlFor="to">Hasta</label>
						<Input
							name="to"
							id="to"
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.to}
							onChange={handleChange}
						/>
					</div>
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
					<div className="lg:flex justify-between items-center hidden">
						<label htmlFor="to">Hasta</label>
						<Input
							name="to"
							id="to"
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.to}
							onChange={handleChange}
						/>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-2">
							<label htmlFor="departureHour">Hora salida</label>
							<Select
								name="departureHour"
								id="departureHour"
								defaultOption={false}
								disabled={!editable}
								value={requestState.departureHour}
								onChange={handleChange}
							>
								{hours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</Select>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="arrivalHour">Hora llegada</label>
							<Select
								name="arrivalHour"
								id="arrivalHour"
								defaultOption={false}
								disabled={!editable}
								value={requestState.arrivalHour}
								onChange={handleChange}
							>
								{hours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</Select>
						</div>
					</div>
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
					</div>
					<Button variant="accept" className="w-full">
						{!editable ? "Ofertar" : "Solicitar"}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default RequestForm;
