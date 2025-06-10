import { type IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { useEffect, useState } from "react";
import {
  deleteTripById,
	getHistoryTripsByClientId,
	getHistoryTripsByDriverId,
	getTripsByClientId,
	getTripsByDriverId,
  startTripById,
} from "@redux/contract/contractThunk";
import { getTripStatus } from "@redux/common/commonThunk";
import type { TripResult } from "@models/contract";

const useContracts = () => {
	const dispatch = useAppDispatch();
	const tripStatus = useAppSelector(
		(state: IRootState) => state.common.tripStatus,
	);
	const { tripsList, historyTripsList } = useAppSelector(
		(state: IRootState) => state.contract,
	);
	const [pendingTripsList, setPendingTripsList] = useState<TripResult[]>([]);

	const { userType, currentUser } = useAuth();

	const getTrips = () => {
		if (userType === "DRIVER") {
			dispatch(getTripsByDriverId(currentUser?.id as number));
			dispatch(getHistoryTripsByDriverId(currentUser?.id as number));
		}
		if (userType === "CLIENT") {
			dispatch(getTripsByClientId(currentUser?.id as number));
			dispatch(getHistoryTripsByClientId(currentUser?.id as number));
		}
	};

	useEffect(() => {
		getTrips();
	}, []);

	useEffect(() => {
		if (tripsList.length && historyTripsList.length) {
			const pendingTrips = tripsList.filter(
				(trip) => !historyTripsList.some((h) => h.id === trip.id),
			);
			setPendingTripsList(pendingTrips);
		} else {
			setPendingTripsList(tripsList);
		}
	}, [tripsList, historyTripsList]);

	useEffect(() => {
		if (tripStatus.length === 0) dispatch(getTripStatus());
	}, []);

  const startContract = (id: number) => {
    dispatch(startTripById(id));
  }

  const deleteContract = (id: number) => {
    dispatch(deleteTripById(id));
  };

	return {
		pendingTripsList,
		historyTripsList,
    startContract,
    deleteContract,
	};
};
export default useContracts;
