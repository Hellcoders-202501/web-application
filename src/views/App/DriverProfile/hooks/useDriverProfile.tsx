"use client";
import { type IRootState, useAppDispatch, useAppSelector } from "@core/store";
import {
  getCommentsByDriverId,
  getDriverById,
  getExperiencesByDriverId,
  getVehiclesByDriverId,
} from "@redux/user/userThunk";
import { useEffect } from "react";

const useDriverProfile = ({ driverId }: { driverId: number }) => {
  const dispatch = useAppDispatch();

  const { driver, experiences, vehicles, comments, loading } = useAppSelector(
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
      dispatch(getCommentsByDriverId(driverId));
    }
  }, [driverId]);

  return {
    driver,
    experiences,
    vehicles,
    comments,
    loading,
    serviceTypes,
  };
};

export default useDriverProfile;
