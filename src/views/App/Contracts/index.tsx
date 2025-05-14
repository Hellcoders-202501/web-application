"use client";
import ContractCard, {
	type ContractVariant,
} from "@components/molecules/ContractCard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const ContractsView = () => {
	const [userType, setUserType] = useState<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("userType");
		setUserType(stored);
	}, []);

	const contracts = [
		{
			type: "Pendientes",
			value: "pending",
		},
		{
			type: "Historial",
			value: "history",
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
							{Array(3)
								.fill(null)
								.map((_, i) => (
									<ContractCard
										key={i}
										variant={contract.value as ContractVariant}
										userType={userType}
									/>
								))}
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>
		</div>
	);
};
export default ContractsView;
