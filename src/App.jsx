import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, resetLogout } from "./features/logoutSlice";
import { resetLogin } from "./features/loginSlice";
import Completeorder from "./pages/Completeorder";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");
  const accessToken = getAccessToken();

  const { logoutError, logoutLoading, logoutSuccess } = useSelector(
    (state) => state.logout
  );

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleActiveLink = (linkId) => {
    console.log(linkId);
    setActiveLink(linkId);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      setToken(false);
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (logoutSuccess) {
      dispatch(resetLogin());
      sessionStorage.clear();
      dispatch(resetLogout());
    }
  }, [logoutSuccess]);

  return (
    <div>
      {!token && <Navbar />}
      <div className="flex">
        <div className={token ? `w-[250px] bg-white text-[#333]` : "hidden"}>
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
            <Route
              path="/dash"
              element={
                <Dashboard toggle={toggle} handleLogout={handleLogout} />
              }
            />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/complete/:id" element={<Completeorder />} />
          </Routes>
        </div>
        {logoutLoading && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex items-center justify-center">
            <p className="text-white">logging out...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
