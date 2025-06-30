import React from "react";
import { CgClose } from "react-icons/cg";

const Errormodal = ({ errorText }) => {
	return (
		<div className="p-4 fixed top-[80px] right-[10px] text-red-500 z-[1000] bg-white w-[280px] shadow-md rounded-[10px]">
			<div className="flex flex-col items-center justify-center gap-2">
				<CgClose className="w-8 h-8 text-red-500" />
				<span className="flex flex-col items-center">
					<h3 className="font-bold text-[14px] leading-[22px]">Success.</h3>
					<h5 className="text-[13px] font-medium">{errorText}</h5>
				</span>
			</div>
		</div>
	);
};

export default Errormodal;
