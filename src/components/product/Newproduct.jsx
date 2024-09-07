import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProducts } from "../../features/productSlice";
import { getAccessToken } from "../../utils/utilities";

const categories = [
  "resume",
  "sender",
  "leads",
  "rdp",
  "attachment",
  "social",
  "office",
  "smtp",
  "financial",
  "drainer",
  "video",
  "redirect",
  "malware",
  "cookie",
  "extractor",
  "bank",
  "developer",
  "paid",
  "updated",
  "2fa",
  "class",
];

const Productmodal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    category: "",
    price: "",
  };

  const [form, setForm] = useState(initialState);
  const [descriptions, setDescriptions] = useState([]);
  const [features, setFeatures] = useState([]);

  const accessToken = getAccessToken();

  const {
    createProductLoading,
    createProductError,
    createProductSuccess,
    products,
  } = useSelector((state) => state.product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const feature = e.target.value;
      if (feature && !features.includes(feature)) {
        setFeatures((prev) => [...prev, feature]);
        e.target.value = "";
      }
    }
  };

  const handleDescChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const description = e.target.value;
      if (description && !descriptions.includes(description)) {
        setDescriptions((prev) => [...prev, description]);
        e.target.value = ""; // clear input after adding
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      price: form.price,
      category: form.category,
      features: features,
      descriptions: descriptions,
    };
    dispatch(createProduct(data));
  };

  useEffect(() => {
    if (createProductSuccess) {
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    }
  }, [createProductSuccess, closeModal]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken]);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="p-6 bg-white shadow rounded-md lg:max-w-[600px] mx-auto">
        <div
          onClick={closeModal}
          className="flex justify-end items-center gap-2 underline cursor-pointer"
        >
          <small>Close</small>
          <MdClose />
        </div>
        <form className="flex flex-col gap-4 text-xs font-medium">
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              className="w-full border text-xs font-mono p-2"
              value={form.name}
              onChange={handleChange}
              name="name"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              className="w-full border text-xs font-mono p-2"
              value={form.category}
              onChange={handleChange}
              name="category"
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
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              className="w-full border text-xs font-mono p-2"
              value={form.price}
              onChange={handleChange}
              name="price"
              placeholder="$0.00"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <div className="flex items-center gap-2">
              <input
                id="description"
                className="w-full border text-xs font-mono p-2"
                onKeyDown={handleDescChange}
                placeholder="Enter description"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => {
                  const descInput = document.getElementById("description");
                  const description = descInput.value;
                  if (description && !descriptions.includes(description)) {
                    setDescriptions((prev) => [...prev, description]);
                    descInput.value = ""; // clear input after adding
                  }
                }}
                className="bg-red-500 text-white rounded-sm py-2 px-5"
              >
                Add
              </button>
            </div>
            <div className="p-2 flex flex-col gap-1 bg-slate-50 mt-2 text-xs font-thin">
              {descriptions?.length > 0
                ? descriptions?.map((des, index) => {
                    return <span key={index}>{des}</span>;
                  })
                : "No descriptions"}
            </div>
          </div>

          <div>
            <label htmlFor="feature">Features</label>
            <div className="flex items-center gap-2">
              <input
                id="feature"
                className="w-full border text-xs font-mono p-2"
                onKeyDown={handleFeatureChange}
                placeholder="Enter feature"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => {
                  const featureInput = document.getElementById("feature");
                  const feature = featureInput.value;
                  if (feature && !features.includes(feature)) {
                    setFeatures((prev) => [...prev, feature]);
                    featureInput.value = ""; // clear input after adding
                  }
                }}
                className="bg-red-500 text-white rounded-sm py-2 px-5"
              >
                Add
              </button>
            </div>
            <div className="p-2 flex flex-col gap-1 bg-slate-50 mt-2 text-xs font-thin">
              {features?.length > 0
                ? features?.map((ft, index) => {
                    return <span key={index}>{ft}</span>;
                  })
                : "No features"}
            </div>
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
