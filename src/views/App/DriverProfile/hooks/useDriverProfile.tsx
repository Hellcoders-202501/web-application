"use client";
import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import {
  getDriverById,
  getExperiencesByDriverId,
  getVehiclesByDriverId,
} from "@redux/user/userThunk";
import { useEffect } from "react";

const useDriverProfile = ({ driverId }: { driverId: number }) => {
  const dispatch = useAppDispatch();

  const { driver, experiences, vehicles, loading } = useAppSelector(
    (state: IRootState) => state.user
  );
  const serviceTypes = useAppSelector(
    (state: IRootState) => state.common.serviceTypes
  );

  useEffect(() => {
    if (driverId) {
      dispatch(getDriverById(driverId));
      dispatch(getExperiencesByDriverId(driverId));
      dispatch(getVehiclesByDriverId(driverId));
    }
  }, [driverId]);

  return {
    driver,
    experiences,
    vehicles,
    loading,
    serviceTypes,
  };
};

export default useDriverProfile;
