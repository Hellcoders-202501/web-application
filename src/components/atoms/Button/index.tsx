import type { FC } from "react";

type ButtonVariant = "primary" | "accept" | "denied";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	children: React.ReactNode;
	className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-main text-white",
	accept: "bg-accept text-white",
	denied: "bg-denied text-white",
};

const Button: FC<Props> = ({
	children,
	variant = "primary",
	className = "",
	...props
}) => {
	return (
		<button
			className={`px-4 py-2 rounded-4xl cursor-pointer ${variantClasses[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;