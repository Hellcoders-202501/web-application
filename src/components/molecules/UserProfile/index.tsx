import Button from "@components/atoms/Button";
import TextArea from "@components/atoms/TextArea";
import { User } from "@models/user";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const UserProfile = ({
  isDriverView = false,
  editable = false,
  setEditable,
  user,
  setDescription,
}: {
  isDriverView?: boolean;
  editable: boolean;
  setEditable?: VoidFunction;
  user: User;
  setDescription?: (description: string) => void;
}) => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <div
      className="flex flex-col gap-5 items-center w-10/12 mx-auto lg:max-w-xl lg:w-full
      relative"
    >
      {isDriverView && (
        <Link
          href={`/${from ?? "requests"}`}
          className="absolute top-0 md:left-10 left-0"
        >
          <IoArrowBackCircle size={48} />
        </Link>
      )}
      <FaRegUserCircle size={120} />
      <p className="font-bold text-4xl">
        {user?.name} {user?.firstLastName}
      </p>
      <TextArea
        className="text-justify block w-11/12 lg:w-full"
        variant={editable ? "primary" : "disabled"}
        disabled={!editable}
        value={user?.description}
        placeholder={
          user?.description === "" || user?.description === null
            ? "Sin descripción"
            : user?.description
        }
        rows={5}
        cols={50}
        onChange={(e) => setDescription?.(e.target.value)}
      />
      {/* <div className="flex gap-4 items-center">
        {Array(user.rating)
          .fill(null)
          .map((_, i) => (
            <FaStar key={i} size={20} />
          ))}
      </div> */}
      {!isDriverView && (
        <Button className="flex gap-2 items-center" onClick={setEditable}>
          <p>{editable ? "Guardar" : "Editar perfil"}</p>
          {!editable && <MdEdit />}
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
