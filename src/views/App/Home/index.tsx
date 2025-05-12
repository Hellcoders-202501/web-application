import { FaRegUserCircle } from "react-icons/fa";
import UserCard from "@components/organisms/UserCard";
import TripCard from "@components/molecules/TripCard";
import Link from "next/link";

const HomeView = () => {
	return (
		<div className="flex flex-col justify-center max-w-5xl mx-auto w-10/12 lg:w-auto">
			{/* TOP */}
			<div className="flex flex-col lg:flex-row justify-between mt-20">
				<div className="flex gap-4 items-center">
					<FaRegUserCircle size={120} className="hidden lg:block" />
					<FaRegUserCircle size={100} className="lg:hidden" />
					<p className="text-2xl lg:text-4xl font-bold">
						Hi, <br className="hidden lg:block" /> Mario
					</p>
				</div>
				<Link
					href="/"
					className="mt-5 lg:mt-0 lg:self-end text-xl text-[#0F15A3] font-semibold underline"
				>
					View History
				</Link>
			</div>
			{/* CENTER */}
			<div className="flex flex-col lg:flex-row justify-between mt-10 mb-20 gap-10 lg:gap-0">
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
