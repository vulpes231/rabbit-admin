import { motion } from "framer-motion";
import React from "react";

const Loadinmodal = ({ loadingText }) => {
	return (
		<section className="w-full h-screen fixed left-0 top-0 flex items-center justify-center bg-black/50">
			<div className="flex flex-col items-center gap-4">
				<motion.div
					className="w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent"
					animate={{ rotate: 360 }}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<h3 className="text-white">{loadingText}...</h3>
			</div>
		</section>
	);
};

export default Loadinmodal;
