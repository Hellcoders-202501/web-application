import { type IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import type { RequestResult } from "@models/contract";
import { getTripStatus } from "@redux/common/commonThunk";
import {
  cancelContractByRequestId,
  finishTripByClient,
  finishTripByDriver,
  getHistoryTripsByClientId,
  getHistoryTripsByDriverId,
  getTripsByClientId,
  getTripsByDriverId,
  startTripById
} from "@redux/contract/contractThunk";
import { useEffect, useState } from "react";

const useContracts = () => {
  const dispatch = useAppDispatch();
  const tripStatus = useAppSelector(
    (state: IRootState) => state.common.tripStatus
  );
  const { tripsList, historyTripsList, loading } = useAppSelector(
    (state: IRootState) => state.contract
  );
  const [pendingTripsList, setPendingTripsList] = useState<RequestResult[]>([]);

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
    if (tripStatus.length === 0) dispatch(getTripStatus());
  }, [tripStatus]);

  useEffect(() => {
    if (tripStatus.length === 0) return;
    getTrips();
  }, [tripStatus]);

  useEffect(() => {
    if (tripStatus.length === 0 || loading) return;
    if (!tripsList || !historyTripsList) return;

    const pendingTrips = tripsList.filter(
      (trip) =>
        !historyTripsList.some((h) => h.id === trip.id) &&
        trip.status !== "PUBLISHED"
    );
    setPendingTripsList(pendingTrips);
  }, [tripsList, historyTripsList, tripStatus, loading]);

  const startContract = (id: number) => {
    dispatch(startTripById(id));
  };

  const deleteContract = (id: number) => {
    dispatch(cancelContractByRequestId(id));
  };

  const completeContract = (id: number) => {
    dispatch(finishTripByDriver(id));
  };

  const finishContract = (id: number) => {
    dispatch(finishTripByClient(id));
  };

  return {
    pendingTripsList,
    historyTripsList,
    startContract,
    deleteContract,
    completeContract,
    finishContract,
  };
};
export default useContracts;
