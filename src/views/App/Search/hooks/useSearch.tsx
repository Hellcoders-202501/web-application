import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import { RequestResult } from "@models/contract";
import {
  createApplication,
  getRequestsByServiceId,
} from "@redux/contract/contractThunk";
import { useState } from "react";
import * as Yup from "yup";

const useSearch = () => {
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
      }
    });
  };

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
  };
};
export default useSearch;
