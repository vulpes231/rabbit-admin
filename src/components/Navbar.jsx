import React, { useState } from "react";
import { links } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <header className="w-full isolate top-0 bg-slate-200">
      <nav className="p-6 flex justify-between items-center">
        <h1 className="font-bold text-xl text-blue-700">iTrust Admin</h1>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            {links.map((lnk) => {
              return (
                <li key={lnk.id}>
                  <Link
                    className="inline-flex px-4 py-3 bg-blue-500 text-white font-medium text-xs rounded-3xl hover:bg-blue-700"
                    to={lnk.path}
                  >
                    {lnk.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className="text-xl font-semibold p-1 sm:hidden"
            onClick={handleToggle}
          >
            {!toggle ? <MdMenu /> : <MdClose />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
