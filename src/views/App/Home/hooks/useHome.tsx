import { type IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { RequestResult } from "@models/contract";
import {
  getHistoryTripsByClientId,
  getHistoryTripsByDriverId,
} from "@redux/contract/contractThunk";
import { useEffect, useState } from "react";

const useHome = () => {
  const dispatch = useAppDispatch();
  const { userType, currentUser } = useAuth();

  const rankedDrivers = useAppSelector(
    (state: IRootState) => state.user.rankedDrivers
  );
  const historyTripList = useAppSelector(
    (state: IRootState) => state.contract.historyTripsList
  );
  const tripStatus = useAppSelector(
    (state: IRootState) => state.common.tripStatus
  );

  const [recentHistoryTrips, setRecentHistoryTrips] = useState<RequestResult[]>(
    []
  );

  useEffect(() => {
    if (tripStatus.length) {
      if (userType === "DRIVER")
        dispatch(getHistoryTripsByDriverId(currentUser.id));
      else dispatch(getHistoryTripsByClientId(currentUser.id));
    }
  }, [dispatch, currentUser, userType, tripStatus]);

  useEffect(() => {
    if (historyTripList) {
      const sortedHistoryTrips = [...historyTripList].sort(
        (a, b) => b.id - a.id
      );
      setRecentHistoryTrips(sortedHistoryTrips.slice(0, 3));
    }
  }, [historyTripList]);

  return {
    rankedDrivers,
    historyTripList: recentHistoryTrips,
    userType,
  };
};

export default useHome;
