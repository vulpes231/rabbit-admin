import React from "react";

const Box = ({ icon, title, value }) => {
  return (
    <div className="bg white rounded-lg shadow h-30 flex flex-col items-center justify-center gap-2 p-6">
      <span>{icon}</span>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default Box;
