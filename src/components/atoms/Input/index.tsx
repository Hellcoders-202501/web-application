import type { FC } from "react";

type InputVariant = "primary";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: InputVariant;
	className?: string;
}

const variantClasses: Record<InputVariant, string> = {
	primary: "focus:ring-0 focus:outline-none focus:ring-0 focus:bg-transparent focus:shadow-none border-b placeholder:text-black/50",
};

const Button: FC<Props> = ({
	variant = "primary",
	className = "",
	...props
}) => {
	return (
		<input
			className={`px-4 py-2 ${variantClasses[variant]} ${className}`}
			{...props}
		/>
	);
};

export default Button;