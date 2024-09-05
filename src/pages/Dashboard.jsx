import React, { useEffect, useState } from "react";
import Stats from "../components/dash/Stats";
import { MdLockClock, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = ({ handleLogout }) => {
  const [lastLogin, setLastLogin] = useState(null);

  const admin = JSON.parse(sessionStorage.getItem("admin"));

  useEffect(() => {
    document.title = "Admin - Dashboard";
  }, []);

  useEffect(() => {
    const currentDate = new Date().toLocaleString();
    setLastLogin(currentDate);
  }, []);

  return (
    <section>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex justify-end">
          <span
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-medium hover:underline hover:text-red-500 cursor-pointer"
          >
            <MdLogout />
            <>Logout</>
          </span>
        </div>
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
