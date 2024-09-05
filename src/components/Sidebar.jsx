import React from "react";
import { authLinks } from "../constants";
import { MdClose, MdHome, MdMenu, MdWallet } from "react-icons/md";
import { AiFillShopping, AiTwotoneCustomerService } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = ({ activeLink, handleLink }) => {
  return (
    <aside>
      <div className="h-full p-6 overflow-y-auto ">
        <h3 className="text-xl uppercase font-bold">rh4ogs</h3>
        <ul className="flex flex-col gap-2 lg:mt-10">
          {authLinks.map((lnk) => (
            <li key={lnk.id} onClick={() => handleLink(lnk.id)}>
              <Link
                to={lnk.path}
                className={`flex items-center gap-2 py-2 w-full rounded-sm hover  text-sm font-medium px-5 ${
                  activeLink === lnk.id
                    ? "bg-red-500 text-white"
                    : "bg-transparent"
                }`}
              >
                {lnk.id === "dash" ? (
                  <MdHome />
                ) : lnk.id === "user" ? (
                  <FaUserGroup />
                ) : lnk.id === "trnx" ? (
                  <FaExchangeAlt />
                ) : lnk.id === "wallet" ? (
                  <MdWallet />
                ) : lnk.id === "product" ? (
                  <SiHomeassistantcommunitystore />
                ) : lnk.id === "order" ? (
                  <AiFillShopping />
                ) : lnk.id === "ticket" ? (
                  <AiTwotoneCustomerService />
                ) : null}
                {lnk.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
