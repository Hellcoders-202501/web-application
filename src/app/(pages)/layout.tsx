"use client";
import { AppLayout } from "../layout/AppLayout";

export default function ApplicationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppLayout>{children}</AppLayout>;
}
