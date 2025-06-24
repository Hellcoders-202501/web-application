import CustomDialog from "@components/molecules/Dialog";
import { FaEye, FaRegUserCircle } from "react-icons/fa";
import useTripDetails from "./hooks/useTripDetails";
import Loading from "@components/atoms/Loading";
import Link from "next/link";

const TripDetailsDialog = ({
  show = false,
  onClose,
  tripId,
}: {
  show: boolean;
  onClose: VoidFunction;
  tripId: number;
}) => {
  const {
    requestResult: trip,
    userType,
    definePaymentStatus,
    defineTripStatus,
  } = useTripDetails(tripId);

  return (
    <CustomDialog open={show} onClose={onClose}>
      {trip ? (
        <div className="px-10 py-8">
          <div className="flex justify-between font-semibold text-lg">
            <p className="text-xl font-semibold">Información</p>
          </div>
          <div className="mt-4">
            <p>
              Desde: <b>{trip?.trip.origin}</b>
            </p>
            <p>
              Hasta: <b>{trip?.trip.destination}</b>
            </p>
            <p>
              Fecha: <b>{trip?.trip.date}</b>
            </p>
            <p>
              Servicio: <b>{trip?.service.name}</b>
            </p>
            <p>
              Horario de entrega:{" "}
              <b>
                {trip?.trip.startTime} - {trip?.trip.endTime}
              </b>
            </p>
            <p>
              Estado del viaje: <b>{defineTripStatus(trip?.trip.status)}</b>
            </p>
            <p>
              Descripción: <i>{trip?.trip.description}</i>
            </p>
          </div>
          <div
            className="flex justify-between font-semibold text-lg border-t mt-4
            pt-2"
          >
            <p className="text-xl font-semibold">Pago</p>
          </div>
          <div className="mt-4">
            <p>
              Monto: <b>{trip?.contract.payment.amount}</b>
            </p>
            <p>
              Estado del pago:{" "}
              <b>{definePaymentStatus(trip?.contract.payment.status)}</b>
            </p>
          </div>
          <div
            className="flex justify-between font-semibold text-lg border-t mt-4
            pt-2"
          >
            {/* <div className="flex justify-between items-center w-full"> */}
            <p>Datos del {userType === "CLIENT" ? "Conductor" : "Cliente"}</p>
            {/* <Link href={`/driver/${trip?.contract.driver.id}`}>
                <FaEye size={20} />
              </Link>
            </div> */}
          </div>
          <div className="flex justify-between items-end gap-10 mt-4">
            <div className="flex gap-2 items-center">
              <FaRegUserCircle size={32} />
              <div className="text-sm">
                <p>
                  {userType === "CLIENT"
                    ? trip?.contract.driver.name +
                      " " +
                      trip?.contract.driver.firstLastName
                    : trip?.client.name + " " + trip?.client.firstLastName}
                </p>
              </div>
            </div>
            <p>
              {userType === "CLIENT"
                ? trip?.contract.driver.phone
                : trip?.client.phone}
            </p>
          </div>
          <div className="mt-4 flex gap-6 items-center">
            {(userType === "DRIVER" &&
              trip?.trip.status === "FINISHED_BY_DRIVER") ||
              (userType === "CLIENT" &&
                trip?.trip.status === "FINISHED_BY_CLIENT" && (
                  <p className="text-lg mt-5 text-center w-full">
                    Haz <b>FINALIZADO</b> <br /> este contrato
                  </p>
                ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </CustomDialog>
  );
};

export default TripDetailsDialog;
