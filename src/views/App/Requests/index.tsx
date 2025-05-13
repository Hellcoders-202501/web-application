"use client";
import { Form, Formik } from "formik";
import useRequestService from "./hooks/useRequestService";
import Select from "@components/atoms/Select";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";

const RequestView = () => {
	const { requestState } = useRequestService();

	return (
		<div className="flex flex-col items-center max-w-5xl mx-auto w-10/12 lg:w-auto my-10 lg:my-20">
			<p className="self-start mb-5 text-4xl font-semibold">Request service</p>
			<Formik initialValues={requestState} onSubmit={() => {}}>
				<Form
					className="flex flex-col lg:flex-row justify-center lg:justify-between 
                    lg:gap-10 w-full"
				>
					<div className="flex flex-col gap-7 flex-1/2">
						<div className="flex justify-between items-center">
							<label htmlFor="">From</label>
							<Input />
						</div>
						<div className="flex justify-between items-center">
							<label htmlFor="">Type Service</label>
							<Select>
								<option value="Moving">Moving</option>
								<option value="Transportation">Transportation</option>
								<option value="Tourism">Tourism</option>
							</Select>
						</div>
						<div className="flex justify-between items-start">
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
					<div className="flex flex-col gap-7 flex-1/2">
						<div className="flex justify-between items-center">
							<label htmlFor="">To</label>
							<Input />
						</div>
						<div className="flex justify-between items-center">
							<label htmlFor="">Capacity</label>
							<Input />
						</div>
						<div className="flex justify-between items-center">
							<label htmlFor="">Amount</label>
							<Input />
						</div>
						<div className="flex justify-between items-center">
							<label htmlFor="">Description</label>
							<textarea
								name=""
								id=""
								className="focus:ring-0 focus:outline-none focus:bg-transparent
                                focus:shadow-none border-b placeholder:text-black/50"
							/>
						</div>
						<Button variant="accept" className="w-full">
							Submit
						</Button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};
export default RequestView;
