import type React from "react";
import type { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({
	children,
}: { children: React.ReactNode }) => {
	return <>{children}</>;
};
