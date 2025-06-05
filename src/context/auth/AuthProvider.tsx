/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { FC, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useAppDispatch } from "@core/store";
import useAuth from "@hooks/useAuth";
import { getCurrentUserById, setUserType, signin } from "@redux/user/userThunk";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { LoginState } from "@models/user";
import { removeLocalToken } from "@util/storageUtil";

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
    /* Get current user and validate session if token exists */
    if (token) {
      const userType = jwtDecode(token)?.role;
      const userId = jwtDecode(token)?.id;
      if (userType === "ROLE_CLIENT") {
        dispatch(setUserType("CLIENT"));
        dispatch(getCurrentUserById({ id: userId, type: "CLIENT" }));
      }
      if (userType === "ROLE_DRIVER") {
        dispatch(setUserType("DRIVER"));
        dispatch(getCurrentUserById({ id: userId, type: "DRIVER" }));
      }
      // getUserNotifications();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogIn = (loginForm: LoginState) => {
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

  /* const contextValidator = () => {
    if (token) {
      return currentUser !== undefined;
    } else {
      return !othersLoading.getProducts;
    }
  }; */

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
      {/* {contextValidator() && isClient ? ( */}
      <>{children}</>
      {/* ) : (
        <>
          <div className="h-screen flex justify-center items-center">
            <LoadingComponent />
          </div>
        </>
      )} */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
