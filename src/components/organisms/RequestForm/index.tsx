import { Form, Formik } from "formik";
import Select from "@components/atoms/Select";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { FC } from "react";
import TextArea from "@components/atoms/TextArea";
import type { RequestContract } from "@models/contract";

interface RequestFormProps {
	requestState: RequestContract;
	editable?: boolean;
}

const RequestForm: FC<RequestFormProps> = ({ requestState, editable }) => {
	const hours = Array.from(
		{ length: 24 },
		(_, i) => `${i.toString().padStart(2, "0")}:00`,
	);

	return (
		<Formik initialValues={requestState} onSubmit={() => {}}>
			<Form
				className="flex flex-col lg:flex-row justify-center lg:justify-between 
                lg:gap-10 w-full"
			>
				<div className="flex flex-col gap-7 flex-1/2">
					<div className="flex justify-between items-center">
						<label htmlFor="">From</label>
						<Input
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.from}
						/>
					</div>
					<div className="lg:hidden flex justify-between items-center">
						<label htmlFor="">To</label>
						<Input
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.to}
						/>
					</div>
					<div className="flex justify-between items-center">
						<label htmlFor="">Type Service</label>
						<Select
							disabled={!editable}
							defaultOption={!editable}
							value={requestState.typeService}
						>
							<option value="Moving">Moving</option>
							<option value="Transportation">Transportation</option>
							<option value="Tourism">Tourism</option>
						</Select>
					</div>
					<div className="flex flex-col gap-2 lg:gap-0 md:flex-row justify-between items-start">
						<label htmlFor="">Date</label>
						<div className="bg-main p-6 rounded-xl w-[320px] text-white">
							<DayPicker
								mode="single"
								defaultMonth={new Date()}
								selected={new Date()}
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
						<label htmlFor="">To</label>
						<Input
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.to}
						/>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-2">
							<label htmlFor="">Departure Hour</label>
							<Select
								defaultOption={false}
								disabled={!editable}
								value={requestState.departureHour}
							>
								{hours.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</Select>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Arrival Hour</label>
							<Select
								defaultOption={false}
								disabled={!editable}
								value={requestState.arrivalHour}
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
						<label htmlFor="">Capacity</label>
						<Input
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.capacity}
							type="number"
							min={1}
						/>
					</div>
					<div className="flex justify-between items-center">
						<label htmlFor="">Amount</label>
						<Input value={requestState.amount} />
					</div>
					<div className="flex justify-between items-center">
						<label htmlFor="">Description</label>
						<TextArea
							name=""
							id=""
							variant={!editable ? "disabled" : "primary"}
							disabled={!editable}
							value={requestState.description}
						/>
					</div>
					<Button variant="accept" className="w-full">
						{!editable ? "Offer" : "Request"}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default RequestForm;
