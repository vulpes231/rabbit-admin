import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { getAllWallets } from "../features/walletSlice";
import { useDispatch, useSelector } from "react-redux";

const header = [
  {
    id: "_id",
    name: "id",
  },
  {
    id: "owner",
    name: "owner",
  },
  {
    id: "balance",
    name: "balance",
  },
];

const Wallets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();
  const [myWallets, setMyWallets] = useState([]);
  const { getWalletsError, getWalletsLoading, wallets } = useSelector(
    (state) => state.wallet
  );

  const banWallet = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getAllWallets());
    }
  }, [accessToken]);

  useEffect(() => {
    if (wallets) {
      setMyWallets(wallets.wallets);
    }
  }, [wallets]);

  if (getWalletsLoading) {
    return <p className="mt-5">Getting wallets...</p>;
  }

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Wallets</h3>
      <div>
        <Datatable
          headers={header}
          data={myWallets}
          title={"Suspend"}
          handleClick={banWallet}
          customClass={
            "bg-yellow-500 text-white px-5 py-2 inline-flex rounded-md border border-yellow-500 hover:bg-yellow-700"
          }
        />
      </div>
    </div>
  );
};

export default Wallets;
