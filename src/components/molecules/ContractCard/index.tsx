import Button from "@components/atoms/Button";
import { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export type ContractVariant = "offer" | "pending" | "history";

interface Props {
	// contract: Trip;
	variant?: ContractVariant;
}

const ContractCard: FC<Props> = ({ variant = "history" }) => {
	if (variant === "offer" || variant === "pending")
		return (
			<div className="card px-10 py-8 min-h-[370px] max-w-[405px]">
				<p className="text-xl font-semibold">Resume</p>
				<div className="mt-4">
					<p>
						From: <b>Comas</b>
					</p>
					<p>
						To: <b>Los Olivos</b>
					</p>
					<p>
						Date: <b>12/11/23</b>
					</p>
					<p>
						Capacity: <b>20</b>
					</p>
				</div>
				<div
					className="flex justify-between font-semibold text-lg border-t mt-4
                    pt-2"
				>
					<p>Client data</p>
					<p>Amount</p>
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
					<p className="text-2xl font-bold">S/. 1560</p>
				</div>
				<div className="mt-4 flex gap-6">
					{variant === "offer" && <Button variant="accept" className="flex-1/2">Accept</Button>}
					<Button variant="denied" className="flex-1/2">
						{variant === "pending" ? "Cancel" : "Decline"}
					</Button>
				</div>
			</div>
		);

	if (variant === "history")
		return (
			<div className="card flex gap-5 px-10 py-8 min-h-[200px] max-w-[405px]">
				<div>
					<FaRegUserCircle size={100} />
					<div className="text-center mt-2">
						<p className="font-semibold">Driver</p>
						<p>Oscar Canellas</p>
					</div>
				</div>
				<div>
					<p className="font-semibold">Details:</p>
					<p className="mt-4">
						Date: <b>12/11/23</b>
					</p>
					<p>
						From: <b>Comas</b>
					</p>
					<p>
						To: <b>Los Olivos</b>
					</p>
					<p>
						Amount: <b>S/. 450</b>
					</p>
				</div>
			</div>
		);
};
export default ContractCard;
