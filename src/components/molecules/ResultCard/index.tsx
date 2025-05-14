import { FaChevronRight } from "react-icons/fa";
import { FaCar } from "react-icons/fa";

const ResultCard = ({
	handleRedirect,
}: {
	handleRedirect: VoidFunction;
}) => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaCar size={120} />
			<div>
				<p className="text-2xl font-semibold">Transporte</p>
				<p>Cliente: Oscar Canellas</p>
				<p>Desde: Comas</p>
				<p>Hasta: Los Olivos</p>
				<p>Pago: S/. 50</p>
			</div>
			<button type="button" onClick={handleRedirect}>
				<FaChevronRight color="#0f15a3" size={48} />
			</button>
		</div>
	);
};
export default ResultCard;
