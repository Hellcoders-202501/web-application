import { requests } from "@core/axiosAgent";

const getNotificationsByUserId = (id: number) => {
  return requests.get(`/notifications/${id}/users`);
};

const readNotifications = (id: number) => {
  return requests.postWithoutBody(`/notifications/${id}/read`);
};

export default {
  getNotificationsByUserId,
  readNotifications,
};
