import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";
import { confirmDeposit } from "../features/walletSlice";

const header = [
  {
    id: "_id",
    name: "_id",
  },
  {
    id: "amount",
    name: "amount",
  },
  {
    id: "creator",
    name: "creator",
  },
  {
    id: "method",
    name: "method",
  },
  {
    id: "status",
    name: "status",
  },
];

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [myTrnxs, setMyTrnxs] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [trnxId, setTrnxId] = useState(null);
  const [status, setStatus] = useState(null);
  const { getTransactionError, getTransactionLoading, trnxs } = useSelector(
    (state) => state.trnx
  );

  const { confirmDepositLoading, confirmDepositError, confirmDepositSuccess } =
    useSelector((state) => state.wallet);

  const handleModal = (row) => {
    console.log(row.status);
    setTrnxId(row._id);
    setStatus(row.status);
    setConfirmModal(true);
  };

  const closeModal = () => {
    setTrnxId(null);
    setConfirmModal(false);
  };

  const approveTrnx = () => {
    console.log(trnxId);
    dispatch(confirmDeposit(trnxId));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getTrnxs());
    }
  }, [accessToken]);

  useEffect(() => {
    if (trnxs) {
      setMyTrnxs(trnxs.trnx);
    }
  }, [trnxs]);

  useEffect(() => {
    let timeout;
    if (confirmDepositSuccess) {
      timeout = 3000;
      setTimeout(() => {
        setConfirmModal(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [confirmDepositSuccess]);

  if (getTransactionLoading) {
    return <p className="mt-5">Getting transactions...</p>;
  }

  useEffect(() => {
    document.title = "Admin - Transactions";
  }, []);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Transactions</h3>
      <div>
        <Datatable
          headers={header}
          data={myTrnxs}
          title={"Approve"}
          handleClick={handleModal}
          customClass={
            "bg-green-600 text-white px-5 py-2 inline-flex rounded-md hover:bg-green-700"
          }
        />
      </div>
      {confirmModal && (
        <div className="fixed top-[20px] right-0 flex flex-col p-6 gap-4 bg-white rounded-xl shadow w-[250px]">
          <p
            className={`text-xs font-medium ${
              confirmDepositSuccess ? "text-green-500" : "text-slate-950"
            }`}
          >
            {confirmDepositSuccess
              ? "Deposit confirmed."
              : "Are you sure you want to approve?"}
          </p>
          <div className="flex items-center justify-between w-full">
            <button
              onClick={approveTrnx}
              disabled={status === "completed"}
              className="py-2 px-5 rounded-lg inline-flex bg-green-500 capitalize hover:bg-green-600 font-medium text-xs text-white"
            >
              yes
            </button>
            <button
              onClick={closeModal}
              className="py-2 px-5 rounded-lg inline-flex bg-red-500 hover:bg-red-600 capitalize font-medium text-xs text-white"
            >
              no
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
