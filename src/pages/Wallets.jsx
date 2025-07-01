import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import {
	getAllWallets,
	resetUnSuspend,
	suspendWallet,
	unSuspendWallet,
} from "../features/walletSlice";
import { useDispatch, useSelector } from "react-redux";

const header = [
	{
		id: "_id",
		name: "id",
	},
	// {
	//   id: "owner",
	//   name: "owner",
	// },
	{
		id: "ownerEmail",
		name: "Email",
	},
	{
		id: "balance",
		name: "balance",
	},
];

const Wallets = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const accessToken = getAccessToken();
	const [myWallets, setMyWallets] = useState([]);
	const [unBanModal, setUnBanModal] = useState(false);

	const {
		getWalletsError,
		getWalletsLoading,
		wallets,
		suspendLoading,
		suspendError,
		suspended,
		unSuspendLoading,
		unSuspendError,
		unSuspended,
	} = useSelector((state) => state.wallet);

	const [walletId, setWalletId] = useState(false);
	const [unBanId, setUnbanId] = useState(false);

	const confirmBan = (row) => {
		setWalletId(row._id);
		console.log(row);
	};

	const banWallet = (e) => {
		e.preventDefault();
		dispatch(suspendWallet(walletId));
	};

	const handleUnbanModal = (row) => {
		console.log(row);
		setUnbanId(row._id);
	};

	const liftWalletBan = (e) => {
		e.preventDefault();
		dispatch(unSuspendWallet(unBanId));
	};

	const closeConfirm = () => {
		setWalletId(false);
	};
	const closeUnban = () => {
		setUnbanId(false);
	};

	useEffect(() => {
		if (suspended) {
			window.location.reload();
		}
	}, [suspended]);

	useEffect(() => {
		if (unSuspended) {
			window.location.reload();
		}
	}, [unSuspended]);

	useEffect(() => {
		if (!accessToken) {
			navigate("/");
		} else {
			dispatch(getAllWallets());
		}
	}, [accessToken]);

	useEffect(() => {
		if (wallets) {
			setMyWallets(wallets.wallets);
		}
	}, [wallets]);

	if (getWalletsLoading) {
		return <p className="mt-5">Getting wallets...</p>;
	}

	useEffect(() => {
		document.title = "Admin - Wallets";
	}, []);

	useEffect(() => {
		let timeout;
		if (unSuspendError) {
			timeout = 2000;
			setTimeout(() => {
				resetUnSuspend();
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [unSuspendError]);

	useEffect(() => {
		let timeout;
		if (suspendError) {
			timeout = 2000;
			setTimeout(() => {
				resetUnSuspend();
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [suspendError]);

	const btnTitle = "suspend";

	return (
		<div>
			<h3 className="font-bold text-lg p-4">Wallets</h3>
			<div>
				<Datatable
					headers={header}
					data={myWallets}
					title={btnTitle}
					handleClick={confirmBan}
					customClass={`text-white px-4 py-2.5 rounded-lg ${
						btnTitle == "suspend" ? "bg-yellow-500" : "bg-gray-500"
					}`}
					handleUnban={handleUnbanModal}
				/>
				{walletId && (
					<div className="top-0 right-0 absolute p-6 bg-white shadow-xl m-6 rounded-lg ">
						<p>confirm wallet suspension</p>
						{suspendError && (
							<p className="text-xs text-red-500">{suspendError}</p>
						)}
						<div className="flex justify-between text-white">
							<button onClick={banWallet} className="bg-green-500 px-6 py-1.5">
								{!suspendLoading ? "yes" : "wait..."}
							</button>
							<button
								onClick={closeConfirm}
								className="bg-gray-500 px-6 py-1.5"
							>
								no
							</button>
						</div>
					</div>
				)}

				{unBanId && (
					<div className="top-0 right-0 absolute p-6 bg-white shadow-xl m-6 rounded-lg flex flex-col gap-3">
						<p>
							Do you want to lift the ban <br /> on this wallet?
						</p>
						{unSuspendError && (
							<p className="text-xs text-red-500">{unSuspendError}</p>
						)}
						<div className="flex justify-between text-white">
							<button
								onClick={liftWalletBan}
								className="bg-green-500 px-6 py-1.5"
							>
								{!unSuspendLoading ? "yes" : "wait..."}
							</button>
							<button onClick={closeUnban} className="bg-gray-500 px-6 py-1.5">
								no
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wallets;
