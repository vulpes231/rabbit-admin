import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orderSlice";

const header = [
  { id: "_id", name: "orderID" },
  { id: "item", name: "item" },
  { id: "customerEmail", name: "contact" },
  { id: "qty", name: "quantity" },
  { id: "price", name: "price" },
  { id: "status", name: "status" },
];

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [myOrders, setMyOrders] = useState([]);

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getOrders());
    }
  }, [accessToken, dispatch, navigate]);

  useEffect(() => {
    if (orders) {
      setMyOrders(orders?.orders);
    }
  }, [orders]);

  useEffect(() => {
    document.title = "Admin - Orders";
  }, []);

  const handleOptionChange = (e, order) => {
    const action = e.target.value;
    const id = order._id;

    if (action === "complete") {
      navigate(`/complete/${id}`);
    } else if (action === "ticket") {
      navigate(`/chat/?orderId=${id}`); // Assuming there's a chat page route
    }
  };

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Orders</h3>
      <div>
        <table className="min-w-full bg-white divide-y-2 shadow-xl">
          <thead className="text-left ">
            <tr className="bg-red-500 text-white capitalize">
              {header.map((hd) => (
                <th className="px-6 py-2" key={hd.id}>
                  {hd.name}
                </th>
              ))}
              <th className="px-6 py-2">actions</th>
            </tr>
          </thead>
          <tbody className="min-w-full overflow-auto">
            {myOrders?.map((ord) => (
              <tr key={ord._id}>
                <td className="px-6 py-3">{ord._id}</td>
                <td className="px-6 py-3">{ord.item}</td>
                <td className="px-6 py-3">{ord.customerEmail}</td>
                <td className="px-6 py-3">{ord.qty}</td>
                <td className="px-6 py-3">{ord.price * ord.qty}</td>
                <td className="px-6 py-3 capitalize">{ord.status}</td>
                <td className="px-6 py-3">
                  <select
                    onChange={(e) => handleOptionChange(e, ord)}
                    defaultValue=""
                    className="bg-white capitalize"
                  >
                    <option value="" disabled>
                      choose action
                    </option>
                    <option value="ticket">open ticket</option>
                    <option value="complete">complete order</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
