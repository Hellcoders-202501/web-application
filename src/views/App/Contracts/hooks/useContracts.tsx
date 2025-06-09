import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { useEffect } from "react";
import {
  getHistoryTripsByClientId,
  getHistoryTripsByDriverId,
  getPendingTripsByClientId,
  getPendingTripsByDriverId,
} from "@redux/contract/contractThunk";
import { getTripStatus } from "@redux/common/commonThunk";

const useContracts = () => {
  const dispatch = useAppDispatch();
  const tripStatus = useAppSelector(
    (state: IRootState) => state.common.tripStatus,
  );
  const { pendingTripsList, historyTripsList } = useAppSelector(
    (state: IRootState) => state.contract,
  );

  const { userType, currentUser } = useAuth();

  const getTrips = () => {
    if (userType === "DRIVER") {
      dispatch(getPendingTripsByDriverId(currentUser?.id as number));
      dispatch(getHistoryTripsByDriverId(currentUser?.id as number));
    }
    if (userType === "CLIENT") {
      dispatch(getPendingTripsByClientId(currentUser?.id as number));
      dispatch(getHistoryTripsByClientId(currentUser?.id as number));
    }
  };

  useEffect(() => {
    getTrips();
    // console.log(userType);
  }, []);
  // }, [pendingTripsList, historyTripsList]);

  useEffect(() => {
    if (tripStatus.length === 0) dispatch(getTripStatus());
  }, []);

  return {
    pendingTripsList,
    historyTripsList,
  };
};
export default useContracts;
