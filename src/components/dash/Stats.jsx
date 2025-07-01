import React, { useEffect } from "react";
import Box from "./Box";
import { FaUserGroup, FaBoxArchive } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import { getTrnxs } from "../../features/trnxSlice";
import { getUsers } from "../../features/userSlice";
import { FaDatabase } from "react-icons/fa6";
import { AiFillCustomerService, AiFillShopping } from "react-icons/ai";
import { getProducts } from "../../features/productSlice";
import { getOrders } from "../../features/orderSlice";
import { getAllWallets } from "../../features/walletSlice";
import { getAllTickets } from "../../features/ticketSlice";

const Stats = () => {
	const dispatch = useDispatch();
	const accessToken = getAccessToken();
	const { users } = useSelector((state) => state.user);
	const { trnxs } = useSelector((state) => state.trnx);
	const { orders } = useSelector((state) => state.order);
	const { wallets } = useSelector((state) => state.wallet);
	const { products } = useSelector((state) => state.product);
	const { tickets } = useSelector((state) => state.ticket);

	// console.log(tickets);

	useEffect(() => {
		if (accessToken) {
			dispatch(getTrnxs());
			dispatch(getUsers());
			dispatch(getAllWallets());
			dispatch(getProducts());
			dispatch(getOrders());
			dispatch(getAllTickets());
		}
	}, [accessToken, dispatch]);
	return (
		<div className="grid lg:grid-cols-3 gap-4">
			<Box
				icon={<FaUserGroup />}
				title={"users"}
				value={users?.length ? users.length : 0}
			/>
			<Box
				icon={<FaBoxArchive />}
				title={"transactions"}
				value={trnxs?.length ? trnxs.length : 0}
			/>
			<Box
				icon={<MdAdminPanelSettings />}
				title={"wallets"}
				value={wallets?.wallets?.length ? wallets.wallets.length : 0}
			/>
			<Box
				icon={<FaDatabase />}
				title={"orders"}
				value={orders?.orders?.length ? orders.orders.length : 0}
			/>
			<Box
				icon={<AiFillShopping />}
				title={"products"}
				value={products?.products?.length ? products.products.length : 0}
			/>
			<Box
				icon={<AiFillCustomerService />}
				title={"tickets"}
				value={tickets?.length ? tickets.length : 0}
				// value={0}
			/>
		</div>
	);
};

export default Stats;
