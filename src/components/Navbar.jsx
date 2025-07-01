import React, { useState } from "react";
import { links } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	return (
		<header className="w-full h-[80px] fixed left-0 top-0 bg-white">
			<nav className="py-4 px-20 flex justify-between items-center ">
				<h1 className="font-black text-[24px] text-red-700">Rabbithole4Og's</h1>
				<div className="flex items-center gap-6">
					<ul className="hidden lg:flex items-center gap-4">
						{links.map((lnk) => {
							return (
								<li key={lnk.id}>
									<Link
										className="inline-flex px-4 py-3 bg-red-500 text-white font-semibold text-xs rounded-[5px] hover:bg-red-600"
										to={lnk.path}
									>
										{lnk.title}
									</Link>
								</li>
							);
						})}
					</ul>
					{/* <button
						className="text-xl font-semibold p-1 sm:hidden"
						onClick={handleToggle}
					>
						{!toggle ? <MdMenu /> : <MdClose />}
					</button> */}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
