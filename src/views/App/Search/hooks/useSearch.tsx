import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { getRequestsByServiceId } from "@redux/contract/contractThunk";
import { useState } from "react";

const useSearch = () => {
  const [searchState, setSearchState] = useState({
    typeService: 1,
    capacity: 0,
  });
  const [watchRequest, setWatchRequest] = useState(false);
  const serviceTypes = useAppSelector(
    (state: IRootState) => state.common.serviceTypes,
  );
  const { requestResultList, requestResult, loading } = useAppSelector(
    (state: IRootState) => state.contract,
  );
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(getRequestsByServiceId(searchState.typeService));
  };

  return {
    searchState,
    setSearchState,
    watchRequest,
    setWatchRequest,
    serviceTypes,
    requestResultList,
    requestResult,
    loading,
    handleSearch,
  };
};
export default useSearch;
