import Image from "next/image";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";

const VehicleCard = () => {
	return (
		<div className="flex flex-col gap-5 items-end max-w-xl w-full">
			<div className="flex gap-10 justify-between items-end w-full">
				<label htmlFor="">Marca</label>
				<Input className="w-8/12 text-center" />
			</div>
			<div className="flex gap-10 justify-between items-end w-full">
				<label htmlFor="">Tipo de servicio</label>
				<Select className="w-8/12 text-center">
					<option value="Moving">Mudanza</option>
					<option value="Transportation">Transporte</option>
					<option value="Tourism">Turismo</option>
					<option value="Tourism">Transporte de mercadería</option>
				</Select>
			</div>
			<Image
				className="mx-auto rounded-lg border border-black/50"
				src="https://plus.unsplash.com/premium_photo-1729018715734-ae43c1fb56de?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Vehicle"
				width={300}
				height={150}
			/>
		</div>
	);
};

const Vehicle = () => {
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="overflow-scroll max-h-[500px] px-10">
				{Array(2)
					.fill(null)
					.map((_, i) => (
						<VehicleCard key={i} />
					))}
			</div>
			<Button variant="accept" className="w-fit self-end">
				Agregar vehículo
			</Button>
		</div>
	);
};
export default Vehicle;
