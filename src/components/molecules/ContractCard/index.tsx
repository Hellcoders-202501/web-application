import Button from "@components/atoms/Button";
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, type FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export type ContractVariant = "offer" | "pending" | "history" | "request";

interface Props {
	// contract: Trip;
	variant?: ContractVariant;
	userType?: string | null;
}

const ContractCard: FC<Props> = ({ variant = "history", userType }) => {
	const [showPaypal, setShowPaypal] = useState(false);

	const defineText = () => {
		if (userType === "client") {
			switch (variant) {
				case "offer":
					return "Aceptar";
				case "pending":
					return "Finalizar";
				default:
					return "";
			}
		}
		if (userType === "driver") {
			switch (variant) {
				case "offer":
					return "";
				case "pending":
					return "Completar";
				default:
					return "";
			}
		}
		return "";
	};

	if (variant === "offer" || variant === "pending")
		return (
			<div className="card px-10 py-8 min-h-[370px] max-w-[405px]">
				<p className="text-xl font-semibold">Información</p>
				<div className="mt-4">
					<p>
						Desde: <b>Comas</b>
					</p>
					<p>
						Hasta: <b>Los Olivos</b>
					</p>
					<p>
						Fecha: <b>12/05/25</b>
					</p>
					<p>
						Capacidad: <b>20</b>
					</p>
				</div>
				<div
					className="flex justify-between font-semibold text-lg border-t mt-4
                    pt-2"
				>
					<p>Datos del {userType === "client" ? "Conductor" : "Cliente"}</p>
					<p>Pago</p>
				</div>
				<div className="flex justify-between items-end gap-10">
					<div>
						<div className="flex gap-2 items-center">
							<FaRegUserCircle size={32} />
							<div className="text-sm">
								<p>Oscar Canellas</p>
								<p>983288372</p>
							</div>
						</div>
					</div>
					<p className="text-2xl font-bold">S/. 100</p>
				</div>
				<div className="mt-4 flex gap-6 items-center">
					<Button
						variant="accept"
						className="flex-1/2"
						onClick={() => {
							if (defineText() === "Finalizar") setShowPaypal(true);
						}}
					>
						{defineText()}
					</Button>
					<Button variant="denied" className="flex-1/2">
						{variant === "pending" ? "Cancelar" : "Declinar"}
					</Button>
				</div>
				<Dialog
					open={showPaypal}
					onClose={() => setShowPaypal(false)}
					className="relative z-50"
				>
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
						<DialogPanel className="max-w-lg space-y-4 border bg-white p-12 max-h-10/12 overflow-y-auto">
							<DialogTitle className="font-bold">Pagar el servicio</DialogTitle>
							<Description>
								Has marcado el servicio de transporte como finalizado. Por
								favor, realiza el pago.
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
														value: "100.00",
													},
												},
											],
											intent: "CAPTURE"
										});
									}}
									onApprove={async (data, actions) => {
										const details = await actions.order?.capture();
										console.log("Transaction completed by ", details);
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

	if (variant === "history" || variant === "request")
		return (
			<div>
				<div className="card flex gap-5 px-10 py-8 min-h-[200px] max-w-[405px]">
					{variant === "history" && (
						<div>
							<FaRegUserCircle size={100} />
							<div className="text-center mt-2">
								<p className="font-semibold">
									{userType === "client" ? "Conductor" : "Cliente"}
								</p>
								<p>Oscar Canellas</p>
							</div>
						</div>
					)}

					<div>
						<p className="font-semibold">Detalles:</p>
						<p className="mt-4">
							Fecha: <b>12/05/25</b>
						</p>
						<p>
							Desde: <b>Comas</b>
						</p>
						<p>
							Hasta: <b>Los Olivos</b>
						</p>
						<p>
							Pago: <b>S/. 450</b>
						</p>
					</div>
				</div>
				{variant === "request" && (
					<div className="flex justify-center mt-4">
						<Button className="w-1/2">Editar</Button>
						<Button className="w-1/2 ml-4" variant="denied">
							Borrar
						</Button>
					</div>
				)}
			</div>
		);
};
export default ContractCard;
