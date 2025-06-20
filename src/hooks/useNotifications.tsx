import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import {
  getNotificationsByUserId,
  readNotifications,
} from "@redux/notification/notificationThunk";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useNotification = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector(
    (state: IRootState) => state.notification,
  );
  const { currentUser } = useAuth();

  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);

  useEffect(() => {
    if (currentUser.userId)
      dispatch(getNotificationsByUserId(currentUser.userId));
  }, [dispatch, currentUser.userId]);

  const handleReadNotifications = () => {
    dispatch(readNotifications(currentUser.userId));
  };

  const handleTotalUnreadNotifications = () => {
    setTotalUnreadNotifications(
      notifications.filter((notification) => !notification.seen).length,
    );
  };

  useEffect(() => {
    if (notifications.length > 0) {
      handleTotalUnreadNotifications();
    }
  }, [notifications]);

  return {
    notifications,
    loading,
    totalUnreadNotifications,
    handleReadNotifications,
  };
};

export default useNotification;
