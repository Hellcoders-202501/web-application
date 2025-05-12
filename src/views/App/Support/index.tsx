import Button from "@components/atoms/Button";
import { CiMail } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

const SupportView = () => {
	return (
		<div
			className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto items-center
            h-auto lg:h-full my-20 lg:my-auto"
		>
			{/* Left */}
			<div>
				<p className="text-6xl font-bold text-center">Do you need help?</p>
				<svg
					className="mx-auto mt-10"
					width="226"
					height="226"
					viewBox="0 0 226 226"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M121.24 207.167L118.885 181.271H109.469C87.0257 181.271 67.8785 173.345 52.0271 157.494C36.1757 141.642 28.25 122.495 28.25 100.052C28.25 77.6089 36.2149 58.4617 52.1448 42.6103C68.0746 26.7589 87.3396 18.8333 109.94 18.8333C121.083 18.8333 131.402 20.8343 140.897 24.8364C150.392 28.8385 158.671 34.4492 165.733 41.6687C172.796 48.8881 178.328 57.4023 182.33 67.2114C186.332 77.0204 188.333 87.7319 188.333 99.3457C188.333 120.376 182.409 140.661 170.559 160.201C158.71 179.741 142.27 195.396 121.24 207.167ZM109.94 154.669C112.451 154.669 114.569 153.805 116.296 152.079C118.022 150.353 118.885 148.234 118.885 145.723C118.885 143.212 118.022 141.093 116.296 139.367C114.569 137.64 112.451 136.777 109.94 136.777C107.428 136.777 105.31 137.64 103.583 139.367C101.857 141.093 100.994 143.212 100.994 145.723C100.994 148.234 101.857 150.353 103.583 152.079C105.31 153.805 107.428 154.669 109.94 154.669ZM103.583 122.652H115.354C115.354 118.728 116.021 115.472 117.355 112.882C118.689 110.293 121.475 106.879 125.712 102.642C129.95 98.4041 132.932 94.5197 134.658 90.9885C136.385 87.4572 137.248 83.6513 137.248 79.5707C137.248 72.5082 134.855 66.7013 130.068 62.1499C125.281 57.5985 118.885 55.3228 110.881 55.3228C104.29 55.3228 98.4042 57.0492 93.225 60.502C88.0458 63.9548 84.2007 68.6631 81.6896 74.627L92.5187 79.0999C94.2451 75.0194 96.6385 71.9982 99.699 70.0364C102.759 68.0746 106.251 67.0937 110.175 67.0937C114.883 67.0937 118.572 68.2315 121.24 70.5072C123.908 72.7829 125.242 75.8041 125.242 79.5707C125.242 82.5527 124.378 85.5739 122.652 88.6343C120.926 91.6947 117.865 95.5006 113.471 100.052C109.233 104.446 106.526 107.978 105.349 110.646C104.172 113.314 103.583 117.316 103.583 122.652ZM133.01 167.146V181.742C145.88 170.912 155.964 158.161 163.261 143.486C170.559 128.812 174.208 114.099 174.208 99.3457C174.208 79.8846 168.127 63.9548 155.964 51.5562C143.8 39.1576 128.459 32.9583 109.94 32.9583C91.1062 32.9583 75.1371 39.5107 62.0323 52.6155C48.9274 65.7204 42.375 81.5326 42.375 100.052C42.375 118.571 48.9274 134.384 62.0323 147.488C75.1371 160.593 90.9493 167.146 109.469 167.146H133.01Z"
						fill="#263E54"
					/>
				</svg>
			</div>
			{/* Right */}
			<div className="flex flex-col gap-6">
				<div className="card rounded-4xl flex gap-4 px-5 py-4">
					<CiMail size={24} color="#0760A0" />
					<p>FastPorte_support@gmail.com</p>
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
				<Button>Send us a message</Button>
				<Button>Frequently questions</Button>
			</div>
		</div>
	);
};
export default SupportView;
