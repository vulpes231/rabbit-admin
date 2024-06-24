import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";

const header = [
  {
    id: "amt",
    name: "amount",
  },
  {
    id: "cid",
    name: "creator ID",
  },
  {
    id: "type",
    name: "type",
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

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getTrnxs());
    }
  }, [accessToken]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Transactions</h3>
      <div>
        <Datatable headers={header} data={myTrnxs} />
      </div>
    </div>
  );
};

export default Transactions;
