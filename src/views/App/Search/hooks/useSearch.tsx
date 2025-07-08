import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { RequestResult } from "@models/contract";
import {
  createApplication,
  getRequestById,
  getRequestsByServiceId,
} from "@redux/contract/contractThunk";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const useSearch = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const router = useRouter();

  const handleRemoveParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("requestId");

    router.replace(`?${params.toString()}`);
  };

  const requestValidation = Yup.object().shape({
    amount: Yup.number().required("Campo requerido"),
  });

  const { currentUser } = useAuth();

  const [searchState, setSearchState] = useState({
    typeService: 1,
    capacity: 0,
  });
  const [watchRequest, setWatchRequest] = useState(false);
  const serviceTypes = useAppSelector(
    (state: IRootState) => state.common.serviceTypes,
  );
  const { requestResultList, loading } = useAppSelector(
    (state: IRootState) => state.contract,
  );
  const [requestResult, setRequestResult] = useState<RequestResult | null>(
    null,
  );
  const [amount, setAmount] = useState(0);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(getRequestsByServiceId(searchState.typeService));
  };

  const handleBack = () => {
    setWatchRequest(false);
    setRequestResult(null);
    if (requestId) handleRemoveParam();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(
      createApplication({
        message: "Oferta",
        proposedAmount: amount,
        requestId: requestResult?.id as number,
        driverId: currentUser.id,
      }),
    ).then((res) => {
      if (createApplication.fulfilled.match(res)) {
        setWatchRequest(false);
        setRequestResult(null);
        if (requestId) handleRemoveParam();
      }
    });
  };

  useEffect(() => {
    if (requestId) {
      dispatch(getRequestById(Number(requestId))).then((res) => {
        if (getRequestById.fulfilled.match(res)) {
          setWatchRequest(true);
          setRequestResult(res.payload as RequestResult);
          setAmount((res.payload as RequestResult).trip.amount);
        }
        if (getRequestById.rejected.match(res)) {
          setWatchRequest(false);
          setRequestResult(null);
          handleRemoveParam();
        }
      });
    }
  }, [requestId]);

  return {
    searchState,
    setSearchState,
    watchRequest,
    setWatchRequest,
    requestResult,
    setRequestResult,
    serviceTypes,
    requestResultList,
    loading,
    handleSearch,
    handleBack,
    handleChange,
    handleSubmit,
    requestValidation,
    amount,
    setAmount,
    requestId,
  };
};
export default useSearch;
