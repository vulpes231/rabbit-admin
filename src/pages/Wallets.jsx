import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { getAllWallets, suspendWallet } from "../features/walletSlice";
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
    id: "ownerEmail",
    name: "Email",
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
  const {
    getWalletsError,
    getWalletsLoading,
    wallets,
    suspendLoading,
    suspendError,
    suspended,
  } = useSelector((state) => state.wallet);

  const [walletId, setWalletId] = useState(false);

  const confirmBan = (row) => {
    setWalletId(row._id);
  };

  const banWallet = (e) => {
    e.preventDefault();
    dispatch(suspendWallet(walletId));
  };
  const cancelBan = (e) => {
    e.preventDefault();
    setWalletId(false);
  };

  // console.log(walletId);

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

  useEffect(() => {
    document.title = "Admin - Wallets";
  }, []);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Wallets</h3>
      <div>
        <Datatable
          headers={header}
          data={myWallets}
          title={"Suspend"}
          handleClick={confirmBan}
          customClass={
            "bg-yellow-500 text-white px-5 py-2 inline-flex rounded-md border border-yellow-500 hover:bg-yellow-700"
          }
        />
        {walletId && (
          <div className="top-0 right-0 absolute p-6 bg-white shadow-xl m-6 rounded-lg ">
            <p>confirm wallet suspension</p>
            <div className="flex justify-between text-white">
              <button onClick={banWallet} className="bg-green-500 px-6 py-1.5">
                {!suspendLoading ? "yes" : "wait..."}
              </button>
              <button onClick={cancelBan} className="bg-gray-500 px-6 py-1.5">
                no
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallets;
