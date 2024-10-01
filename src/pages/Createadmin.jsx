import React, { useEffect, useState, useRef } from "react";
import { Formdiv } from "../components";
import Forminput from "../components/Forminput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCreateAdmin, signupAdmin } from "../features/signupSlice";

const initialState = {
  username: "",
  password: "",
  email: "",
  role: "",
};

const Signup = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null); // Create a ref for the modal

  const { adminCreated, createAdminError, createAdminLoading } = useSelector(
    (state) => state.signup
  );
  const [formData, setFormData] = useState(initialState);
  const [customError, setCustomError] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupAdmin(formData));
    console.log(formData);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    if (createAdminError) {
      setCustomError(createAdminError);
    }
  }, [createAdminError]);

  useEffect(() => {
    let timeout;
    if (adminCreated) {
      timeout = 2000;
      setTimeout(() => {
        resetCreateAdmin();
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [navigate, adminCreated]);

  useEffect(() => {
    let timeout;
    if (customError) {
      timeout = 4000;
      setTimeout(() => {
        resetCreateAdmin();
        setCustomError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [customError]);

  // Add event listener for clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full h-screen top-0 left-0 absolute bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef}>
        {" "}
        {/* Attach ref to modal container */}
        <form
          onSubmit={handleSignup}
          className="bg-white rounded-sm shadow p-6 flex flex-col gap-4 w-full md:w-[380px]"
        >
          <h4 className="text-xl font-bold capitalize my-5">Create Admin</h4>
          <Formdiv>
            <label htmlFor="">username</label>
            <Forminput
              type={"text"}
              placeHolder={"Enter username"}
              value={formData.username}
              name="username"
              handleChange={handleInputChange}
            />
          </Formdiv>
          <Formdiv>
            <label htmlFor="">email</label>
            <Forminput
              type={"text"}
              placeHolder={"Enter email"}
              value={formData.email}
              name="email"
              handleChange={handleInputChange}
            />
          </Formdiv>
          <Formdiv>
            <label htmlFor="">role</label>
            <select
              value={formData.role}
              name="role"
              onChange={handleInputChange}
              className="w-full outline-none border-2 p-2 border-gray-300 placeholder:text-sm placeholder:font-thin focus:outline-red-500 focus:border-none bg-white"
            >
              <option value="">choose role</option>
              <option value="dev">dev</option>
              <option value="moderator">moderator</option>
            </select>
          </Formdiv>
          <div>
            <label htmlFor="">password</label>
            <Forminput
              type={"password"}
              placeHolder={"Enter password"}
              value={formData.password}
              name="password"
              handleChange={handleInputChange}
            />
          </div>
          {customError && (
            <p className="text-red-700 font-sm bg-red-500 bg-opacity-10 p-2 ">
              {customError}
            </p>
          )}
          {adminCreated && (
            <p className="text-green-700 font-sm bg-green-500 bg-opacity-10 p-2 ">
              {`Admin ${formData.username} created successfully.`}
            </p>
          )}
          <button className="bg-red-500 text-white font-semibold text-sm capitalize py-3 px-2 rounded-md mt-4 hover:bg-red-800">
            {createAdminLoading ? "Creating admin..." : "Create admin"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
