"use client";
import { AuthLayout } from "../layout/AuthLayout";

export default function AuthenticationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthLayout>{children}</AuthLayout>;
}
