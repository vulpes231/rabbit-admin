import React from "react";

const Formdiv = ({ children }) => {
  return (
    <div className="flex flex-col gap-1 capitalize font-medium text-sm">
      {children}
    </div>
  );
};

export default Formdiv;
