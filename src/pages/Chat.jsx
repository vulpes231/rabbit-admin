import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getTicketData } from "../features/ticketSlice";
import { getChatByTicketId } from "../features/chatSlice";
import { getAccessToken } from "../utils/utilities";
import { devServer } from "../constants";
import { MdSend } from "react-icons/md";

const initialState = {
  msg: "",
};

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const accessToken = getAccessToken();

  const { ticketData } = useSelector((state) => state.ticket);
  const { chatMessages } = useSelector((state) => state.chat);

  const [admin, setAdmin] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getAdmin = JSON.parse(sessionStorage.getItem("admin"));

    if (getAdmin) {
      setAdmin(getAdmin);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      return;
    }

    dispatch(getTicketData(orderId));
  }, [accessToken, dispatch, navigate, orderId]);

  useEffect(() => {
    if (ticketData) {
      setChatId(ticketData.ticket._id);
      dispatch(getChatByTicketId(ticketData.ticket._id));
    }
  }, [ticketData, dispatch]);

  useEffect(() => {
    const socketConnection = io(devServer);
    setSocket(socketConnection);

    socketConnection.on("newMessage", (message) => {
      dispatch(getChatByTicketId(chatId));
    });

    return () => {
      socketConnection.disconnect(); // Clean up on component unmount
    };
  }, [devServer, dispatch, chatId]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit("joinChat", chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (form.msg.trim() === "") return;

    const data = {
      msg: form.msg,
      chatId: chatId,
      username: admin?.username,
    };

    if (socket) {
      socket.emit("sendMessage", data);
    }

    setForm(initialState);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage(e);
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-slate-50 w-full h-screen flex justify-end">
      <div className="flex flex-col gap-1 w-[60%]">
        <ul className="p-6 flex flex-col gap-4 shadow-lg overflow-x-hidden overflow-y-auto h-[400px]">
          {chatMessages?.messages?.map((msg) => (
            <li
              className="flex flex-col text-xs font-medium bg-green-100 p-3 w-full lg:w-[300px] rounded-sm"
              key={msg._id}
            >
              <small className="font-thin text-slate-500">{msg.from}</small>
              <p className="text-md">{msg.msg}</p>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
        <form onSubmit={sendChatMessage} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 relative">
            <textarea
              id="msg"
              cols={10}
              rows={1}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={form.msg}
              name="msg"
              className="focus:border-2 focus:border-red-500 outline-none border p-2"
              placeholder="Type your message here..."
            />
            <span className="absolute right-[10px] top-[13px]">
              <MdSend />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
