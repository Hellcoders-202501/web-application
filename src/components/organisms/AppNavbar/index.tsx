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
		url: "/",
		label: "Search",
	},
	{
		url: "/",
		label: "Contracts",
	},
	{
		url: "/",
		label: "Support",
	},
];

const AppNavbar = () => {
	return (
		<nav className="bg-main py-4 px-5">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Image src={Logo} alt="Logo" width={57} height={57} />
					<p className="text-white font-bold text-xl">FastPorte</p>
				</div>
				{/* Menu */}
				<UserMenu />
			</div>
			<div className="flex justify-between items-center pt-4">
				<div>
					{urls.map((url, index) => {
						return (
							<Link
								className="mx-4 text-white text-lg"
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
