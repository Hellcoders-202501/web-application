"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoIosNotifications } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiInformation2Fill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa6";
import useNotification from "@hooks/useNotifications";

const NotificationCard = ({
  type,
  userType,
}: { type: string; userType: string | null }) => {
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
            <RiInformation2Fill
              color="orange"
              className="hidden md:block"
              size={120}
            />
            <RiInformation2Fill
              color="orange"
              className="md:hidden"
              size={80}
            />
          </>
        );
      case "completed":
        return (
          <>
            <IoCheckmarkDoneCircle
              color="blue"
              className="hidden md:block"
              size={120}
            />
            <IoCheckmarkDoneCircle
              color="blue"
              className="md:hidden"
              size={80}
            />
          </>
        );
      case "finalized":
        return (
          <>
            <FaFileContract
              color="gray"
              className="hidden md:block"
              size={120}
            />
            <FaFileContract color="gray" className="md:hidden" size={80} />
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
      case "completed":
        return "Contract completed";
      case "finalized":
        return "Contract finalized";
      default:
        return null;
    }
  };

  const defineText = () => {
    switch (type) {
      case "accepted":
        return userType === "driver"
          ? "Your offer have been accepted"
          : "You have accepted the offer from Oscar Canellas";
      case "declined":
        return userType === "driver"
          ? "Your offer have been declined"
          : "You have declined the offer from Oscar Canellas";
      case "offer":
        return "You have a new offer from a driver";
      case "completed":
        return userType === "driver"
          ? "You have marked the contract as completed"
          : "Oscar Canellas have marked the contract as completed";
      case "finalized":
        return userType === "driver"
          ? "Oscar Canellas have marked the contract as finalized"
          : "You have marked the contract as finalized";
      default:
        return null;
    }
  };

  return (
    <div
      className="flex justify-between items-center border border-black/50 rounded-lg md:px-10
			px-5 py-5 md:max-w-lg w-full mx-auto"
    >
      <span>{defineIcon()}</span>
      <div className="flex flex-col md:gap-6 max-w-1/2 w-full">
        <p className="text-2xl text-center">{defineTitle()}</p>
        <p className="text-center">{defineText()}</p>
      </div>
    </div>
  );
};

const Notifications = ({ userType }: { userType: string | null }) => {
  const { notifications, loading } = useNotification();

  return (
    <div>
      <Popover>
        <PopoverButton className="focus:outline-none cursor-pointer">
          <IoIosNotifications color="white" size={24} />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom start"
          className="md:min-w-xl md:w-auto w-10/12 min-h-44 bg-white 
					shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-md"
        >
          <div className="flex flex-col gap-5 p-5">
            {loading ? (
              <div className="flex justify-center items-center">
                <p>Cargando notificaciones...</p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                return (
                  <NotificationCard
                    key={index}
                    type={notification.type}
                    userType={userType}
                  />
                );
              })
            )}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default Notifications;
