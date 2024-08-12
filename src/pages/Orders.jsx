import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orderSlice";

const header = [
  {
    id: "item",
    name: "item",
  },
  {
    id: "_id",
    name: "orderID",
  },
  {
    id: "creator",
    name: "OrderedBy",
  },
  {
    id: "price",
    name: "price",
  },
  {
    id: "status",
    name: "status",
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [myOrders, setmyOrders] = useState([]);

  const { orderError, orderLoading, orders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getOrders());
    }
  }, [accessToken]);

  // console.log(orders);

  useEffect(() => {
    if (orders) {
      setmyOrders(orders.orders);
    }
  }, [orders]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Orders</h3>
      <div>
        <Datatable
          headers={header}
          data={myOrders}
          title={"Edit"}
          customClass={
            "bg-green-600 text-white px-5 py-2 inline-flex rounded-md hover:bg-green-700"
          }
        />
      </div>
    </div>
  );
};

export default Orders;
