import SocialIcons from "../SocialIcons";

const AuthFooter = () => {
	return (
		<footer className="flex flex-col md:flex-row justify-between items-center bg-main py-6 px-10">
			<div className="flex flex-col md:flex-row md:gap-20 items-center">
				<p className="text-white font-bold text-lg">About FastPorte</p>
				<SocialIcons />
			</div>
			<p className="text-white text-sm">© FastPorte, 2025.</p>
		</footer>
	);
};

export default AuthFooter;
