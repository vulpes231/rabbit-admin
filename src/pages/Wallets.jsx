import React, { useEffect } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { getWallet } from "../features/walletSlice";
import { useDispatch } from "react-redux";

const header = [
  {
    id: "owner",
    name: "owner",
  },
  {
    id: "trade",
    name: "trading balance",
  },
  {
    id: "total",
    name: "overall balance",
  },
];

const Wallets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();
  const { getWalletError, getWalletLoading, wallet } = useSelector(
    (state) => state.wallet
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getWallet());
    }
  }, [accessToken]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Wallets</h3>
      <div>
        <Datatable headers={header} />
      </div>
    </div>
  );
};

export default Wallets;
