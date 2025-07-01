import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../features/ticketSlice";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import Datatable from "../components/Datatable";
import { style } from "../constants";

const headers = [
	{ id: "_id", name: "Ticket ID" },
	{ id: "createdBy", name: "Opened by" },
	{ id: "status", name: "Status" },
];

const Tickets = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedAction, setSelectedAction] = useState(null);

	const { tickets } = useSelector((state) => state.ticket);
	const accessToken = getAccessToken();

	useEffect(() => {
		if (accessToken) {
			dispatch(getAllTickets());
		}
	}, [accessToken, dispatch]);

	const handleOptionChange = (e, ticket) => {
		const { value } = e.target;
		setSelectedAction({ ticket, action: value });
	};

	useEffect(() => {
		if (selectedAction) {
			const { ticket, action } = selectedAction;
			if (action) {
				// Perform the action (open/close) for the selected ticket
				console.log(`${action} action for ticket ${ticket._id}`);
				navigate(`/chat/?orderId=${ticket.orderId}`);

				setSelectedAction(null);
			}
		}
	}, [selectedAction, dispatch]);

	useEffect(() => {
		document.title = "Admin - TIckets";
	}, []);

	return (
		<div className="">
			<h3 className={style.title}>Tickets</h3>

			<Datatable
				headers={headers}
				data={tickets}
				title={"Open"}
				// handleClick={deleteUser}
				customClass={
					"bg-red-500 text-white px-5 py-2 inline-flex rounded-md border border-red-500 hover:bg-red-700"
				}
			/>
		</div>
	);
};

export default Tickets;
