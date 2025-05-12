import Button from "@components/atoms/Button";
import TextArea from "@components/atoms/TextArea";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const UserProfile = ({
	editable = false,
	setEditable,
    description,
    setDescription,
}: {
	editable: boolean;
	setEditable?: VoidFunction;
    description: string;
    setDescription: (description: string) => void;
}) => {
	return (
		<div className="flex flex-col gap-5 items-center max-w-xl w-full">
			<FaRegUserCircle size={120} />
			<p className="font-bold text-4xl">Manuel Segura</p>
			<TextArea
				className="text-justify block"
				variant={editable ? "primary" : "disabled"}
				disabled={!editable}
				value={description}
				rows={5}
				cols={50}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className="flex gap-4 items-center">
				{Array(5)
					.fill(null)
					.map((_, i) => (
						<FaStar key={i} size={20} />
					))}
			</div>
			<Button className="flex gap-2 items-center" onClick={setEditable}>
				<p>{editable ? "Save" : "Edit Profile"}</p>
				{!editable && <MdEdit />}
			</Button>
		</div>
	);
};

export default UserProfile;
