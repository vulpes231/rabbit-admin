import React, { useEffect, useState } from "react";

import Stats from "../components/dash/Stats";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { MdLockClock } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = ({ toggle }) => {
  const [lastLogin, setLastLogin] = useState(null);

  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    document.title = "Admin - Dashboard";
    if (!accessToken || admin === null) {
      navigate("/");
    }
  }, [accessToken, admin]);

  useEffect(() => {
    const currentDate = new Date().toLocaleString();
    setLastLogin(currentDate);
  }, []);

  return (
    <section>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex justify-end">
          <p className="capitalize flex items-center font-bold text-lg gap-1">
            <span>
              <FaUserCircle />{" "}
            </span>{" "}
            Welcome {admin?.username}
          </p>
        </div>
        <div className="flex justify-end items-center gap-1 text-xs font-thin capitalize">
          <span>
            <MdLockClock />
          </span>
          <span>last login: {lastLogin}</span>
        </div>
        <div>
          <>
            <Stats />
          </>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
