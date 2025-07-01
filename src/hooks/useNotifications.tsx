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
    (state: IRootState) => state.notification
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
      notifications.filter((notification) => !notification.seen).length
    );
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  useEffect(() => {
    if (notifications.length > 0) {
      handleTotalUnreadNotifications();
    }
  }, [notifications]);

  return {
    notifications,
    sortedNotifications,
    loading,
    totalUnreadNotifications,
    handleReadNotifications,
  };
};

export default useNotification;
