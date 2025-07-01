import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";
import { style } from "../constants";

const header = [
	{
		id: "username",
		name: "Username",
	},
	{
		id: "email",
		name: "Email",
	},
	{
		id: "completedOrders",
		name: "Completed Orders",
	},
	// {
	// 	id: "pendingOrders",
	// 	name: "Pending Orders",
	// },
	{
		id: "createdAt",
		name: "Created",
	},
];

const Users = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = getAccessToken();

	const [myUsers, setMyUsers] = useState([]);

	const { getUserError, getUserLoading, users } = useSelector(
		(state) => state.user
	);

	const deleteUser = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (!accessToken) {
			navigate("/");
		} else {
			dispatch(getUsers());
		}
	}, [accessToken]);

	useEffect(() => {
		if (users) {
			// Sort users by createdAt in descending order (newest first)
			const sortedUsers = [...users].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setMyUsers(sortedUsers);
		}
	}, [users]);

	// if (getLoading) {
	//   return <p className="mt-5">Getting users...</p>;
	// }

	useEffect(() => {
		document.title = "Admin - Users";
	}, []);

	return (
		<section>
			<h3 className={style.title}>Users</h3>
			<Datatable
				headers={header}
				data={myUsers}
				title={"Delete"}
				handleClick={deleteUser}
				customClass={
					"bg-red-500 text-white px-5 py-2 inline-flex rounded-md border border-red-500 hover:bg-red-700"
				}
			/>
		</section>
	);
};

export default Users;
