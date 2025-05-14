import { FaRegUserCircle, FaStar } from "react-icons/fa";

const RatingCard = () => {
	return (
		<div className="flex gap-5 items-center max-w-xl w-full">
			<FaRegUserCircle size={120} />
			<div className="max-w-xl">
				<p className="font-semibold text-lg">Oscar Canellas</p>
				<p className="text-sm">Este servicio fue muy bueno, lo recomiendo!</p>
			</div>
			<div>
				<span>5</span>
				<FaStar size={20} />
			</div>
		</div>
	);
};

const Ratings = () => {
	return (
		<div className="flex flex-col gap-5 items-center overflow-scroll max-h-[500px] px-10 w-full">
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<RatingCard key={i} />
				))}
		</div>
	);
};

export default Ratings;
