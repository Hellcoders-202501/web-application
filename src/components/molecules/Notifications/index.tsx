"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoIosNotifications } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiInformation2Fill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa6";
import { IoAlertCircle } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import useNotification from "@hooks/useNotifications";

const NotificationCard = ({
  type,
  read,
  userType,
}: {
  type: string;
  read: boolean;
  userType: string | null;
}) => {
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
      case "REQUEST_APPLIED":
        return <IoAlertCircle color="orange" size={120} />;
      case "REQUEST_DECLINED":
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
      case "CONTRACT_CREATED":
        return (
          <>
            <FaCar color="#1c96c5" className="hidden md:block" size={120} />
            <FaCar color="#1c96c5" className="md:hidden" size={80} />
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
      case "REQUEST_APPLIED":
        return userType === "DRIVER"
          ? "Has realizado una solicitud"
          : "Has recibido una solicitud";
      case "CONTRACT_CREATED":
        return userType === "DRIVER"
          ? "El cliente ha aceptado tu solicitud"
          : "Has aceptado una solicitud";
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
      case "REQUEST_APPLIED":
        return userType === "DRIVER"
          ? "Has realizado una solicitud, el cliente la verá pronto"
          : "Has recibido nuevas solicitudes a tu oferta";
      case "CONTRACT_CREATED":
        return userType === "DRIVER"
          ? "Tu solicitud ha sido aceptada, revisa el nuevo contrato pendiente"
          : "Has aceptado tu solicitud, revisa el nuevo contrato pendiente";
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
    sortedNotifications,
    loading,
    totalUnreadNotifications,
    handleReadNotifications,
  } = useNotification();

  return (
    <div>
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton
              className="focus:outline-none cursor-pointer relative"
              onClick={() => {
                if (open) handleReadNotifications();
              }}
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
                  sortedNotifications.map((notification, index) => {
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
          </>
        )}
      </Popover>
    </div>
  );
};

export default Notifications;
