export interface RequestContract {
	from: string;
	to: string;
	typeService: string;
	departureHour: string;
	arrivalHour: string;
	capacity: number;
	amount: number;
	description: string;
}
