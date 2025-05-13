"use client";
import Experience from "@components/molecules/Experience";
import PersonalInformation from "@components/molecules/PersonalInformation";
import Vehicle from "@components/molecules/Vehicle";
import Ratings from "@components/molecules/Ratings";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { User } from "@models/user";
import { Fragment, useEffect, useState } from "react";

const ProfileTabs = ({
	editable = false,
	user,
	setUser,
}: {
	editable: boolean;
	user: User;
	setUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const [userType, setUserType] = useState<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("userType");
		setUserType(stored);
	}, []);

	const fields = [
		{
			label: "Personal Information",
			value: "personal",
		},
		...(userType === "driver"
			? [
					{ label: "Experience", value: "experience" },
					{ label: "Vehicle", value: "vehicle" },
					{ label: "Ratings & Reviews", value: "ratings" },
				]
			: []),
	];

	const defineProfileTab = (tab: string) => {
		switch (tab) {
			case "personal":
				return (
					<PersonalInformation
						editable={editable}
						information={user}
						setInformation={setUser}
					/>
				);
			case "experience":
				return <Experience />;
			case "vehicle":
				return <Vehicle />;
			case "ratings":
				return <Ratings />;
			default:
				return <p>Personal Information</p>;
		}
	};

	return (
		<TabGroup className="w-full">
			<TabList className="flex w-full border-b">
				{fields.map((field, index) => (
					<Tab key={field.value} as={Fragment}>
						{({ hover, selected }) => (
							<div
								className={`flex justify-center outline-0 ${userType === "driver" ? "w-1/4" : "w-full"}`}
							>
								<button
									className={`${(hover || selected) && "border-b-4 border-accept"}`}
									type="button"
								>
									{field.label}
								</button>
							</div>
						)}
					</Tab>
				))}
			</TabList>
			<TabPanels className="mt-3">
				{fields.map((field, index) => (
					<TabPanel
						key={field.value}
						className="flex flex-col md:flex-row flex-wrap justify-between gap-y-10
                        mt-10 mx-4"
					>
						{defineProfileTab(field.value)}
					</TabPanel>
				))}
			</TabPanels>
		</TabGroup>
	);
};

export default ProfileTabs;
