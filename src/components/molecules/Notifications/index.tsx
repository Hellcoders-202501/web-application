"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoIosNotifications } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiInformation2Fill } from "react-icons/ri";

const NotificationCard = ({
	type,
}: {
	type: string;
}) => {
	const defineIcon = () => {
		switch (type) {
			case "accepted":
				return (
					<>
						<FaCheckCircle
							color="green"
							className="hidden md:block"
							size={120}
						/>
						<FaCheckCircle color="green" className="md:hidden" size={80} />
					</>
				);
			case "declined":
				return (
					<>
						<TiDelete color="red" className="hidden md:block" size={150} />
						<TiDelete color="red" className="md:hidden" size={100} />
					</>
				);
			case "offer":
				return (
					<>
						<RiInformation2Fill color="blue" className="hidden md:block" size={150} />
						<RiInformation2Fill color="blue" className="md:hidden" size={100} />
					</>
				);
			default:
				return null;
		}
	};

	const defineTitle = () => {
		switch (type) {
			case "accepted":
				return "Offer accepted";
			case "declined":
				return "Offer declined";
			case "offer":
				return "New offer";
			default:
				return null;
		}
	};

	const defineText = () => {
		switch (type) {
			case "accepted":
				return "Your offer have been accepted";
			case "declined":
				return "Your offer have been declined";
			case "offer":
				return "You have a new offer";
			default:
				return null;
		}
	};

	return (
		<div
			className="flex justify-between items-center border border-black/50 rounded-lg md:px-10
			px-5 py-5 md:min-w-lg mx-auto"
		>
			<span>{defineIcon()}</span>
			<div className="flex flex-col md:gap-6">
				<p className="text-2xl text-center">{defineTitle()}</p>
				<p className="text-center">{defineText()}</p>
			</div>
		</div>
	);
};

const Notifications = ({
	userType,
}: {
	userType: string | null;
}) => {
	return (
		<div>
			<Popover>
				<PopoverButton className="focus:outline-none cursor-pointer">
					<IoIosNotifications color="white" size={24} />
				</PopoverButton>
				<PopoverPanel
					transition
					anchor="bottom start"
					className="md:min-w-xl md:w-auto w-10/12 min-h-44 bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)]
					rounded-md"
				>
					{userType === "driver" ? (
						<div className="flex flex-col gap-5 p-5">
							<NotificationCard type="accepted" />
							<NotificationCard type="declined" />
						</div>
					) : (
						<div className="flex flex-col gap-5 p-5">
							<NotificationCard type="offer" />
						</div>
					)}
				</PopoverPanel>
			</Popover>
		</div>
	);
};

export default Notifications;
