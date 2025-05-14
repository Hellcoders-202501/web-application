"use client";
import ContractCard from "@components/molecules/ContractCard";
import useRequestService from "./hooks/useRequestService";
import RequestForm from "@components/organisms/RequestForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";

const RequestView = () => {
	const { requestState, handleChange } = useRequestService();

	return (
		<div className="flex flex-col justify-center max-w-4xl mx-auto w-10/12 lg:w-auto my-10">
			<TabGroup className="w-full">
				<TabList className="flex w-full border-b">
					<Tab as={Fragment}>
						{({ hover, selected }) => (
							<div className="flex justify-center outline-0 w-1/2">
								<button
									className={`${
										(hover || selected) && "border-b-4 border-accept"
									}`}
									type="button"
								>
									Hacer una solicitud
								</button>
							</div>
						)}
					</Tab>
					<Tab as={Fragment}>
						{({ hover, selected }) => (
							<div className="flex justify-center outline-0 w-1/2">
								<button
									className={`${
										(hover || selected) && "border-b-4 border-accept"
									}`}
									type="button"
								>
									Solicitudes realizadas
								</button>
							</div>
						)}
					</Tab>
					<Tab as={Fragment}>
						{({ hover, selected }) => (
							<div className="flex justify-center outline-0 w-1/2">
								<button
									className={`${
										(hover || selected) && "border-b-4 border-accept"
									}`}
									type="button"
								>
									Ofertas
								</button>
							</div>
						)}
					</Tab>
				</TabList>
				<TabPanels className="mt-3">
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto "
					>
						<p className="self-start mb-5 text-4xl font-semibold">
							Solicitar servicio
						</p>
						<RequestForm requestState={requestState} editable />
					</TabPanel>
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto "
					>
						{Array(5)
							.fill(null)
							.map((_, index) => (
								<ContractCard key={index} variant="request" />
							))}
					</TabPanel>
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto"
					>
						{Array(5)
							.fill(null)
							.map((_, index) => (
								<ContractCard key={index} variant="offer" userType="client" />
							))}
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
};
export default RequestView;
