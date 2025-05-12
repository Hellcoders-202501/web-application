import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo.webp";
import Notifications from "@components/molecules/Notifications";
import UserMenu from "@components/molecules/UserMenu";

const urls = [
	{
		url: "/",
		label: "Home",
	},
	{
		url: "/",
		label: "Profile",
	},
	{
		url: "/search",
		label: "Search",
	},
	{
		url: "/contracts",
		label: "Contracts",
	},
	{
		url: "/support",
		label: "Support",
	},
];

const AppNavbar = () => {
	return (
		<nav className="bg-main py-4 px-5">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Image
						src={Logo}
						alt="Logo"
						width={57}
						height={57}
						className="hidden md:block"
					/>
					<Image
						src={Logo}
						alt="Logo"
						width={32}
						height={32}
						className="md:hidden"
					/>
					<p className="text-white font-bold text-lg md:text-xl">FastPorte</p>
				</div>
				{/* Menu */}
				<UserMenu />
			</div>
			<div className="flex justify-between items-center pt-4">
				<div>
					{urls.map((url, index) => {
						return (
							<Link
								className="md:mx-4 mx-1 text-white text-xs md:text-lg"
								key={index}
								href={url.url}
							>
								{url.label}
							</Link>
						);
					})}
				</div>
				{/* Notifications */}
				<Notifications />
			</div>
		</nav>
	);
};

export default AppNavbar;
