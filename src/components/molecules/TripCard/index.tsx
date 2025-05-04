import { FaRegUserCircle } from "react-icons/fa";

const TripCard = () => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaRegUserCircle size={120} />
			<div>
				<p>Name: Oscar Canellas</p>
				<p>Phone Number: 983288372</p>
				<p className="mt-4">From: Comas</p>
				<p>To: Los Olivos</p>
				<p>Service: Moving</p>
			</div>
		</div>
	);
};
export default TripCard;
