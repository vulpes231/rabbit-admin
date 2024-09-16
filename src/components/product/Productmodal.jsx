import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, resetEditProduct } from "../../features/productSlice";

const categories = [
  "resume",
  "sender",
  "leads",
  "tutorial",
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

const ProductModal = ({ rowData, closeModal }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    price: rowData?.price || "",
    name: rowData?.name || "",
  });
  const [descriptions, setDescriptions] = useState([]);
  const [features, setFeatures] = useState([]);

  const { editProductLoading, editProductError, editProductSuccess } =
    useSelector((state) => state.product);

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
      const feature = e.target.value.trim();
      if (feature && !features.includes(feature)) {
        setFeatures((prev) => [...prev, feature]);
        e.target.value = "";
      }
    }
  };

  const handleDescChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const description = e.target.value.trim();
      if (description && !descriptions.includes(description)) {
        setDescriptions((prev) => [...prev, description]);
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...form,
      descriptions: Array.isArray(descriptions) ? descriptions : [],
      features: Array.isArray(features) ? features : [],
    };
    const id = rowData._id;
    dispatch(editProduct({ id, formData: updatedProduct }));
  };

  useEffect(() => {
    if (editProductSuccess) {
      const timeout = setTimeout(() => {
        window.location.reload();
        dispatch(resetEditProduct());
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [editProductSuccess, closeModal]);

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
        <form
          className="flex flex-col gap-4 text-xs font-medium"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="productName">Product name</label>
            <input
              id="productName"
              type="text"
              value={form.name}
              placeholder="Enter product name"
              onChange={handleChange}
              name="name"
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select className="w-full border capitalize text-xs font-mono p-2 bg-transparent">
              <option value="">{rowData?.category}</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              value={form.price}
              placeholder="Enter price"
              onChange={handleChange}
              name="price"
              className="w-full border capitalize text-xs font-mono p-2"
            />
          </div>
          <div>
            <h3>Descriptions</h3>
            <input
              className="w-full border text-xs font-mono p-2"
              onKeyDown={handleDescChange}
              placeholder="Enter description"
              autoComplete="off"
            />
            <div className="p-2 flex flex-col gap-1 bg-slate-50 mt-2 text-xs font-thin">
              {descriptions.length > 0
                ? descriptions.map((desc, index) => (
                    <span key={index}>{desc}</span>
                  ))
                : "No descriptions"}
            </div>
          </div>
          <div>
            <h3>Features</h3>
            <input
              className="w-full border text-xs font-mono p-2"
              onKeyDown={handleFeatureChange}
              placeholder="Enter feature"
              autoComplete="off"
            />
            <div className="p-2 flex flex-col gap-1 bg-slate-50 mt-2 text-xs font-thin">
              {features.length > 0
                ? features.map((ft, index) => <span key={index}>{ft}</span>)
                : "No features"}
            </div>
          </div>
          {editProductError && (
            <p className="text-red-500">{editProductError}</p>
          )}
          <button type="submit" className="bg-blue-500 text-white w-full p-2">
            {editProductLoading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
