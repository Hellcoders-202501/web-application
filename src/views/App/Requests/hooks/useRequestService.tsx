import { useState } from "react";

const useRequestService = () => {
	const [requestState, setRequestState] = useState({});

	return {
		requestState,
	};
};

export default useRequestService;
