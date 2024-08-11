import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getTicketData } from "../features/ticketSlice";
import { getChatByTicketId } from "../features/chatSlice";
import { getAccessToken } from "../utils/utilities";
import { devServer, liveServer } from "../constants";
import { MdSend } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

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
    document.title = "RH4OGS - LIVE CHAT";
  });

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
    const socketConnection = io(liveServer);
    setSocket(socketConnection);

    socketConnection.on("newMessage", (message) => {
      dispatch(getChatByTicketId(chatId));
    });

    return () => {
      socketConnection.disconnect();
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
    <div className="fixed bottom-0 left-0 w-full h-full lg:w-[360px] lg:h-[600px] lg:bottom-4 lg:left-4 lg:right-auto lg:top-auto lg:relative bg-slate-50 shadow-lg border border-gray-200 rounded-lg flex flex-col">
      <header className="bg-blue-500 text-white p-3 flex items-center justify-between lg:mt-10">
        <h1 className="text-lg font-semibold">Live Chat</h1>
        <button className="" onClick={() => navigate(-1)}>
          <IoMdClose size={24} />
        </button>
      </header>
      <ul className="flex flex-col gap-4 p-4 overflow-y-auto flex-grow">
        {chatMessages?.messages?.map((msg) => (
          <li
            className={`flex flex-col text-xs font-medium p-3 rounded-sm mb-2 ${
              msg.from === admin?.username
                ? "bg-blue-200 text-end ml-auto w-[80%] items-end"
                : "bg-green-200 text-start mr-auto w-[80%] items-start"
            }`}
            key={msg._id}
          >
            <span>
              <small className="font-thin text-slate-500">{msg.from}</small>
              <p className="text-md">{msg.msg}</p>
            </span>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form
        onSubmit={sendChatMessage}
        className="flex items-center border-t border-gray-300 p-4"
      >
        <textarea
          id="msg"
          cols={10}
          rows={1}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          value={form.msg}
          name="msg"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
          placeholder="Type your message here..."
        />
        <button type="submit" className="ml-2 text-blue-500">
          <MdSend size={24} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
