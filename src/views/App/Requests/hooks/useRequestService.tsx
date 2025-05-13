import type { RequestContract } from "@models/contract";
import { useState } from "react";

const useRequestService = () => {
	const [requestState, setRequestState] = useState<RequestContract>({
		from: "",
		to: "",
		typeService: "",
		arrivalHour: "",
		departureHour: "",
		capacity: 0,
		amount: 0,
		description: "",
	});

	return {
		requestState,
	};
};

export default useRequestService;
