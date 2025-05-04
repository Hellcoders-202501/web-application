import AuthFooter from "@components/molecules/AuthFooter";
import AuthNavbar from "@components/molecules/AuthNavbar";
import type React from "react";
import type { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen w-full">
			<AuthNavbar />
			<div className="flex-1">{children}</div>
			<AuthFooter />
		</div>
	);
};
