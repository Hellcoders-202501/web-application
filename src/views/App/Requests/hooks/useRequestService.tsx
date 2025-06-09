import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import useAuth from "@hooks/useAuth";
import type { RequestContract } from "@models/contract";
import { getServiceTypes } from "@redux/common/commonThunk";
import {
  getRequestsByClientId,
  makeRequest,
} from "@redux/contract/contractThunk";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const useRequestService = () => {
  const dispatch = useAppDispatch();
  const serviceTypes = useAppSelector(
    (state: IRootState) => state.common.serviceTypes,
  );
  const { loading, requestResultList } = useAppSelector(
    (state: IRootState) => state.contract,
  );
  const { currentUser } = useAuth();

  const requestValidation = () => {
    return Yup.object().shape({
      origin: Yup.string().required("Origen del servicio requerido"),
      destination: Yup.string().required("Destino del servicio requerido"),
      typeService: Yup.string().required("Tipo de servicio requerido"),
      startTime: Yup.string().required("Hora de inicio requerido"),
      endTime: Yup.string().required("Hora de termino requerido"),
      capacity: Yup.number()
        .min(1, "Debe ser mínimo 1")
        .required("Capaciadad requerida"),
      amount: Yup.number()
        .min(10, "El pago debe ser mínimo 10")
        .required("Pago requerido"),
    });
  };

  const [requestState, setRequestState] = useState<RequestContract>({
    origin: "",
    destination: "",
    typeService: 1,
    startTime: "",
    endTime: "",
    capacity: 0,
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setRequestState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (requestDate: Date) => {
    setRequestState((prevState) => ({
      ...prevState,
      date: requestDate.toISOString().split("T")[0],
    }));
    const { typeService, capacity, ...request } = requestState;

    const resultAction = await dispatch(
      makeRequest({
        clientId: currentUser?.id as number,
        serviceId: typeService,
        trip: request,
      }),
    );

    if (makeRequest.fulfilled.match(resultAction)) {
      // Resetear el formulario
      setRequestState({
        origin: "",
        destination: "",
        typeService: 1,
        startTime: "",
        endTime: "",
        capacity: 0,
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        subject: "",
        description: "",
      });
    }
  };

  useEffect(() => {
    if (serviceTypes.length === 0) dispatch(getServiceTypes());
  }, []);

  useEffect(() => {
    dispatch(getRequestsByClientId(currentUser?.id as number));
  }, []);

  return {
    requestState,
    handleChange,
    handleSubmit,
    requestValidation,
    loading,
    serviceTypes,
    requestResultList,
  };
};

export default useRequestService;
