import type { RankedDriver } from "@models/user";
import { FaRegUserCircle } from "react-icons/fa";

const UserCard = ({ user }: { user: RankedDriver }) => {
  return (
    <div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
      <FaRegUserCircle size={120} />
      <div>
        <p className="text-2xl font-semibold">
          {user.name} {user.firstLastName}
        </p>
        <p>Número telefónico: {user.phone}</p>
        <p>Valoración: {user.rating > 0 ? user.rating : "Sin calificación"}</p>
      </div>
    </div>
  );
};
export default UserCard;
