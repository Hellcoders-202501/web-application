import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo.webp";

const urls = [
	{
		url: "/login",
		label: "Inicio",
	},
	// {
	// 	url: "/login",
	// 	label: "Nosotros",
	// },
	{
		url: "/login",
		label: "Contáctanos",
	},
];

const AuthNavbar = () => {
	return (
		<nav className="flex justify-between items-center bg-main py-4 px-5">
			<div className="flex items-center gap-2">
				<Image src={Logo} alt="Logo" width={57} height={57} />
				<p className="text-white font-bold text-xl">FastPorte</p>
			</div>
			<div>
				{urls.map((url, index) => {
					return (
						<Link
							className="md:mx-4 mx-1 text-white mdtext-lg text-sm"
							key={index}
							href={url.url}
						>
							{url.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default AuthNavbar;
