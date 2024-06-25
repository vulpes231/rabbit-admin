import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orderSlice";

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

  useEffect(() => {
    if (users) {
      setmyOrders(orders.orders);
    }
  }, [orders]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Orders</h3>
      <div>
        <Datatable headers={header} data={myOrders} />
      </div>
    </div>
  );
};

export default Orders;
