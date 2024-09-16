import React from "react";
import { useParams } from "react-router-dom";

const Completeorder = () => {
  // Use useParams to get the URL parameters
  const { id } = useParams();

  return (
    <div>
      <h1>Complete Order</h1>
      <p>Order ID: {id}</p>
    </div>
  );
};

export default Completeorder;
