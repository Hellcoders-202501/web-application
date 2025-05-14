"use client";
import Button from "@components/atoms/Button";
import { CiMail } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import Input from "@components/atoms/Input";
import { Form, Formik } from "formik";
import TextArea from "@components/atoms/TextArea";

const SupportView = () => {
	return (
		<div
			className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto items-center
            h-auto lg:h-full my-20 lg:my-auto"
		>
			{/* Left */}
			<div>
				<p className="text-6xl font-bold text-center">Necesitas ayuda?</p>
				<Formik initialValues={{}} onSubmit={() => {}}>
					<Form className="flex flex-col gap-10 my-20 mx-10">
						<div className="flex flex-col md:flex-row gap-5 justify-between">
							<div className="flex flex-col gap-5 md:w-5/12">
								<label htmlFor="">Nombre</label>
								<Input />
							</div>
							<div className="flex flex-col gap-5 md:w-5/12">
								<label htmlFor="">Correo electrónico</label>
								<Input />
							</div>
						</div>
						<div className="flex flex-col gap-5">
							<label htmlFor="">Mensaje</label>
							<TextArea />
						</div>
						<Button>Enviar mensaje</Button>
					</Form>
				</Formik>
			</div>
			{/* Right */}
			<div className="flex flex-col gap-6">
				<div className="card rounded-4xl flex gap-4 px-5 py-4">
					<CiMail size={24} color="#0760A0" />
					<p>fastporte@gmail.com</p>
				</div>
				<div className="card rounded-4xl flex gap-4 px-5 py-4">
					<IoPersonOutline size={24} color="#0760A0" />
					<p>+51 987654321</p>
				</div>
				<div className="flex justify-between">
					<Link href="https://whatsapp.com" target="_blank">
						<FaWhatsapp size={48} color="#4CAF50" />
					</Link>
					<Link href="https://facebook.com" target="_blank">
						<FaFacebook size={48} color="#1A77F2" />
					</Link>
					<Link href="https://facebook.com" target="_blank">
						<FaInstagram size={48} color="#A53A91" />
					</Link>
				</div>
				{/* <Button>Send us a message</Button> */}
				<Button>Preguntas frecuentes</Button>
			</div>
		</div>
	);
};
export default SupportView;
