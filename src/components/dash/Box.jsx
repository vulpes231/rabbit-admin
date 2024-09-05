import React from "react";

const Box = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-red-300  h-30 flex flex-col items-center justify-center gap-2 p-6">
      <span className="text-3xl">{icon}</span>
      <span className="capitalize">{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default Box;
