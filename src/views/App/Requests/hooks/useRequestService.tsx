import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import type { RequestContract } from "@models/contract";
import { getServiceTypes } from "@redux/common/commonThunk";
import { useEffect, useState } from "react";

const useRequestService = () => {
	const dispatch = useAppDispatch();
	const serviceTypes = useAppSelector(
		(state: IRootState) => state.common.serviceTypes
	)

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
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setRequestState((prevState) => (
			{
				...prevState,
				[name]: value,
			}
		));
	};

	useEffect(() => {
		if (serviceTypes.length === 0)
			dispatch(getServiceTypes());
	}, []);

	return {
		requestState,
		handleChange,
		serviceTypes,
	};
};

export default useRequestService;
