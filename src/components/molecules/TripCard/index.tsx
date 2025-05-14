import { FaRegUserCircle } from "react-icons/fa";

const TripCard = () => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaRegUserCircle size={120} />
			<div>
				<p>Nombre: Oscar Canellas</p>
				<p>Número telefónico: 983288372</p>
				<p className="mt-4">Desde: Comas</p>
				<p>Hacia: Los Olivos</p>
				<p>Servicio: Mudanza</p>
			</div>
		</div>
	);
};
export default TripCard;
