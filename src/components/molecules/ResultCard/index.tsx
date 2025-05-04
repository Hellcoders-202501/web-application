import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const ResultCard = () => {
	return (
		<div className="card flex gap-5 items-center px-10 py-8 min-h-[200px]">
			<FaRegUserCircle size={120} />
			<div>
				<p className="text-2xl font-semibold">Oscar Canellas</p>
				<p>Phone Number: 983288372</p>
				<p>Rating: 5</p>
			</div>
			<Link href="/" className="cursor-pointer">
				<FaChevronRight color="#0f15a3" size={48} />
			</Link>
		</div>
	);
};
export default ResultCard;
