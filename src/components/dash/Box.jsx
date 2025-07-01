import { motion } from "framer-motion";
import React from "react";

const Box = ({ icon, title, value }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{
				y: -5,
				boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.2)",
			}}
			transition={{ type: "spring", stiffness: 300 }}
			className="bg-white rounded-xl shadow-md cursor-pointer h-full flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 hover:border-red-100"
		>
			<motion.span
				className="text-4xl text-red-500"
				whileHover={{ scale: 1.1 }}
			>
				{icon}
			</motion.span>

			<h3 className="font-medium text-gray-600 capitalize text-sm">{title}</h3>

			<motion.p
				className="text-2xl font-bold text-gray-800"
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2 }}
			>
				{value}
			</motion.p>
		</motion.div>
	);
};

export default Box;
