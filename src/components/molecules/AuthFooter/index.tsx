import SocialIcons from "../SocialIcons";

const AuthFooter = () => {
	return (
		<footer className="flex flex-col justify-center items-center bg-main py-6">
			<p className="text-white font-bold text-lg">About FastPorte</p>
			<SocialIcons />
			<p className="text-white text-sm">© FastPorte, 2025.</p>
		</footer>
	);
};

export default AuthFooter;
