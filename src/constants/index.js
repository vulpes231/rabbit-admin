const devServer = `http://localhost:3300`;
const liveServer = `https://quadx.onrender.com`;

const links = [
  { id: "login", title: "Login", path: "/" },
  { id: "signup", title: "Signup", path: "/create-admin" },
];
const authLinks = [
  { id: "dash", title: "Dashboard", path: "/dash" },
  { id: "user", title: "Users", path: "/users" },
  { id: "trnx", title: "Transactions", path: "/transactions" },
  { id: "wallet", title: "Wallets", path: "/wallets" },
];

export { devServer, liveServer, links, authLinks };
