import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Successmodal = ({ successText }) => {
	return (
		<div className="p-4 fixed top-[85px] right-[10px] text-green-500 z-[1000] bg-white w-[280px] shadow-md rounded-[10px]">
			<div className="flex flex-col items-center justify-center gap-2">
				<FaCheckCircle className="w-8 h-8 text-green-500" />
				<span className="flex flex-col items-center">
					<h3 className="font-bold text-[14px] leading-[22px]">Success.</h3>
					<h5 className="text-[13px] font-medium">{successText}</h5>
				</span>
			</div>
		</div>
	);
};

export default Successmodal;
