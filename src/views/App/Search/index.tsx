"use client";
import { Form, Formik } from "formik";
import useSearch from "./hooks/useSearch";
import Input from "@components/atoms/Input";
import ResultCard from "@components/molecules/ResultCard";
import Select from "@components/atoms/Select";

const SearchView = () => {
	const { searchState } = useSearch();

	return (
		<div
			className="flex flex-col lg:flex-row justify-center lg:justify-between max-w-5xl
            mx-auto w-10/12 lg:w-auto my-10 lg:my-20"
		>
			{/* Left */}
			<div>
				<p className="mb-10 text-4xl font-semibold">Search Vehicles</p>
				<Formik initialValues={searchState} onSubmit={() => {}}>
					<Form className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label htmlFor="">Type Of Service</label>
							<Select name="typeService" id="typeService">
								<option value="Moving">Moving</option>
								<option value="Transportation">Transportation</option>
								<option value="Tourism">Tourism</option>
							</Select>
						</div>
						<div className="flex flex-col">
							<label htmlFor="">Capacity</label>
							<Input />
						</div>
					</Form>
				</Formik>
			</div>
			{/* Right */}
			<div>
				<p className="mb-10 text-4xl font-semibold mt-10 lg:mt-0">Results</p>
				<div className="flex flex-col gap-5">
					<ResultCard />
					<ResultCard />
				</div>
			</div>
		</div>
	);
};
export default SearchView;
