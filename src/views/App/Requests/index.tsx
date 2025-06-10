"use client";
import ContractCard from "@components/molecules/ContractCard";
import RequestForm from "@components/organisms/RequestForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment, useState } from "react";
import useRequestService from "./hooks/useRequestService";

const RequestView = () => {
	const {
		requestState,
		handleChange,
		handleSubmit,
		requestValidation,
		loading,
		serviceTypes,
		requestResultList,
		tabIndex,
		setTabIndex,
		handleOffers,
		applicationList,
		acceptContract,
		declineOffer,
	} = useRequestService();

	return (
		<div className="flex flex-col justify-center max-w-4xl mx-auto w-10/12 lg:w-auto my-10">
			<TabGroup
				className="w-full"
				selectedIndex={tabIndex}
				onChange={setTabIndex}
			>
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
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto"
					>
						<p className="self-start mb-5 text-4xl font-semibold">
							Solicitar servicio
						</p>
						<RequestForm
							requestState={requestState}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							requestValidation={requestValidation}
							loading={loading}
							serviceTypes={serviceTypes}
							editable
						/>
					</TabPanel>
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto "
					>
						{requestResultList.length > 0 ? (
							<>
								{requestResultList.map((request) => (
									<ContractCard
										key={request.id}
										variant="request"
										request={request}
										seeOffers={handleOffers}
									/>
								))}
							</>
						) : (
							<p className="self-start mb-5 text-4xl font-semibold">
								No hay solicitudes realizadas
							</p>
						)}
					</TabPanel>
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
						mt-10 max-w-5xl mx-auto w-10/12 lg:w-auto"
					>
						{!applicationList?.applications ||
						applicationList.applications.length === 0 ? (
							<p className="self-start mb-5 text-4xl font-semibold">
								No hay ofertas
							</p>
						) : (
							<>
								{applicationList?.applications.map((application) => (
									<ContractCard
										key={application.id}
										variant="offer"
										userType="client"
										application={application}
										acceptContract={acceptContract}
										declineOffer={declineOffer}
									/>
								))}
							</>
						)}
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
};
export default RequestView;
