import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { getRequestById } from "@redux/contract/contractThunk";
import { useEffect } from "react";

const useTripDetails = (tripId: number) => {
  const dispatch = useAppDispatch();
  const { userType } = useAuth();

  const requestResult = useAppSelector(
    (state: IRootState) => state.contract.requestResult
  );

  useEffect(() => {
    if (tripId) dispatch(getRequestById(tripId));
  }, [tripId]);

  const definePaymentStatus = (paymentStatus: string) => {
    if (paymentStatus === "APPROVED") return "Aprobado";
    if (paymentStatus === "PENDING_APPROVAL") return "Aprobación pendiente";
    return "";
  };

  const defineTripStatus = (tripStatus: string) => {
    if (tripStatus === "COMPLETED") return "Completado";
    if (
      tripStatus === "FINISHED_BY_CLIENT" ||
      tripStatus === "FINISHED_BY_DRIVER"
    )
      return "Finalizado";
    if (tripStatus === "PENDING") return "Pendiente";
    if (tripStatus === "STARTED") return "Empezado";
    return "";
  };

  return {
    requestResult,
    userType,
    definePaymentStatus,
    defineTripStatus,
  };
};

export default useTripDetails;
