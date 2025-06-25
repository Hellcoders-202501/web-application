import Image from "next/image";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";
import { CreateVehicle } from "@models/user";
import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { ServiceType } from "@models/common";
import { FaCar } from "react-icons/fa";
import type { Vehicle as VehicleType } from "@models/user";
import { MdDelete } from "react-icons/md";
import ConfirmationDialog from "@components/organisms/ConfirmationDialog";

const VehicleCard = ({
  vehicle,
  handleDelete,
  showActions,
}: {
  vehicle: VehicleType;
  handleDelete: (id: number) => void;
  showActions: boolean;
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="max-w-xl w-full flex justify-between">
      <div
        className={`flex gap-5 items-center ${
          showActions ? "w-10/12" : "w-full"
        }`}
      >
        <div className="flex gap-10 justify-between items-end">
          <p className="font-extrabold">Marca</p>
          <p className="text-sm border-b">{vehicle.brand}</p>
        </div>
        {/* <div className="flex gap-10 justify-between items-end w-full">
        <label htmlFor="service">Tipo de servicio</label>
        <p>{vehicle.serviceId}</p>
      </div> */}
        {vehicle.imageUrl ? (
          <Image
            className="mx-auto rounded-lg border border-black/50"
            src={vehicle.imageUrl}
            alt="Vehicle"
            width={300}
            height={150}
          />
        ) : (
          <FaCar size={52} color="black" className="mx-auto" />
        )}
      </div>

      {showActions && (
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowDelete(true)}
        >
          <MdDelete size={24} color="#CC0000" />
        </button>
      )}
      <ConfirmationDialog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        message="¿Estás seguro de que deseas eliminar este vehículo?"
        onConfirm={() => {
          handleDelete(vehicle.id);
          setShowDelete(false);
        }}
      />
    </div>
  );
};

const Vehicle = ({
  isDriverView = false,
  serviceTypes,
  vehicles,
  addVehicle,
  vehicle,
  handleChangeVehicle,
  createVehicleValidation,
  handleRemoveVehicle,
  loading,
}: {
  isDriverView?: boolean;
  serviceTypes: ServiceType[];
  vehicles: VehicleType[];
  addVehicle?: VoidFunction;
  vehicle?: CreateVehicle;
  handleChangeVehicle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  createVehicleValidation?: any;
  handleRemoveVehicle?: (id: number) => void;
  loading: boolean;
}) => {
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="overflow-auto max-h-[500px] px-10">
        {vehicles.map((vehicle, i) => (
          <VehicleCard
            key={i}
            vehicle={vehicle}
            handleDelete={handleRemoveVehicle as (id: number) => {}}
            showActions={!isDriverView}
          />
        ))}
      </div>
      {!showAddVehicle && !isDriverView && (
        <Button
          variant="accept"
          type="button"
          className="w-fit self-end"
          onClick={() => setShowAddVehicle(true)}
        >
          Agregar vehículo
        </Button>
      )}
      {showAddVehicle && (
        <Formik
          enableReinitialize
          validationSchema={createVehicleValidation}
          initialValues={vehicle ?? {}}
          onSubmit={() => {
            if (addVehicle) addVehicle();
            setShowAddVehicle(false);
          }}
        >
          <Form className="flex flex-col gap-5 items-end max-w-xl w-full">
            <div className="flex flex-col w-full">
              <div className="flex gap-10 justify-between items-end w-full">
                <label htmlFor="brand">Marca</label>
                <Input
                  name="brand"
                  id="brand"
                  className="w-8/12 text-center"
                  disabled={loading}
                  value={vehicle?.brand}
                  onChange={handleChangeVehicle}
                />
              </div>
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="brand"
              />
            </div>
            <div className="flex gap-10 justify-between items-end w-full">
              <label htmlFor="serviceId">Tipo de servicio</label>
              <Select
                className="w-8/12 text-center"
                name="serviceId"
                id="serviceId"
                onChange={handleChangeVehicle}
              >
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </div>
            {/* <div className="flex flex-col w-full"> */}
            <div className="flex gap-10 justify-between items-end w-full">
              <label htmlFor="brand">Image URL</label>
              <Input className="w-8/12 text-center" />
            </div>
            {/* <ErrorMessage
                component="div"
                className="text-red-500 text-sm pl-2 mt-2 w-fit self-end"
                name="imageUrl"
              />
            </div> */}
            <div className="flex justify-end gap-10 w-full">
              <Button
                variant="denied"
                className="w-fit self-end"
                type="button"
                onClick={() => setShowAddVehicle(false)}
                disabled={loading}
                loading={loading}
              >
                Cancelar
              </Button>
              <Button
                variant="accept"
                className="w-fit self-end"
                type="submit"
                disabled={loading}
                loading={loading}
              >
                Crear
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};
export default Vehicle;
