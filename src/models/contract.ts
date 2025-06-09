export interface IContractReduxState {
  requestResultList: TripResult[];
  requestResult: TripResult | null;
  pendingTripsList: TripResult[];
  historyTripsList: TripResult[];
  loading: boolean;
}

export interface RequestContract extends Trip {
  typeService: number;
  capacity: number;
}

export interface TripResult extends Trip {
  id: number;
}

export interface Trip {
  origin: string;
  destination: string;
  startTime: string;
  endTime: string;
  amount: number;
  date: string;
  subject: string;
  description: string;
}

export interface Application {
  message: "string";
  proposedAmount: 0;
  requestId: 0;
  driverId: 0;
}
