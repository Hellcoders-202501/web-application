import type { FC } from "react";

type InputVariant = "primary" | "disabled";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: InputVariant;
	className?: string;
}

const variantClasses: Record<InputVariant, string> = {
	primary: "focus:outline-none focus:ring-0 focus:bg-transparent focus:shadow-none border-b placeholder:text-black/50",
	disabled: "bg-transparent placeholder:text-black/50",
};

const TextArea: FC<Props> = ({
	variant = "primary",
	className = "",
	...props
}) => {
	return (
		<textarea
			className={`px-4 py-2 ${variantClasses[variant]} ${className}`}
			{...props}
		/>
	);
};

export default TextArea;