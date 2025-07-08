"use client";
import ContractCard, {
	type ContractVariant,
} from "@components/molecules/ContractCard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useAuth from "@hooks/useAuth";
import { Fragment } from "react";
import useContracts from "./hooks/useContracts";

const ContractsView = () => {
	const { userType } = useAuth();
	const {
		pendingTripsList,
		historyTripsList,
		startContract,
		deleteContract,
		completeContract,
		finishContract,
	} = useContracts();

	const contracts = [
		{
			type: "Pendientes",
			value: "pending",
			trips: pendingTripsList,
		},
		{
			type: "Historial",
			value: "history",
			trips: historyTripsList,
		},
	];

	return (
		<div className="flex flex-col justify-center max-w-4xl mx-auto w-10/12 lg:w-auto my-10">
			<TabGroup>
				<TabList className="flex gap-4 w-full border-b">
					{contracts.map((contract) => (
						<Tab key={contract.value} as={Fragment}>
							{({ hover, selected }) => (
								<div className="w-1/2 flex justify-center">
									<button
										className={`${(hover || selected) && "border-b-4 border-accept"}
										w-1/2`}
										type="button"
									>
										{contract.type}
									</button>
								</div>
							)}
						</Tab>
					))}
				</TabList>
				<TabPanels className="mt-3">
					{contracts.map((contract) => (
						<TabPanel
							key={contract.value}
							className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
              				mt-10 mx-4"
						>
							{contract.trips.length === 0 ? (
								<div className="flex justify-center items-center">
									<p className="text-center text-lg text-gray-500">
										No tienes contratos
									</p>
								</div>
							) : (
								<>
									{contract.trips.map((trip) => (
										<ContractCard
											key={trip.id}
											variant={contract.value as ContractVariant}
											userType={userType}
											request={trip}
											startContract={startContract}
											deleteContract={deleteContract}
											completeContract={completeContract}
											finishContract={finishContract}
										/>
									))}
								</>
							)}
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>
		</div>
	);
};
export default ContractsView;
