import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utilities";
import {
	getAllAddresses,
	resetAddressUpdate,
	updateAddress,
} from "../features/addressSlice";
import { style } from "../constants";

const headers = [
	{ id: "coinName", name: "Currency" },
	{ id: "network", name: "Network" },
	{ id: "address", name: "Address" },
	{ id: "actions", name: "Actions" },
];

const Adminwallet = () => {
	const dispatch = useDispatch();
	const [myAddresses, setMyAddress] = useState([]);
	const { addresses, updateAddressError, addressUpdated } = useSelector(
		(state) => state.address
	);
	const accessToken = getAccessToken();

	// Initialize state for storing address edits and individual loading states
	const [editedAddresses, setEditedAddresses] = useState({});
	const [loadingStates, setLoadingStates] = useState({});

	const handleAddress = (rowId) => {
		const formData = { address: editedAddresses[rowId] || "" };
		// Set the loading state for the specific row
		setLoadingStates((prev) => ({ ...prev, [rowId]: true }));

		// Dispatch the update action
		dispatch(updateAddress({ rowId, formData }));
	};

	const handleInput = (rowId, e) => {
		const { value } = e.target;
		setEditedAddresses((prev) => ({
			...prev,
			[rowId]: value,
		}));
	};

	useEffect(() => {
		if (addressUpdated) {
			dispatch(resetAddressUpdate());
			// Reset the loading state after the update
			setLoadingStates({});
		}
	}, [addressUpdated]);

	useEffect(() => {
		if (accessToken) {
			dispatch(getAllAddresses());
		}
	}, [accessToken, dispatch]);

	useEffect(() => {
		if (addresses) {
			setMyAddress(addresses);
		}
	}, [addresses]);

	useEffect(() => {
		document.title = "Admin - Wallet Addresses";
	}, []);

	return (
		<div className="p-6">
			<h3 className={style.title}>Addresses</h3>
			<div className="overflow-x-auto rounded-xl shadow-md">
				<table className="min-w-full bg-white border border-gray-200">
					<thead className="bg-red-500 text-white">
						<tr>
							{headers.map((hd) => (
								<th
									key={hd.id}
									className="py-3 px-5 border-b border-red-400 text-left text-xs font-semibold tracking-wider uppercase"
								>
									{hd.name}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{myAddresses?.map((add) => (
							<tr
								key={add._id}
								className="hover:bg-gray-50 transition-colors duration-150"
							>
								<td className="py-3.5 px-5 border-b border-gray-200 capitalize text-gray-700">
									{add.coinName}
								</td>
								<td className="py-3.5 px-5 border-b border-gray-200 uppercase text-gray-600 text-sm">
									{add.network}
								</td>
								<td className="py-3.5 px-5 border-b border-gray-200">
									<input
										type="text"
										onChange={(e) => handleInput(add._id, e)}
										value={editedAddresses[add._id] || add.address}
										name="address"
										placeholder={add.address}
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring focus:ring-red-100 outline-none transition duration-150"
									/>
								</td>
								<td className="py-3.5 px-5 border-b border-gray-200">
									<button
										onClick={() => handleAddress(add._id)}
										disabled={loadingStates[add._id]}
										className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-150"
									>
										{loadingStates[add._id] ? "Wait..." : "Save"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Adminwallet;
