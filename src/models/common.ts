export interface ICommonReduxState {
  serviceTypes: Array<ServiceType>;
  loading: boolean;
}

export interface ServiceType {
  id: number,
  name: string,
}