import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orderSlice";
import Datatable from "../components/Datatable";
import { style } from "../constants";

const header = [
	// { id: "_id", name: "orderID" },
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
			const sortedOrders = [...orders?.orders].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setMyOrders(sortedOrders);
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

	const handleModal = (row) => {
		// console.log(row.status);
		setTrnxId(row._id);
		setStatus(row.status);
		setConfirmModal(true);
	};

	return (
		<div>
			<h3 className={style.title}>Orders</h3>
			<div>
				<Datatable
					headers={header}
					data={myOrders}
					title={"Complete"}
					// handleClick={handleModal}
					customClass={
						"bg-green-600 text-white px-5 py-2 inline-flex rounded-md hover:bg-green-700"
					}
				/>
			</div>
		</div>
	);
};

export default Orders;
