import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/productSlice";

const Productmodal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    category: "",
    features: "",
    description: "",
    price: "",
  };

  const [form, setForm] = useState(initialState);

  const { createProductLoading, createProductError, createProductSuccess } =
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
    dispatch(createProduct(form));
  };

  useEffect(() => {
    if (createProductSuccess) {
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    }
  }, [createProductSuccess, closeModal]);

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
              className="w-full border capitalize text-xs font-mono p-2"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div>
            <label htmlFor="">Category</label>
            <input
              type="text"
              className="w-full border capitalize text-xs font-mono p-2"
              value={form.category}
              onChange={handleChange}
              name="category"
            />
          </div>

          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="w-full border capitalize text-xs font-mono p-2"
              value={form.price}
              onChange={handleChange}
              name="price"
              placeholder="$0.00"
            />
          </div>

          <div>
            <label htmlFor="">Description</label>
            <textarea
              className="w-full border capitalize text-xs font-mono p-2"
              rows={8}
              value={form.description}
              onChange={handleChange}
              name="description"
              placeholder="e.g good, bad, fail"
            ></textarea>
          </div>

          <div>
            <label htmlFor="">Features</label>
            <textarea
              className="w-full border capitalize text-xs font-mono p-2"
              rows={8}
              value={form.features}
              onChange={handleChange}
              name="features"
              placeholder="e.g good, bad, fail"
            ></textarea>
          </div>
          {createProductError && (
            <p className="text-red-500 bg-red-600 bg-opacity-20 p-2 rounded-md">
              {createProductError}
            </p>
          )}
          {createProductSuccess && (
            <p className="text-green-500 bg-green-600 bg-opacity-20 p-2 rounded-md">
              {`Product ${form.name} added`}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white w-full p-2 hover:bg-blue-700"
          >
            {createProductLoading ? "Creating product..." : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Productmodal;
