import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";
import { deleteProduct, getProducts } from "../features/productSlice";
import { FaPlusCircle } from "react-icons/fa";
import Productmodal from "../components/product/Productmodal";
import Newproduct from "../components/product/Newproduct";
import Deletemodal from "../components/product/Deletemodal";
const header = [
  {
    id: "_id",
    name: "id",
  },
  {
    id: "name",
    name: "name",
  },
  {
    id: "price",
    name: "price",
  },
  {
    id: "category",
    name: "category",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [myProducts, setmyProducts] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState(null);

  const { getProductError, getProductLoading, products } = useSelector(
    (state) => state.product
  );

  const showModal = (row) => {
    setRowData(row);
    setShowProductModal(true);
  };

  const showDel = (row) => {
    // setRowData(row);
    console.log(row);
    setId(row._id);
    setdeleteModal(true);
  };

  const createNewProduct = (row) => {
    setCreateProductModal(true);
  };

  const closeModal = () => {
    setShowProductModal(false);
  };

  const closeDel = () => {
    setdeleteModal(false);
  };

  const closeCreateModal = () => {
    setCreateProductModal(false);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getProducts());
    }
  }, [accessToken]);

  useEffect(() => {
    if (products) {
      setmyProducts(products.products);
    }
  }, [products]);

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h3 className="font-bold text-lg p-4">Products</h3>
        <button
          onClick={createNewProduct}
          className=" text-white items-center gap-1 capitalize text-xs font-medium bg-green-600 inline-flex px-6 py-3 rounded-md mr-10 hover:bg-green-700"
        >
          <FaPlusCircle /> create product
        </button>
      </div>
      <div>
        <Datatable
          headers={header}
          data={myProducts}
          title={"Edit"}
          handleClick={showModal}
          customClass={
            "bg-blue-500 text-white px-5 py-2 inline-flex rounded-md border border-blue-500 hover:bg-blue-700"
          }
          deleteBtn={"delete"}
          cusClass={
            "bg-red-500 text-white px-5 py-2 inline-flex rounded-md border border-red-500 hover:bg-red-700"
          }
          handleDelete={showDel}
        />
      </div>
      {showProductModal && (
        <Productmodal rowData={rowData} closeModal={closeModal} />
      )}
      {createProductModal && <Newproduct closeModal={closeCreateModal} />}
      {deleteModal && <Deletemodal closeModal={closeDel} id={id} />}
    </div>
  );
};

export default Products;
