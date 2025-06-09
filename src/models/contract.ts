export interface IContractReduxState {
  loading: boolean;
}

export interface RequestContract extends Trip {
	typeService: number;
	capacity: number;
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
