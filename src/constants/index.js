const devServer = `http://localhost:4000`;
const liveServer = `https://rabbit-server.onrender.com`;

const links = [
  { id: "login", title: "Login Admin", path: "/" },
  // { id: "signup", title: "Signup", path: "/signup" },
];

const authLinks = [
  { id: "dash", title: "Dashboard", path: "/dash" },
  { id: "user", title: "Users", path: "/users" },
  { id: "trnx", title: "Transactions", path: "/transactions" },
  { id: "wallet", title: "Wallets", path: "/wallets" },
  { id: "order", title: "Orders", path: "/orders" },
  { id: "product", title: "Products", path: "/products" },
  { id: "ticket", title: "Tickets", path: "/tickets" },
  { id: "address", title: "Addresses", path: "/address" },
  { id: "admin", title: "Admins", path: "/admin" },
];

const sendError = (error) => {
  if (error.response) {
    const errMsg = error.response.message.data;
    throw new Error(errMsg);
  }
};

export { devServer, liveServer, links, authLinks, sendError };
