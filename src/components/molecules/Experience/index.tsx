import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";

const ExperienceCard = () => {
	return (
		<div className="flex flex-col gap-5 items-end max-w-xl w-full">
			<div className="flex gap-10 justify-between items-end w-full">
				<label htmlFor="">Trabajo</label>
				<Input className="w-8/12 text-center" />
			</div>
			<div className="flex gap-10 justify-between items-end w-full">
				<label htmlFor="">Tiempo</label>
				<Input className="w-8/12 text-center" />
			</div>
		</div>
	);
};

const Experience = () => {
	return (
		<div className="w-full lg:mx-10 flex flex-col gap-10">
			{Array(2)
				.fill(null)
				.map((_, i) => (
					<ExperienceCard key={i} />
				))}
            <Button variant="accept" className="w-fit self-end">Agregar experiencia</Button>
		</div>
	);
};

export default Experience;
