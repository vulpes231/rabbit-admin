import React from "react";

const Forminput = ({ type, placeHolder, value, handleChange, name }) => {
	return (
		<input
			type={type}
			placeholder={placeHolder}
			autoComplete="off"
			value={value}
			onChange={handleChange}
			name={name}
			className="w-full outline-none p-2 h-[40px] border border-[#dedede] placeholder:text-[14px] placeholder:font-thin focus:outline-red-500/50 focus:border-none text-[16px] text-[#000000] rounded-[5px]"
		/>
	);
};

export default Forminput;
