/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loading from "@components/atoms/Loading";
import { useAppDispatch } from "@core/store";
import useAuth from "@hooks/useAuth";
import type { LoginState } from "@models/user";
import {
  getBankAccountTypes,
  getServiceTypes,
  getTripStatus,
} from "@redux/common/commonThunk";
import {
  getCurrentUserById,
  getMostRankedDrivers,
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

  // Utilidad segura
  const safeDecodeToken = (token: string): CustomJwtPayload | null => {
    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    setisClient(true);

    const sessionToken = token || getLocalToken();
    if (!sessionToken) {
      router.replace("/login");
      return;
    }

    // Evita re-dispatch innecesario
    if (!token) dispatch(setToken(sessionToken));

    const decoded = safeDecodeToken(sessionToken);
    if (!decoded) {
      console.error("Invalid token format");
      router.replace("/login");
      return;
    }

    const { role, id } = decoded;
    const isClient = role === "ROLE_CLIENT";
    const isDriver = role === "ROLE_DRIVER";

    if (isClient || isDriver) {
      dispatch(setUserType(isClient ? "CLIENT" : "DRIVER"));
      dispatch(
        getCurrentUserById({ id, type: isClient ? "CLIENT" : "DRIVER" })
      );
      dispatch(getServiceTypes());
      dispatch(getTripStatus());
      dispatch(getBankAccountTypes());
      dispatch(getMostRankedDrivers());
    }
  }, [token]);

  const handleLogIn = (loginForm?: LoginState) => {
    if (!loginForm) return;

    dispatch(
      signin({
        ...loginForm,
      })
    );
  };

  const publicRoutes = ["/login", "/signup", "/forgot-password"];
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const sessionToken = token || getLocalToken();

    if (sessionToken && isPublicRoute) {
      router.replace("/");
    }
  }, [pathname]);

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
