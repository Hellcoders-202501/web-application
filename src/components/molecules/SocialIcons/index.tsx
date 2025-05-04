import Link from "next/link";
import type { FC } from "react";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const socials = [
	{
		url: "https://x.com",
		icon: <FaTwitter />,
	},
	{
		url: "https://instagram.com",
		icon: <FaFacebook />,
	},
	{
		url: "https://facebook.com",
		icon: <FaInstagram />,
	},
	{
		url: "https://linkedin.com",
		icon: <FaLinkedin />,
	},
];

interface Props {
	children: React.ReactNode;
	url: string;
}

const SocialIcon: FC<Props> = ({ children, url }) => {
	return (
		<Link className="bg-[#D9D9D9] text-black rounded-full p-3" href={url}>
			{children}
		</Link>
	);
};

const SocialIcons = () => {
	return (
		<div className="flex gap-2 my-2">
			{socials.map((social, index) => {
				return (
					<SocialIcon key={index} url={social.url}>
						{social.icon}
					</SocialIcon>
				);
			})}
		</div>
	);
};

export default SocialIcons;
