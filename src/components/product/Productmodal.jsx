import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../features/productSlice";

const categories = [
  "service",
  "office365",
  "sender",
  "resume",
  "drainer",
  "social account",
  "rdp",
  "2fa",
  "link",
  "attachment",
  "tutorial",
];

const initialState = {
  price: "",
  name: "",
  category: "",
};

const Productmodal = ({ rowData, closeModal }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const { editProductLoading, editProductError, editProductSuccess } =
    useSelector((state) => state.product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(editProduct(form));
  };

  useEffect(() => {
    let timeout;
    if (editProductSuccess) {
      timeout = 2000;
      setTimeout(() => {
        window.location.reload();
      }, editProductSuccess);
    }
  }, [editProductSuccess]);

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
        <form className="flex flex-col gap-4 text-xs font-medium">
          <div>
            <label htmlFor="">{rowData.name}</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border capitalize text-xs font-mono p-2 bg-transparent"
            >
              <option value="">choose category</option>
              {categories.map((cat, index) => {
                return (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">{rowData.price || "No price set"}</label>
            <input
              type="text"
              value={form.price}
              onChange={handleChange}
              name="price"
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
          {editProductError && (
            <p className="text-red-500">{editProductError}</p>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white w-full p-2"
          >
            {!editProductLoading ? " Update product" : "wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Productmodal;
