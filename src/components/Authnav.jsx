import React, { useState } from "react";
import { authLinks } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";

const Authnav = ({ handleToggle, toggle }) => {
  return (
    <div onClick={handleToggle} className="cursor-pointer">
      {toggle ? <MdClose /> : <MdMenu />}
    </div>
  );
};

export default Authnav;
