import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";
import { getProducts } from "../features/productSlice";
import { FaPlusCircle } from "react-icons/fa";
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
  const { getProductError, getProductLoading, products } = useSelector(
    (state) => state.product
  );

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
        <button className=" text-white items-center gap-1 capitalize text-xs font-medium bg-red-600 inline-flex px-3 py-3 rounded-md mr-10">
          <FaPlusCircle /> create product
        </button>
      </div>
      <div>
        <Datatable headers={header} data={myProducts} />
      </div>
    </div>
  );
};

export default Products;
