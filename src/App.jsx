import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Content, Navbar } from "./components";
import {
  Dashboard,
  Signup,
  Transactions,
  Wallets,
  Users,
  Orders,
  Products,
  Tickets,
} from "./pages";
import { getAccessToken } from "./utils/utilities";
import Chat from "./pages/Chat";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const accessToken = getAccessToken();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleActiveLink = (linkId) => {
    console.log(linkId);
    setActiveLink(linkId);
  };

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, [accessToken]);

  return (
    <div>
      {!token && <Navbar />}
      <div className="flex">
        <div className={`w-[250px] bg-white text-[#333]`}>
          <Sidebar activeLink={activeLink} handleLink={handleActiveLink} />
        </div>

        <div
          className={`flex-1 ${
            toggle ? "w-[calc(100% - 250px)]" : "w-full"
          } bg-slate-100 p-6 min-h-screen`}
        >
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dash" element={<Dashboard toggle={toggle} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
