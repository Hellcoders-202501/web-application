import { FaRegUserCircle } from "react-icons/fa";
import UserCard from "@components/molecules/UserCard";
import TripCard from "@components/molecules/TripCard";
import Link from "next/link";

const HomeView = () => {
	return (
		<div className="flex flex-col justify-center max-w-5xl mx-auto">
			{/* TOP */}
			<div className="flex justify-between mt-20">
				<div className="flex gap-4 items-center">
					<FaRegUserCircle size={120} />
					<p className="text-4xl font-bold">
						Hi, <br /> Mario
					</p>
				</div>
				<Link href="/" className="self-end text-xl text-[#0F15A3] font-semibold underline">
					View History
				</Link>
			</div>
			{/* CENTER */}
			<div className="flex justify-between mt-10 mb-20">
				{/* Popular */}
				<div className="flex flex-col gap-10">
					<p className="text-3xl font-semibold border-l-2 pl-4">Popular</p>
					<UserCard />
					<UserCard />
				</div>
				{/* Recent */}
				<div className="flex flex-col gap-10">
					<p className="text-3xl font-semibold border-l-2 pl-4">Recents</p>
					<TripCard />
					<TripCard />
				</div>
			</div>
		</div>
	);
};

export default HomeView;
