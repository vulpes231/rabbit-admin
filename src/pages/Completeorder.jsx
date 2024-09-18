import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { confirmOrder, getSingleOrder } from "../features/orderSlice";

const CompleteOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, confirmOrderLoading, confirmOrderError, confirmOrderSuccess } =
    useSelector((state) => state.order);

  const accessToken = getAccessToken();
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    orderDetails: "",
  });
  // const [error, setError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf")
    ) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image (JPEG/PNG) or PDF file.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      orderDetails: form.orderDetails,
      attachment: selectedFile,
    };
    dispatch(confirmOrder({ orderId: id, formData: data }));
  };

  useEffect(() => {
    let timeout;
    if (confirmOrderSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [confirmOrderSuccess]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getSingleOrder(id));
    }
  }, [accessToken, dispatch, id]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Complete Order</h1>
      <div className="mb-4">
        <p className="font-medium">
          Order ID: <span className="font-normal">{order?.order?._id}</span>
        </p>
        <p className="font-medium">
          Product: <span className="font-normal">{order?.order?.item}</span>
        </p>
        <p className="font-medium">
          Price: <span className="font-normal">{order?.order?.price}</span>
        </p>
        <p className="font-medium">
          Customer Name:{" "}
          <span className="font-normal">{order?.order?.customerName}</span>
        </p>
        <p className="font-medium">
          Customer Contact:{" "}
          <span className="font-normal">{order?.order?.customerEmail}</span>
        </p>
      </div>
      <h5 className="text-lg font-semibold mb-2">Enter the item details</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="productDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Product Details:
          </label>
          <textarea
            name="orderDetails"
            value={form.orderDetails}
            onChange={handleInput}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700"
          >
            Attach File (Image or PDF):
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {confirmOrderError && (
          <p className="bg-red-100 text-red-500 p-2">{confirmOrderError}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          {!confirmOrderLoading ? "Complete order" : "Wait.."}
        </button>
      </form>
    </div>
  );
};

export default CompleteOrder;
