import Image from "next/image";
import Logo from "@assets/logo.webp";

const Title = ({ title }: { title: string }) => {
	return (
		<div>
			<Image
				src={Logo}
				alt="Logo"
				width={85}
				height={62}
				className="border border-[#CECECE] rounded-xl px-2 py-2 mx-auto mb-5"
			/>
			<p className="text-3xl font-light">{title}</p>
		</div>
	);
};

export default Title;
