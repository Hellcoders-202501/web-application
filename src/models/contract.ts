export interface IContractReduxState {
  requestResultList: RequestResult[];
  // requestResult: RequestResult | null;
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
  message: string;
  proposedAmount: number;
  requestId: number;
  driverId: number;
}

export interface RequestResult {
  id: number;
  client: {
    id: number;
    name: string;
    firstLastName: string;
    imageUrl: string;
    phone: string;
  };
  service: {
    id: number;
    name: string;
  };
  status: string;
  trip: Trip;
  contract: {};
}
