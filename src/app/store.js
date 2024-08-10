import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import signupReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";
import orderReducer from "../features/orderSlice";
import productReducer from "../features/productSlice";
import ticketReducer from "../features/ticketSlice";
import chatReducer from "../features/chatSlice";

const store = configureStore({
  reducer: {
    signin: loginReducer,
    signup: signupReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
    order: orderReducer,
    product: productReducer,
    ticket: ticketReducer,
    chat: chatReducer,
  },
});

export default store;
