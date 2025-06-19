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

const VehicleCard = ({ vehicle }: { vehicle: VehicleType }) => {
  return (
    <div className="flex gap-5 items-center max-w-xl w-full">
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
  );
};

const Vehicle = ({
  serviceTypes,
  vehicles,
  addVehicle,
  vehicle,
  handleChangeVehicle,
  createVehicleValidation,
  loading,
}: {
  serviceTypes: ServiceType[];
  vehicles: VehicleType[];
  addVehicle: VoidFunction;
  vehicle: CreateVehicle;
  handleChangeVehicle: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  createVehicleValidation: any;
  loading: boolean;
}) => {
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="overflow-scroll max-h-[500px] px-10">
        {vehicles.map((vehicle, i) => (
          <VehicleCard key={i} vehicle={vehicle} />
        ))}
      </div>
      {!showAddVehicle && (
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
          initialValues={vehicle}
          onSubmit={() => {
            addVehicle();
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
                  value={vehicle.brand}
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
