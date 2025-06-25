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
  read,
  userType,
}: { type: string; read: boolean; userType: string | null }) => {
  const defineIcon = () => {
    switch (type) {
      case "TRIP_STARTED":
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
      case "TRIP_FINISHED_BY_DRIVER":
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
      case "TRIP_FINISHED_BY_CLIENT":
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
      case "TRIP_STARTED":
        return "El viaje ha comenzado";
      case "declined":
        return "Offer declined";
      case "offer":
        return "New offer";
      case "TRIP_FINISHED_BY_DRIVER":
        return "El viaje ha sido finalizado por el conductor";
      case "TRIP_FINISHED_BY_CLIENT":
        return "El viaje ha sido finalizado por el cliente";
      default:
        return null;
    }
  };

  const defineText = () => {
    switch (type) {
      case "TRIP_STARTED":
        return userType === "DRIVER"
          ? "Has comenzado un viaje"
          : "El conductor ha comenzado un viaje";
      case "accepted":
        return userType === "DRIVER"
          ? "Your offer have been accepted"
          : "You have accepted the offer from Oscar Canellas";
      case "declined":
        return userType === "DRIVER"
          ? "Your offer have been declined"
          : "You have declined the offer from Oscar Canellas";
      case "offer":
        return "You have a new offer from a driver";
      case "TRIP_FINISHED_BY_DRIVER":
        return userType === "DRIVER"
          ? "Has marcado el viaje como finalizado"
          : "El conductor ha marcado el viaje como finalizado";
      case "TRIP_FINISHED_BY_CLIENT":
        return userType === "DRIVER"
          ? "El cliente ha marcado el viaje como finalizado"
          : "Has marcado el viaje como finalizado";
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex justify-between items-center border border-black/50 rounded-lg md:px-10
			px-5 py-5 md:max-w-lg w-full mx-auto ${read ? "bg-gray-300/50" : ""}`}
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
  const {
    notifications,
    loading,
    totalUnreadNotifications,
    handleReadNotifications,
  } = useNotification();

  return (
    <div>
      <Popover>
        <PopoverButton
          className="focus:outline-none cursor-pointer relative"
          onClick={handleReadNotifications}
        >
          <IoIosNotifications color="white" size={24} />
          <p>
            {totalUnreadNotifications > 0 && (
              <span
                className="bg-main rounded-full text-white absolute -top-4 left-2 px-1
                py-1 text-xs border-2 border-white/50"
              >
                {totalUnreadNotifications}
              </span>
            )}
          </p>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom start"
          className="md:min-w-xl md:w-auto w-10/12 min-h-44 bg-white 
					shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-md"
        >
          <div className="flex flex-col gap-5 p-5 max-h-[680px] overflow-y-auto">
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
                    read={notification.seen}
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
