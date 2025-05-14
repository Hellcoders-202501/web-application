"use client";
import { Form, Formik } from "formik";
import useSearch from "./hooks/useSearch";
import Input from "@components/atoms/Input";
import ResultCard from "@components/molecules/ResultCard";
import Select from "@components/atoms/Select";
import RequestForm from "@components/organisms/RequestForm";

const SearchView = () => {
	const { searchState, watchRequest, setWatchRequest } = useSearch();

	if (watchRequest)
		return (
			<div
				className="flex flex-col items-center max-w-5xl mx-auto w-10/12 lg:w-auto
			 	my-10 lg:my-20"
			>
				<p className="self-start mb-5 text-4xl font-semibold">
					Solicitud por Oscar Canellas
				</p>
				<RequestForm requestState={{
					from: "Comas",
					to: "Los Olivos",
					typeService: "Transporte",
					departureHour: "12:00",
					arrivalHour: "18:00",
					amount: 50,
					capacity: 2,
					description: "Necesito un vehículo para 2 personas",
				}} editable={false} />
			</div>
		);

	return (
		<div
			className="flex flex-col lg:flex-row justify-center lg:justify-between max-w-5xl
            mx-auto w-10/12 lg:w-auto my-10 lg:my-20"
		>
			{/* Left */}
			<div>
				<p className="mb-10 text-4xl font-semibold">Buscar vehículos</p>
				<Formik initialValues={searchState} onSubmit={() => {}}>
					<Form className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label htmlFor="">Tipo de servicios</label>
							<Select name="typeService" id="typeService">
								<option value="Moving">Mudanza</option>
								<option value="Transportation">Transporte</option>
								<option value="Tourism">Turismo</option>
							</Select>
						</div>
						<div className="flex flex-col">
							<label htmlFor="">Capacidad</label>
							<Input />
						</div>
					</Form>
				</Formik>
			</div>
			{/* Right */}
			<div>
				<p className="mb-10 text-4xl font-semibold mt-10 lg:mt-0">Resultados</p>
				<div className="flex flex-col gap-5">
					{Array(2)
						.fill(null)
						.map((_, i) => (
							<ResultCard
								key={i}
								handleRedirect={() => {
									setWatchRequest(true);
								}}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
export default SearchView;
