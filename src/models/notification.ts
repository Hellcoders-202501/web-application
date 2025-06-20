export interface INotificationReduxState {
  notifications: INotification[];
  loading: boolean;
}

export interface INotification {
  id: number;
  timestamp: string;
  type: string;
  seen: boolean;
  userId: number;
  referenceId: number;
}
