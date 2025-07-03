export interface IContractReduxState {
  requestResultList: RequestResult[];
  requestResult: RequestResult | null;
  tripsList: RequestResult[];
  trip: RequestResult | null;
  pendingTripsList: RequestResult[];
  historyTripsList: RequestResult[];
  applicationList: ApplicationResult | null;
  loading: boolean;
}

export interface RequestContract extends Trip {
  typeService: number;
  capacity: number;
}

export interface TripResult extends Trip {
  id: number;
  status: string;
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
  trip: TripResult;
  contract: {
    driver: {
      id: number;
      name: string;
      firstLastName: string;
      imageUrl: string;
      phone: string;
      rating: number;
    };
    payment: {
      id: number;
      amount: number;
      status: string;
    };
  };
}

export interface ApplicationResult {
  applications: ApplicationInformation[];
  trip: Trip;
}

export interface ApplicationInformation {
  id: number;
  message: string;
  proposedAmount: number;
  driver: {
    id: number;
    name: string;
    firstLastName: string;
    imageUrl: string;
    phone: string;
    rating: number;
  };
}
