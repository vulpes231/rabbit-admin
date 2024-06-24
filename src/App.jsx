import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Content, Navbar } from "./components";
import { Dashboard, Signup, Transactions, Wallets, Users } from "./pages";
import { getAccessToken } from "./utils/utilities";

const App = () => {
  const [token, setToken] = useState(false);
  const accessToken = getAccessToken();
  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, [accessToken]);

  return (
    <div>
      {!token && <Navbar />}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/create-admin" element={<Signup />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </div>
  );
};

export default App;
