import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";

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
  const { getTransactionError, getTransactionLoading, trnxs } = useSelector(
    (state) => state.trnx
  );

  const approveTrnx = (e) => {
    e.preventDefault();
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

  if (getTransactionLoading) {
    return <p className="mt-5">Getting transactions...</p>;
  }

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Transactions</h3>
      <div>
        <Datatable
          headers={header}
          data={myTrnxs}
          title={"Approve"}
          handleClick={approveTrnx}
          customClass={
            "bg-green-600 text-white px-5 py-2 inline-flex rounded-md hover:bg-green-700"
          }
        />
      </div>
    </div>
  );
};

export default Transactions;
