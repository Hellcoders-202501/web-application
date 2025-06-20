import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { getNotificationsByUserId } from "@redux/notification/notificationThunk";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useNotification = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector(
    (state: IRootState) => state.notification,
  );
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser.userId)
      dispatch(getNotificationsByUserId(currentUser.userId));
  }, [dispatch, currentUser.userId]);

  return { notifications, loading };
};

export default useNotification;
