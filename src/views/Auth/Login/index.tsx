"use client";
import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import { Form, Formik } from "formik";
import useLogin from "./hooks/useLogin";
import Title from "@components/molecules/Title";
import Link from "next/link";

const LoginView = () => {
	const { loginSate, handleChange, handleSubmit } = useLogin();

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<Title title="Bienvenido, vamos a iniciar!" />
			<div className="card w-xl mt-10 px-24 py-10">
				<Formik initialValues={loginSate} onSubmit={handleSubmit}>
					<Form className="flex flex-col gap-5">
						<Input
							placeholder="Correo electrónico"
							onChange={handleChange}
							type="email"
						/>
						<Input
							placeholder="Contraseña"
							onChange={handleChange}
							type="password"
						/>
						<Button type="submit" className="mt-3">Iniciar sesión</Button>
					</Form>
				</Formik>
				<div className="flex flex-col gap-4 mt-10 items-center">
					<Link href="/forgot-password" className="text-[#62637C] underline">
						Olvidaste tu contraseña?
					</Link>
					<div className="flex gap-2">
						<p className="text-[#62637C]">No tienes una cuenta todavía?</p>
						<Link href="/signup" className="text-[#60A3F0] underline">
							Crear cuenta
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginView;
