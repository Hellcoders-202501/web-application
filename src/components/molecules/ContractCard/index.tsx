import Button from "@components/atoms/Button";
import TripDetailsDialog from "@components/organisms/TripDetailsDialog";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ApplicationInformation, RequestResult } from "@models/contract";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";
import { type FC, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export type ContractVariant = "offer" | "pending" | "history" | "request";

interface Props {
  request?: RequestResult;
  application?: ApplicationInformation;
  variant?: ContractVariant;
  userType?: string | null;
  seeOffers?: (id: number) => void;
  acceptContract?: (id: number) => void;
  deleteOffer?: (id: number) => void;
  declineOffer?: (id: number) => void;
  startContract?: (id: number) => void;
  // deleteContract?: (id: number) => void;
  completeContract?: (id: number) => void;
  finishContract?: (id: number) => void;
}

const ContractCard: FC<Props> = ({
  variant = "history",
  userType,
  request,
  application,
  seeOffers,
  acceptContract,
  deleteOffer,
  declineOffer,
  startContract,
  // deleteContract,
  completeContract,
  finishContract,
}) => {
  const [showPaypal, setShowPaypal] = useState(false);
  const [moreInformation, setMoreInformation] = useState({
    show: false,
    tripId: 0,
  });

  const [buttonAction, setButtonAction] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (userType === "CLIENT") {
      if (
        variant === "pending" &&
        request?.trip.status === "FINISHED_BY_DRIVER"
      )
        setButtonAction({
          show: true,
          message: "Finalizar",
        });
    }
    if (userType === "DRIVER") {
      if (variant === "pending" && request?.trip.status === "PENDING")
        setButtonAction({
          show: true,
          message: "Empezar",
        });
      if (variant === "pending" && request?.trip.status === "STARTED")
        setButtonAction({
          show: true,
          message: "Completar",
        });
    }
  }, []);

  const defineVariant = (variant: string) => {
    if (variant === "offer")
      return (
        <div className="card px-10 py-8 min-h-[250px] max-w-[405px]">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Información</p>
            <Link href={`/driver/${application?.driver.id}`}>
              <FaEye size={20} />
            </Link>
          </div>
          <div
            className="flex justify-between font-semibold text-lg border-t mt-4
          	pt-2"
          >
            <p>Datos del Conductor</p>
            <p>Pago</p>
          </div>
          <div className="flex justify-between items-end gap-10">
            <div>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle size={32} />
                <div className="text-sm">
                  <p>
                    {application?.driver.name}{" "}
                    {application?.driver.firstLastName}
                  </p>
                  <p>{application?.driver.phone}</p>
                </div>
              </div>
            </div>
            <p className="text-2xl font-bold">
              S/. {application?.proposedAmount}
            </p>
          </div>
          <div className="mt-4 flex gap-6 items-center">
            <Button
              type="button"
              variant="accept"
              className="flex-1/2"
              onClick={() => setShowPaypal(true)}
            >
              Aceptar
            </Button>
            <Button
              type="button"
              variant="denied"
              className="flex-1/2"
              onClick={() => declineOffer?.(application?.id as number)}
            >
              Declinar
            </Button>
          </div>
          <Dialog
            open={showPaypal}
            onClose={() => setShowPaypal(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
              <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 max-h-10/12 overflow-y-auto">
                <DialogTitle className="font-bold">
                  Pagar el servicio
                </DialogTitle>
                <Description>
                  Para confirmar la solicitud, debes pagar el servicio.
                </Description>
                <div className="flex flex-col gap-5">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    className="w-full"
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: "10.00",
                            },
                          },
                        ],
                        intent: "CAPTURE",
                      });
                    }}
                    onApprove={async (data, actions) => {
                      // const details = await actions.order?.capture();
                      // console.log("Transaction completed by ", details);
                      acceptContract?.(application?.id as number);
                      setShowPaypal(false);
                    }}
                    onError={(err) => {
                      console.error("Error al procesar el pago", err);
                    }}
                    onCancel={() => {
                      console.log("Pago cancelado");
                    }}
                  />
                  <Button
                    variant="accept"
                    type="button"
                    onClick={() => {
                      acceptContract?.(application?.id as number);
                      setShowPaypal(false);
                    }}
                  >
                    Realizar Pago
                  </Button>
                  <Button
                    variant="denied"
                    onClick={() => setShowPaypal(false)}
                    type="button"
                  >
                    Cancelar
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      );

    if (variant === "pending")
      return (
        <div className="card px-10 py-8 min-h-[300px] max-w-[405px]">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Información</p>
            <button
              type="button"
              onClick={() =>
                setMoreInformation({
                  show: true,
                  tripId: request?.trip.id as number,
                })
              }
            >
              <FaEye size={20} />
            </button>
          </div>
          <div className="mt-4">
            <p>
              Desde: <b>{request?.trip.origin}</b>
            </p>
            <p>
              Hasta: <b>{request?.trip.destination}</b>
            </p>
            <p>
              Fecha: <b>{request?.trip.date}</b>
            </p>
            {/* <p>
						Capacidad: <b>20</b>
					</p> */}
          </div>
          <div
            className="flex justify-between font-semibold text-lg border-t mt-4
          			pt-2"
          >
            <p>Datos del {userType === "CLIENT" ? "Conductor" : "Cliente"}</p>
            <p>Pago</p>
          </div>
          <div className="flex justify-between items-end gap-10">
            <div>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle size={32} />
                <div className="text-sm">
                  <p>
                    {userType === "CLIENT"
                      ? request?.contract.driver.name
                      : request?.client.name}
                  </p>
                  <p>
                    {userType === "CLIENT"
                      ? request?.contract.driver.phone
                      : request?.client.phone}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-2xl font-bold">
              S/. {request?.contract.payment.amount}
            </p>
          </div>
          <div className="mt-4 flex gap-6 items-center">
            {buttonAction.show && (
              <Button
                variant="accept"
                className="flex-1/2"
                type="button"
                onClick={() => {
                  if (buttonAction.message === "Finalizar")
                    finishContract?.(request?.trip.id as number);
                  if (buttonAction.message === "Empezar")
                    startContract?.(request?.trip.id as number);
                  if (buttonAction.message === "Completar")
                    completeContract?.(request?.trip.id as number);
                }}
              >
                {buttonAction.message}
              </Button>
            )}
            {(userType === "DRIVER" &&
              request?.trip.status === "FINISHED_BY_DRIVER") ||
              (userType === "CLIENT" &&
                request?.trip.status === "FINISHED_BY_CLIENT" && (
                  <p className="text-lg mt-5 text-center w-full">
                    Haz <b>FINALIZADO</b> <br /> este contrato
                  </p>
                ))}

            {/* <Button
							variant="denied"
							className="flex-1/2"
							type="button"
							onClick={() => deleteContract?.(request?.trip.id as number)}
						>
							Cancelar
						</Button> */}
          </div>
        </div>
      );

    if (variant === "history" || variant === "request")
      return (
        <div>
          <div className="card flex gap-5 px-10 py-8 min-h-[200px] max-w-[405px]">
            {variant === "history" && (
              <div>
                <FaRegUserCircle size={100} />
                <div className="text-center mt-2">
                  <p className="font-semibold">
                    {userType === "CLIENT" ? "Conductor" : "Cliente"}
                  </p>
                  <p>
                    {userType === "CLIENT"
                      ? request?.contract.driver.name
                      : request?.client.name}
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="font-semibold">Detalles:</p>
              <p className="mt-4">
                Fecha: <b>{request?.trip.date}</b>
              </p>
              <p>
                Desde: <b>{request?.trip.origin}</b>
              </p>
              <p>
                Hasta: <b>{request?.trip.destination}</b>
              </p>
              <p>
                Pago: <b>S/. {request?.trip.amount}</b>
              </p>
            </div>
          </div>
          {variant === "request" && (
            <div className="flex justify-center mt-4">
              {/* <Button className="w-1/2">Editar</Button> */}
              <Button
                className="w-1/2"
                type="button"
                onClick={() => seeOffers?.(request?.id as number)}
              >
                Ofertas
              </Button>
              <Button
                className="w-1/2 ml-4"
                variant="denied"
                type="button"
                onClick={() => deleteOffer?.(request?.id as number)}
              >
                Borrar
              </Button>
            </div>
          )}
        </div>
      );
  };

  return (
    <>
      {defineVariant(variant)}
      <TripDetailsDialog
        show={moreInformation.show}
        onClose={() =>
          setMoreInformation({
            show: false,
            tripId: 0,
          })
        }
        tripId={moreInformation.tripId}
      />
    </>
  );
};
export default ContractCard;
