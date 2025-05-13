"use client";
import useRequestService from "./hooks/useRequestService";
import RequestForm from "@components/organisms/RequestForm";

const RequestView = () => {
	const { requestState } = useRequestService();

	return (
		<div
			className="flex flex-col items-center max-w-5xl mx-auto w-10/12 lg:w-auto 
			my-10 lg:my-20"
		>
			<p className="self-start mb-5 text-4xl font-semibold">Request service</p>
			<RequestForm requestState={requestState} />
		</div>
	);
};
export default RequestView;
