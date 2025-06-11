/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loading from "@components/atoms/Loading";
import { useAppDispatch } from "@core/store";
import useAuth from "@hooks/useAuth";
import type { LoginState } from "@models/user";
import { getServiceTypes, getTripStatus } from "@redux/common/commonThunk";
import {
	getCurrentUserById,
	setToken,
	setUserType,
	signin,
} from "@redux/user/userThunk";
import { getLocalToken, removeLocalToken } from "@util/storageUtil";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { type FC, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface CustomJwtPayload {
	role: string;
	id: number;
}

/**
 * If user is logged in, call the requeried user information and settings;
 * Handle login, external authentication, register and logout methods
 * @param  {React.ReactNode} children
 * @returns {React.ReactNode} children
 */
const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { currentUser, token } = useAuth();

	const [isClient, setisClient] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setisClient(true);

		const sessionToken = token || getLocalToken();
		if (!sessionToken) {
			router.replace("/login");
			return;
		}

		dispatch(setToken(sessionToken)); // solo si no está ya seteado

		const saveParameters = () => {
			// if (!localStorage.getItem("serviceTypes"))
			dispatch(getServiceTypes());
			// if (!localStorage.getItem("tripStatus"))
			dispatch(getTripStatus());
		};

		try {
			const decoded = jwtDecode<CustomJwtPayload>(sessionToken);
			const userType = decoded?.role;
			const userId = decoded?.id;

			if (userType === "ROLE_CLIENT") {
				dispatch(setUserType("CLIENT"));
				dispatch(getCurrentUserById({ id: userId, type: "CLIENT" }));
        saveParameters();
			} else if (userType === "ROLE_DRIVER") {
				dispatch(setUserType("DRIVER"));
				dispatch(getCurrentUserById({ id: userId, type: "DRIVER" }));
        saveParameters();
			}
		} catch (err) {
			console.error("Invalid token format", err);
		}
	}, [token]);

	const handleLogIn = (loginForm?: LoginState) => {
		if (!loginForm) return;

		dispatch(
			signin({
				...loginForm,
			}),
		).then((e) => {
			if (e.meta.requestStatus === "fulfilled") {
				router.replace("/");
			}
		});
	};

	const publicRoutes = ["/login", "/signup", "/forgot-password"];
	const pathname = usePathname();
	const isPublicRoute = publicRoutes.includes(pathname);

	const contextValidator = () => {
		if (token) {
			return currentUser !== undefined;
		}
	};

	const handleLogOut = () => {
		removeLocalToken();

		window.location.replace("/login");
	};

	/* const getUserNotifications = () => {
    dispatch(getUserNotificationsAction());
  }; */

	return (
		<AuthContext.Provider
			value={{
				user: currentUser,
				isLoggedIn: false,
				handleLogIn,
				handleLogOut,
			}}
		>
			{(contextValidator() || isPublicRoute) && isClient ? (
				<>{children}</>
			) : (
				<div className="h-screen flex justify-center items-center">
					<Loading />
				</div>
			)}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
