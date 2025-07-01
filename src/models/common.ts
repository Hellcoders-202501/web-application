export interface ICommonReduxState {
  serviceTypes: Array<ServiceType>;
  tripStatus: Array<TripStatus>;
  bankAccountTypes: Array<BankAccountType>;
  alertDialog: AlertDialog;
  loading: boolean;
}

export interface AlertDialog {
  open: boolean;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface TripStatus {
  id: number;
  status: string;
}

export interface BankAccountType {
  id: number;
  type: string;
}
