import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";

const header = [
  {
    id: "amt",
    name: "amount",
  },
  {
    id: "cid",
    name: "creator ID",
  },
  {
    id: "type",
    name: "type",
  },
  {
    id: "status",
    name: "status",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [myProducts, setmyProducts] = useState([]);
  //   const { getTransactionError, getTransactionLoading, trnxs } = useSelector(
  //     (state) => state.trnx
  //   );

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      //   dispatch(getTrnxs());
    }
  }, [accessToken]);

  //   useEffect(() => {
  //     if (users) {
  //       setMyUsers(users.users);
  //     }
  //   }, [users]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Products</h3>
      <div>
        <Datatable headers={header} data={myProducts} />
      </div>
    </div>
  );
};

export default Products;
