"use client";
import ContractCard from "@components/molecules/ContractCard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";

const ContractsView = () => {
	return (
		<div className="flex flex-col justify-center max-w-4xl mx-auto w-10/12 lg:w-auto my-10">
			<TabGroup>
				<TabList className="flex gap-4 w-full border-b">
					<Tab as={Fragment}>
						{({ hover, selected }) => (
							<div className="w-1/2 flex justify-center">
								<button
									className={`${(hover || selected) && "border-b-4 border-accept"}
                                    w-1/2`}
									type="button"
								>
									Pending
								</button>
							</div>
						)}
					</Tab>
					<Tab as={Fragment}>
						{({ hover, selected }) => (
							<div className="w-1/2 flex justify-center">
								<button
									className={`${(hover || selected) && "border-b-4 border-accept"}
                                    w-1/2`}
									type="button"
								>
									History
								</button>
							</div>
						)}
					</Tab>
				</TabList>
				<TabPanels className="mt-3">
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
                        mt-10 mx-4"
					>
						<ContractCard variant="pending" />
						<ContractCard variant="pending" />
						<ContractCard variant="pending" />
						<ContractCard variant="pending" />
					</TabPanel>
					<TabPanel
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
                        mt-10 mx-4"
					>
						<ContractCard />
						<ContractCard />
                        <ContractCard />
						<ContractCard />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
};
export default ContractsView;
