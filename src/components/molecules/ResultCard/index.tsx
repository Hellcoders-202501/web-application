import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaCar } from "react-icons/fa";

const ResultCard = () => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaCar size={120} />
			<div>
				<p className="text-2xl font-semibold">Transportation</p>
				<p>Client: Oscar Canellas</p>
				<p>From: Comas</p>
				<p>To: Los Olivos</p>
				<p>Amount: S/. 50</p>
			</div>
			<Link href="/" className="cursor-pointer">
				<FaChevronRight color="#0f15a3" size={48} />
			</Link>
		</div>
	);
};
export default ResultCard;
