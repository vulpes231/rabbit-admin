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
      className="w-full outline-none border-2 p-2 border-gray-300 placeholder:text-sm placeholder:font-thin focus:outline-red-500 focus:border-none"
    />
  );
};

export default Forminput;
