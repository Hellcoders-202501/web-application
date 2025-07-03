import type { RequestResult } from "@models/contract";
import { FaRegUserCircle } from "react-icons/fa";

const TripCard = ({
  trip,
  userType,
}: {
  trip: RequestResult;
  userType: string;
}) => {
  return (
    <div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
      <FaRegUserCircle size={120} />
      <div>
        <p>
          Nombre:{" "}
          {userType === "DRIVER"
            ? `${trip.client.name} ${trip.client.firstLastName}`
            : `${trip.contract.driver.name} ${trip.contract.driver.firstLastName}`}
        </p>
        <p>
          Número telefónico:{" "}
          {userType === "DRIVER"
            ? trip.client.phone
            : trip.contract.driver.phone}
        </p>
        <p className="mt-4">Desde: {trip.trip.origin}</p>
        <p>Hacia: {trip.trip.destination}</p>
        <p>Servicio: {trip.service.name}</p>
      </div>
    </div>
  );
};
export default TripCard;
