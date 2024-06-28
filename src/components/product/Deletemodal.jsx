import React, { useEffect } from "react";
import { deleteProduct } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Deletemodal = ({ closeModal, id }) => {
  const dispatch = useDispatch();

  const { deleteProductLoading, deleteProductSuccess, deleteProductError } =
    useSelector((state) => state.product);

  const deleteItem = () => {
    console.log(id);
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (deleteProductSuccess) {
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    }
  }, []);
  return (
    <div className="fixed top-0 right-0 p-6 bg-white shadow rounded-md flex flex-col gap-2">
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-between items-center">
        <button
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium text-xs cursor-pointer"
          onClick={deleteItem}
        >
          yes
        </button>
        <button
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs cursor-pointer"
          onClick={closeModal}
        >
          no
        </button>
      </div>
    </div>
  );
};

export default Deletemodal;
