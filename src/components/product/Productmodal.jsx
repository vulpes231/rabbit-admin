import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const Productmodal = ({ rowData, closeModal }) => {
  // console.log(rowData);
  const initialState = {};
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="p-6 bg-white shadow rounded-md">
        <div
          onClick={closeModal}
          className="flex justify-end items-center gap-2 underline cursor-pointer"
        >
          <small>close</small>
          <MdClose />
        </div>
        <form action="" className="flex flex-col gap-4 text-xs font-medium">
          <div>
            <label htmlFor="">ProductName</label>
            <input
              type="text"
              readOnly
              value={rowData.name}
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
            <input
              type="text"
              readOnly
              value={rowData.category}
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              readOnly
              value={rowData.price}
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          {rowData?.features.length ? (
            <div>
              <label htmlFor="">Description</label>

              <textarea
                className="w-full border capitalize text-xs font-mono p-2"
                readOnly
                rows={8}
                value={rowData?.description}
              ></textarea>
            </div>
          ) : null}
          {rowData?.features.length ? (
            <div>
              <label htmlFor="">Features</label>
              <textarea
                className="w-full border capitalize text-xs font-mono p-2"
                readOnly
                rows={8}
                value={rowData?.features ? rowData.features : "None"}
              ></textarea>
            </div>
          ) : null}
          <button className="bg-blue-500 text-white w-full p-2">
            Update product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Productmodal;
