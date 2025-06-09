export interface ICommonReduxState {
  serviceTypes: Array<ServiceType>;
  tripStatus: Array<TripStatus>;
  loading: boolean;
}

export interface ServiceType {
  id: number,
  name: string,
}

export interface TripStatus {
  id: number,
  status: string,
}
