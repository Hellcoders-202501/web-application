export interface IContractReduxState {
  loading: boolean;
}

export interface RequestContract {
	origin: string;
	destination: string;
	typeService: string;
	startTime: string;
	endTime: string;
	capacity: number;
	amount: number;
	subject: string;
	description: string;
}
