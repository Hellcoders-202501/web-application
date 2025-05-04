import AppFooter from "@components/molecules/AppFooter";
import AppNavbar from "@components/organisms/AppNavbar";
import type React from "react";
import type { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen w-full">
			<AppNavbar />
			<div className="flex-1">{children}</div>
			<AppFooter />
		</div>
	);
};
