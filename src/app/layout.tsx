"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@core/store";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Provider store={store}>
				<body className={`${inter.className} antialiased`}>{children}</body>
			</Provider>
		</html>
	);
}
