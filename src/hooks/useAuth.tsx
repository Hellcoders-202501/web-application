/* eslint-disable react-hooks/exhaustive-deps */
import { IRootState, useAppSelector } from "@core/store";
import { User } from "@models/user";

const useAuth = () => {
  const currentUser: User = useAppSelector(
    (state: IRootState) => state.user.user,
  )!;
  const token: string = useAppSelector(
    (state: IRootState) => state.user.token,
  )!;
  const userType: string = useAppSelector(
    (state: IRootState) => state.user.userType,
  )!;

  const isLoggedIn = !!currentUser;

  return {
    isLoggedIn,
    currentUser,
    token,
    userType,
  };
};

export default useAuth;
