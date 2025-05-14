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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setRequestState((prevState) => (
			{
				...prevState,
				[name]: value,
			}
		));
	};

	return {
		requestState,
		handleChange,
	};
};

export default useRequestService;
