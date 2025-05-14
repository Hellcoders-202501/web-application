import { FaRegUserCircle } from "react-icons/fa";

const UserCard = () => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaRegUserCircle size={120} />
			<div>
				<p className="text-2xl font-semibold">Oscar Canellas</p>
				<p>Número telefónico: 983288372</p>
				<p>Calificación: 5</p>
			</div>
		</div>
	);
};
export default UserCard;
