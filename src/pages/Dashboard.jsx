import React, { useEffect, useState } from "react";

import Stats from "../components/dash/Stats";
import { Authnav } from "../components";
import Sidebar from "../components/Sidebar";
import Users from "./Users";
import Transactions from "./Transactions";
import Wallets from "./Wallets";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");

  const admin = JSON.parse(sessionStorage.getItem("admin"));
  // console.log(admin.username);

  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <section className="min-h-screen flex">
      <Sidebar
        toggle={toggle}
        setActiveLink={setActiveLink}
        activeLink={activeLink}
      />
      <div
        className={`flex-1 ${
          toggle ? "w-[calc(100% - 250px)]" : "w-full"
        } bg-slate-50`}
      >
        <div className="p-6">
          <Authnav toggle={toggle} handleToggle={handleToggle} />
          {activeLink === "dash" ? (
            <div className="mt-4 flex flex-col gap-4">
              <p className="capitalize">Welcome {admin.username}</p>
              <div>
                <>
                  <Stats />
                </>
              </div>
            </div>
          ) : activeLink === "user" ? (
            <Users />
          ) : activeLink === "trnx" ? (
            <Transactions />
          ) : activeLink === "wallet" ? (
            <Wallets />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
