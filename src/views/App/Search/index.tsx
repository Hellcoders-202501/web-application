"use client";
import { Form, Formik } from "formik";
import useSearch from "./hooks/useSearch";
import Input from "@components/atoms/Input";
import ResultCard from "@components/molecules/ResultCard";
import Select from "@components/atoms/Select";
import RequestForm from "@components/organisms/RequestForm";
import Button from "@components/atoms/Button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Loading from "@components/atoms/Loading";

const SearchView = () => {
  const {
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
  } = useSearch();

  if (requestId && !watchRequest) {
    return <Loading />;
  }

  if (watchRequest)
    return (
      <div
        className="flex flex-col items-center max-w-5xl mx-auto w-10/12 lg:w-auto
			 	my-10 lg:my-20"
      >
        <div className="flex justify-between items-center w-full mb-5">
          <p className="self-start text-4xl font-semibold">Solicitud</p>
          <Button type="button" variant="accept" onClick={handleBack}>
            Volver
          </Button>
        </div>
        <RequestForm
          requestState={{
            typeService: requestResult?.service.id as number,
            ...requestResult!.trip,
            amount: amount,
            capacity: 10,
          }}
          editable={false}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          requestValidation={requestValidation}
          loading={loading}
          serviceTypes={serviceTypes}
        />
      </div>
    );

  return (
    <div
      className="flex flex-col lg:flex-row justify-center lg:justify-between max-w-5xl
      mx-auto w-10/12 lg:w-auto my-10 lg:my-20"
    >
      {/* Left */}
      <div>
        <p className="mb-10 text-4xl font-semibold">Buscar vehículos</p>
        <Formik
          enableReinitialize
          initialValues={searchState}
          onSubmit={handleSearch}
        >
          <Form className="flex items-center gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="typeService">Tipos de servicio</label>
              <Select
                name="typeService"
                id="typeService"
                onChange={(e) => {
                  setSearchState((prevState) => ({
                    ...prevState,
                    typeService: Number(e.target.value),
                  }));
                }}
              >
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              type="submit"
              className="h-fit mt-8"
              loading={loading}
              disabled={loading}
            >
              <FaMagnifyingGlass />
            </Button>
            {/* </Button>
              <label htmlFor="">Capacidad</label>
              <Input />
            </div> */}
          </Form>
        </Formik>
      </div>
      {/* Right */}
      <div>
        <p className="mb-10 text-4xl font-semibold mt-10 lg:mt-0">Resultados</p>
        {requestResultList.length > 0 ? (
          <div className="flex flex-col gap-5">
            {requestResultList.map((request) => (
              <ResultCard
                key={request.id}
                handleRedirect={() => {
                  setWatchRequest(true);
                  setRequestResult(request);
                  setAmount(request?.trip.amount);
                }}
                request={request}
                {...request}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <p className="text-2xl font-semibold">No hay resultados</p>
            <p className="text-xl">Intenta con otros criterios</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchView;
