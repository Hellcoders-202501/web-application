import type { FC } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode;
	className?: string;
}

const Select: FC<Props> = ({ children, className = "", ...props }) => {
	return (
		<select
			className={`border rounded-2xl mx-2 py-4 px-8 ${className}`}
			{...props}
		>
			<option value="default">Choose an option</option>
			{children}
		</select>
	);
};

export default Select;
