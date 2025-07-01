import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Content, Loadinmodal, Navbar } from "./components";
import {
	Dashboard,
	// Signup,
	Transactions,
	Wallets,
	Users,
	Orders,
	Products,
	Tickets,
	Admins,
} from "./pages";
import { getAccessToken } from "./utils/utilities";
import Chat from "./pages/Chat";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, resetLogout } from "./features/logoutSlice";
import { resetLogin } from "./features/loginSlice";
import Completeorder from "./pages/Completeorder";
import Adminwallet from "./pages/Adminwallet";

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [token, setToken] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [activeLink, setActiveLink] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("activeLink") || "dash";
		}
		return "dash";
	});
	const accessToken = getAccessToken();

	const { logoutError, logoutLoading, logoutSuccess } = useSelector(
		(state) => state.logout
	);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const handleActiveLink = (linkId) => {
		setActiveLink(linkId);
		// Store in localStorage whenever it changes
		localStorage.setItem("activeLink", linkId);
	};

	const handleLogout = () => {
		dispatch(logoutAdmin());
	};

	useEffect(() => {
		if (accessToken) {
			setToken(accessToken);
		} else {
			setToken(false);
		}
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) {
			setToken(false);
			navigate("/");
		}
	}, [accessToken]);

	useEffect(() => {
		if (logoutSuccess) {
			dispatch(resetLogin());
			sessionStorage.clear();
			dispatch(resetLogout());
		}
	}, [logoutSuccess]);

	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === "activeLink") {
				setActiveLink(e.newValue);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	return (
		<div className="h-screen bg-slate-200">
			{!token && <Navbar />}
			<div className="flex overflow-hidden h-screen">
				<div className={`w-[280px] bg-[#333] text-[#fff]`}>
					<Sidebar activeLink={activeLink} handleLink={handleActiveLink} />
				</div>

				<div className={`p-6 overflow-scroll mt-0 width`}>
					<Routes>
						<Route path="/" element={<Content />} />
						{/* <Route path="/signup" element={<Signup />} /> */}
						<Route
							path="/dash"
							element={
								<Dashboard toggle={toggle} handleLogout={handleLogout} />
							}
						/>
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/users" element={<Users />} />
						<Route path="/wallets" element={<Wallets />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/products" element={<Products />} />
						<Route path="/tickets" element={<Tickets />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/complete/:id" element={<Completeorder />} />
						<Route path="/address" element={<Adminwallet />} />
						<Route path="/admin" element={<Admins />} />
					</Routes>
				</div>
				{logoutLoading && <Loadinmodal loadingText={"Logging out"} />}
			</div>
		</div>
	);
};

export default App;
