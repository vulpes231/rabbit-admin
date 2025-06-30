import React, { useEffect, useState } from "react";
import { Formdiv, Loadinmodal, Section, Successmodal } from "../components";
import Forminput from "../components/Forminput";
import { useDispatch, useSelector } from "react-redux";
import { signinAdmin } from "../features/loginSlice";
import { useNavigate } from "react-router-dom";
import { style } from "../constants";

const initialState = {
	username: "",
	password: "",
};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { accessToken, admin, loading, error } = useSelector(
		(state) => state.signin
	);
	const [formData, setFormData] = useState(initialState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(signinAdmin(formData));
		// console.log(formData);
		// resetInput();
	};

	useEffect(() => {
		document.title = "Admin - Login";
	}, []);

	useEffect(() => {
		if (accessToken && admin) {
			try {
				sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
				sessionStorage.setItem("admin", JSON.stringify(admin));
			} catch (error) {
				console.error("Failed to save access token:", error);
			}

			setTimeout(() => {
				navigate("/dash");
			}, 1000);
		}
	}, [accessToken, admin, dispatch, navigate]);
	return (
		<Section>
			<div className="w-full h-full flex items-center justify-center">
				<form
					onSubmit={handleLogin}
					action=""
					className="bg-white rounded-[10px] shadow-md p-8 flex flex-col gap-4 w-full md:w-[390px]"
				>
					<h4 className="text-[20px] font-semibold capitalize my-5">
						Admin login
					</h4>
					<Formdiv>
						<label className={style.label} htmlFor="">
							username
						</label>
						<Forminput
							type={"text"}
							placeHolder={"Enter username"}
							value={formData.username}
							name="username"
							handleChange={handleInputChange}
						/>
					</Formdiv>

					<Formdiv>
						<label className={style.label} htmlFor="">
							password
						</label>
						<Forminput
							type={"password"}
							placeHolder={"Enter password"}
							value={formData.password}
							name="password"
							handleChange={handleInputChange}
						/>
					</Formdiv>
					{error && (
						<p className="text-red-700 font-sm bg-red-500 bg-opacity-10 p-2 ">
							{error}
						</p>
					)}

					<button className={style.button}>login</button>
				</form>
			</div>
			{loading && <Loadinmodal loadingText={"Logging in"} />}
			{accessToken && <Successmodal successText={"Login Successful."} />}
		</Section>
	);
};

export default Login;
