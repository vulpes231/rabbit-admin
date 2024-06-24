import React, { useEffect, useState } from "react";
import { Formdiv, Section } from "../components";
import Forminput from "../components/Forminput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAdmin } from "../features/signupSlice";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading } = useSelector((state) => state.signup);
  const [formData, setFormData] = useState(initialState);

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
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [navigate]);

  return (
    <Section>
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSignup}
          action=""
          className="bg-white p-6 flex flex-col gap-4"
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
          <div>
            <label htmlFor="">password</label>
            <Forminput
              type={"text"}
              placeHolder={"Enter password"}
              value={formData.password}
              name="password"
              handleChange={handleInputChange}
            />
          </div>
          {error && (
            <p className="text-red-700 font-sm bg-red-500 bg-opacity-10 p-2 ">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-700 font-sm bg-green-500 bg-opacity-10 p-2 ">
              {`Admin ${formData.username} created successfully.`}
            </p>
          )}
          <button className="bg-blue-500 text-white font-semibold text-sm capitalize py-3 px-2 rounded-md mt-4 hover:bg-blue-800">
            {loading ? "Creating admin..." : "Create admin"}
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Signup;
