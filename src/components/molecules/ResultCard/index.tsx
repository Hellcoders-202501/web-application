import type { RequestResult } from "@models/contract";
import { FaChevronRight } from "react-icons/fa";
import { FaCar } from "react-icons/fa";

const ResultCard = ({
	handleRedirect,
	request,
}: {
	handleRedirect: VoidFunction;
	request: RequestResult;
}) => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaCar size={120} />
			<div>
				<p className="text-2xl font-semibold">{request.service.name}</p>
				<p>
					Cliente: {request.client.name} {request.client.firstLastName}
				</p>
				<p>Desde: {request.trip.origin}</p>
				<p>Hasta: {request.trip.destination}</p>
				<p>Pago: S/. {request.trip.amount}</p>
			</div>
			<button type="button" onClick={handleRedirect} className="cursor-pointer">
				<FaChevronRight color="#0f15a3" size={48} />
			</button>
		</div>
	);
};
export default ResultCard;
