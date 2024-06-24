import React from "react";
import { authLinks } from "../constants";
import { MdAdminPanelSettings, MdHome, MdWallet } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";

const Sidebar = ({ toggle, setActiveLink, activeLink }) => {
  return (
    <aside className={`w-[250px] ${toggle ? "block" : "hidden"} bg-slate-200`}>
      <div className="h-full p-6 overflow-y-auto">
        <h3 className="flex items-center gap-2 text-xl mb-4 uppercase font-bold">
          {" "}
          <MdAdminPanelSettings /> iTrust Admin
        </h3>
        <ul className="flex flex-col gap-2">
          {authLinks.map((lnk) => (
            <li key={lnk.id}>
              <button
                onClick={() => setActiveLink(lnk.id)}
                className={
                  lnk.id === activeLink
                    ? "flex items-center flex-row-reverse gap-2 py-2 px-4 hover:bg-gray-200 rounded text-blue-500 text-sm font-medium"
                    : "flex items-center flex-row-reverse gap-2 py-2 px-4 hover:bg-gray-200 rounded text-sm font-medium"
                }
              >
                {lnk.title}
                {lnk.id === "dash" ? (
                  <MdHome />
                ) : lnk.id === "user" ? (
                  <FaUserGroup />
                ) : lnk.id === "trnx" ? (
                  <FaExchangeAlt />
                ) : lnk.id === "wallet" ? (
                  <MdWallet />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
