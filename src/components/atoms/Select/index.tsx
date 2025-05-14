import type { FC } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode;
	className?: string;
	defaultOption?: boolean;
}

const Select: FC<Props> = ({ children, className = "", ...props }) => {
	return (
		<select
			className={`border rounded-2xl mx-2 py-4 px-8 ${className}`}
			{...props}
		>
			{props.defaultOption && <option value="default">Elige una opción</option>}
			{children}
		</select>
	);
};

export default Select;
