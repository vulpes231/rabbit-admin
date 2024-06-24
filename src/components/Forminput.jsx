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
      className="w-full border p-2 placeholder:text-sm placeholder:font-thin outline-blue-700"
    />
  );
};

export default Forminput;
