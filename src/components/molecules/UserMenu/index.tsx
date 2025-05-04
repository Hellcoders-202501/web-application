import { FaChevronDown } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const UserMenu = () => {
	const handleLogOut = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<Menu>
			<MenuButton
				type="button"
				className="flex gap-2 items-center cursor-pointer focus:outline-0"
			>
				<div className="rounded-full p-1 md:p-2 bg-white text-xs md:text-base">MS</div>
				<p className="text-white text-sm md:text-base">Manuel Segura</p>
				<FaChevronDown color="white" size={16} />
			</MenuButton>
			<MenuItems
				transition
				anchor="bottom end"
				className="w-44 md:w-52 origin-top-right rounded-xl border border-gray-200
                bg-white p-1 transition duration-100 ease-out [--anchor-gap:--spacing(1)]
                focus:outline-none data-closed:scale-95 data-closed:opacity-0 mt-2"
			>
				<MenuItem>
					<button
						type="button"
						onClick={handleLogOut}
						className="w-full cursor-pointer text-sm md:text-base"
					>
						Log out
					</button>
				</MenuItem>
			</MenuItems>
		</Menu>
	);
};
export default UserMenu;
