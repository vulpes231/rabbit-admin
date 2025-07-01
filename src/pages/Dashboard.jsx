import React, { useEffect, useState } from "react";
import Stats from "../components/dash/Stats";
import { MdLogout, MdSupervisorAccount, MdTimer } from "react-icons/md";
import { motion } from "framer-motion";

const Dashboard = ({ handleLogout }) => {
	const lastLogin = JSON.parse(sessionStorage.getItem("lastLogin"));

	const admin = JSON.parse(sessionStorage.getItem("admin"));

	useEffect(() => {
		document.title = "Admin - Dashboard";
	}, []);

	return (
		<section className="flex flex-col gap-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="p-6 flex justify-between items-center bg-white border-b border-gray-100 rounded-[10px] shadow-md"
			>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-3">
						<motion.div
							className="text-2xl text-blue-500"
							whileHover={{ rotate: 15 }}
						>
							<MdSupervisorAccount />
						</motion.div>
						<h1 className="text-2xl font-semibold text-gray-800">
							Welcome, <span className="text-blue-600">{admin?.username}</span>
						</h1>
					</div>

					<div className="flex items-center gap-2 text-sm text-gray-500 ml-1">
						<MdTimer className="text-gray-400" />
						<span>
							Last login: <span className="font-medium">{lastLogin}</span>
						</span>
					</div>
				</div>

				<motion.button
					onClick={handleLogout}
					whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
					whileTap={{ scale: 0.95 }}
					className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
				>
					<MdLogout className="text-lg" />
					<span>Logout</span>
				</motion.button>
			</motion.div>
			<div>
				<Stats />
			</div>
		</section>
	);
};

export default Dashboard;
