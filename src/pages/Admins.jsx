import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../features/adminSlice";
import { Createadmin } from ".";
import { style } from "../constants";

const headers = [
	{
		id: "username",
		name: "Username",
	},
	{
		id: "email",
		name: "Email",
	},
	{
		id: "superUser",
		name: "isSuperUser",
	},
	{
		id: "role",
		name: "Role",
	},
];

const Admins = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = getAccessToken();
	const { admins } = useSelector((state) => state.admin);
	const [showCreateAdmin, setShowCreateAdmin] = useState(false);

	const [myAdmins, setMyAdmins] = useState([]);

	const handleCreateAdmin = () => {
		console.log("clicked");
		setShowCreateAdmin(true);
	};
	const closeCreateAdmin = () => {
		// console.log("clicked");
		setShowCreateAdmin(false);
	};

	useEffect(() => {
		if (accessToken) {
			dispatch(getAdmins());
		}
	}, [dispatch, accessToken]);

	useEffect(() => {
		if (admins) {
			setMyAdmins(admins?.admins);
		}
	}, [admins]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h3 className={style.title}>Admins</h3>
				<button
					onClick={handleCreateAdmin}
					className="h-[40px] w-[129px] whitespace-nowrap font-semibold text-[14px] bg-red-500 text-white rounded-[5px] "
				>
					Create admin
				</button>
			</div>
			<div className="overflow-x-auto rounded-xl shadow-md">
				<table className="min-w-full text-center border border-gray-200">
					<thead className="bg-red-500 text-white uppercase text-xs font-semibold tracking-wider">
						<tr>
							{headers.map((hd, index) => (
								<th key={index} className="px-4 py-3 border-b border-red-400">
									{hd.name}
								</th>
							))}
							<th className="px-4 py-3 border-b border-red-400">Actions</th>
						</tr>
					</thead>
					<tbody>
						{myAdmins?.map((adm, index) => (
							<tr
								key={index}
								className={`${
									index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
								} hover:bg-slate-300 transition-colors duration-150`}
							>
								<td className="capitalize px-4 py-3 text-gray-700">
									{adm.username}
								</td>
								<td className="px-4 py-3 text-gray-600 text-sm">
									{adm.email || `${adm.role}@rabbithole4og.com`}
								</td>
								<td className="px-4 py-3 text-gray-700">
									{adm.superUser ? "True" : "False"}
								</td>
								<td className="capitalize px-4 py-3 text-gray-700">
									{adm.role}
								</td>
								<td className="px-4 py-3">
									<button
										// onClick={handleCreateAdmin}
										className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors duration-150"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{showCreateAdmin && <Createadmin close={closeCreateAdmin} />}
			</div>
		</div>
	);
};

export default Admins;
