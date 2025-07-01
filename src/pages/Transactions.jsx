import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
	completeTransaction,
	getTrnxs,
	resetComplete,
} from "../features/trnxSlice";

const CompleteError = ({ error }) => {
	return <div className="absolute bottom-10 right-[10px] p-6">{error}</div>;
};

const header = [
	{
		id: "_id",
		name: "_id",
	},
	{
		id: "amount",
		name: "amount",
	},
	{
		id: "userEmail",
		name: "userEmail",
	},
	{
		id: "currency",
		name: "currency",
	},
	{
		id: "status",
		name: "status",
	},
];

const Transactions = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = getAccessToken();
	const [myTrnxs, setMyTrnxs] = useState([]);
	const [confirmModal, setConfirmModal] = useState(false);
	const [trnxId, setTrnxId] = useState(null);
	const [status, setStatus] = useState(null);

	const {
		getTransactionError,
		getTransactionLoading,
		trnxs,
		completeTrnxError,
		completeTrnxLoading,
		trnxCompleted,
	} = useSelector((state) => state.trnx);

	const handleModal = (row) => {
		// console.log(row.status);
		setTrnxId(row._id);
		setStatus(row.status);
		setConfirmModal(true);
	};

	const closeModal = () => {
		setTrnxId(null);
		setConfirmModal(false);
	};

	const approveTrnx = () => {
		const data = {
			transactionId: trnxId,
		};
		dispatch(completeTransaction(data));
		console.log(data);
	};

	useEffect(() => {
		if (!accessToken) {
			navigate("/");
		} else {
			dispatch(getTrnxs());
		}
	}, [accessToken]);

	useEffect(() => {
		if (trnxs) {
			// console.log(trnxs);
			const sortedTrnxs = [...trnxs?.trnx].sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);
			setMyTrnxs(sortedTrnxs);
		}
	}, [trnxs]);

	useEffect(() => {
		let timeout;
		if (trnxCompleted) {
			timeout = 3000;
			setTimeout(() => {
				setConfirmModal(false);
				dispatch(resetComplete());
				window.location.reload();
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [trnxCompleted]);

	useEffect(() => {
		let timeout;
		if (completeTrnxError) {
			timeout = 3000;
			setTimeout(() => {
				setConfirmModal(false);
				dispatch(resetComplete());
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [completeTrnxError]);

	if (getTransactionLoading) {
		return <p className="mt-5">Getting transactions...</p>;
	}

	useEffect(() => {
		document.title = "Admin - Transactions";
	}, []);

	return (
		<div>
			<h3 className="font-bold text-lg p-4">Transactions</h3>
			<div>
				<Datatable
					headers={header}
					data={myTrnxs}
					title={"Approve"}
					handleClick={handleModal}
					customClass={
						"bg-green-600 text-white px-5 py-2 inline-flex rounded-md hover:bg-green-700"
					}
				/>
			</div>
			{completeTrnxError && <CompleteError error={completeTrnxError} />}
			{confirmModal && (
				<div className="fixed top-[20px] right-0 flex flex-col p-6 gap-4 bg-white rounded-xl shadow w-[250px]">
					<p
						className={`text-xs font-medium ${
							trnxCompleted ? "text-green-500" : "text-slate-950"
						}`}
					>
						{trnxCompleted
							? "Deposit confirmed."
							: "Are you sure you want to approve?"}
					</p>
					<div className="flex items-center justify-between w-full">
						<button
							onClick={approveTrnx}
							disabled={status === "completed"}
							className="py-2 px-5 rounded-lg inline-flex bg-green-500 capitalize hover:bg-green-600 font-medium text-xs text-white"
						>
							{!completeTrnxLoading ? "yes" : "wait..."}
						</button>
						<button
							onClick={closeModal}
							className="py-2 px-5 rounded-lg inline-flex bg-red-500 hover:bg-red-600 capitalize font-medium text-xs text-white"
						>
							no
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Transactions;
