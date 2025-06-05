"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import store from "@core/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import AuthProvider from "@context/auth/AuthProvider";

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
        <PayPalScriptProvider options={{ clientId: "test" }}>
          <AuthProvider>
            <body className={`${inter.className} antialiased`}>{children}</body>
          </AuthProvider>
        </PayPalScriptProvider>
      </Provider>
    </html>
  );
}
