import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import type { RequestContract } from "@models/contract";
import { getServiceTypes } from "@redux/common/commonThunk";
import { makeRequest } from "@redux/contract/contractThunk";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const useRequestService = () => {
  const dispatch = useAppDispatch();
  const serviceTypes = useAppSelector(
    (state: IRootState) => state.common.serviceTypes,
  );
  const loading = useAppSelector((state: IRootState) => state.contract.loading);

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

  const handleSubmit = (requestDate: Date) => {
    setRequestState((prevState) => ({
      ...prevState,
      date: requestDate.toISOString().split("T")[0],
    }));
    const { typeService, capacity, ...request } = requestState;
    dispatch(
      makeRequest({
        clientId: 1,
        serviceId: typeService,
        trip: request,
      }),
    );
  };

  useEffect(() => {
    if (serviceTypes.length === 0) dispatch(getServiceTypes());
  }, []);

  return {
    requestState,
    handleChange,
    handleSubmit,
    requestValidation,
    loading,
    serviceTypes,
  };
};

export default useRequestService;
