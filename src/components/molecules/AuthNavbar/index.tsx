import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/logo.webp"

const urls = [
	{
		url: "/",
		label: "Inicio",
	},
	{
		url: "/",
		label: "Nosotros",
	},
	{
		url: "/",
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
							className="mx-4 text-white text-lg"
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
