import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../features/ticketSlice";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";

const headers = [
  { id: 1, name: "createdBy" },
  { id: 2, name: "user" },
  { id: 3, name: "orderID" },
  { id: 4, name: "status" },
  { id: 5, name: "actions" },
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

        // Example: Dispatch an action if needed
        // dispatch(someAction({ ticketId: ticket._id, action }));

        // Clear the selected action after handling
        setSelectedAction(null);
      }
    }
  }, [selectedAction, dispatch]);

  return (
    <div className="p-6 text-xs font-medium">
      <h3>Tickets</h3>
      <table className="min-w-full divide-gray-50 bg-white shadow-xl">
        <thead className="bg-slate-200">
          <tr>
            {headers.map((header) => (
              <th
                className="px-6 py-2 text-left font-medium capitalize"
                key={header.id}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-thin">
          {tickets?.tickets?.map((ticket) => (
            <tr key={ticket._id}>
              <td className="px-6 py-2.5">{ticket.createdBy}</td>
              <td className="px-6 py-2.5">{ticket.user || "None"}</td>
              <td className="px-6 py-2.5">{ticket.orderId}</td>
              <td className="px-6 py-2.5">
                <span
                  className={
                    ticket.status === "open"
                      ? "bg-green-200 text-green-500 rounded-3xl px-4 py-1.5 capitalize "
                      : "bg-red-200 text-red-500 rounded-3xl px-4 py-1.5 capitalize"
                  }
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-2.5">
                <select
                  onChange={(e) => handleOptionChange(e, ticket)}
                  value={
                    selectedAction?.ticket._id === ticket._id
                      ? selectedAction.action
                      : ""
                  }
                  className="bg-transparent border px-2 py-1.5 border-slate-900 text-center"
                >
                  <option value="">actions</option>
                  <option value="open">open ticket</option>
                  <option value="close">close ticket</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
