import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../features/adminSlice";
import { Createadmin } from ".";

const headers = [
  {
    id: "username",
    name: "Username",
  },
  {
    id: "email",
    name: "Email",
  },
  {
    id: "superUser",
    name: "isSuperUser",
  },
  {
    id: "role",
    name: "Role",
  },
];

const Admins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { admins } = useSelector((state) => state.admin);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  const [myAdmins, setMyAdmins] = useState([]);

  const handleCreateAdmin = () => {
    console.log("clicked");
    setShowCreateAdmin(true);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getAdmins());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (admins) {
      setMyAdmins(admins?.admins);
    }
  }, [admins]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg p-4">Admins</h3>
        <button
          onClick={handleCreateAdmin}
          className="px-5 py-2.5 bg-red-500 text-white rounded-lg "
        >
          Create admin
        </button>
      </div>
      <div>
        <table className="min-w-full text-center">
          <thead className="capitalize font-semibold bg-red-500 text-white">
            <tr>
              {headers.map((hd, index) => {
                return (
                  <th className="p-2" key={index}>
                    {hd.name}
                  </th>
                );
              })}
              <th className="px-5 py-3">actions</th>
            </tr>
          </thead>
          <tbody>
            {myAdmins?.map((adm, index) => {
              //   console.log(adm);
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-slate-300" : "bg-slate-200"
                  }`}
                >
                  <td className="capitalize px-5 py-3">{adm.username}</td>
                  <td className="px-5 py-3">
                    {adm.email || `${adm.role}@rabbithole4og.com`}
                  </td>
                  <td className="px-5 py-3">
                    {adm.superUser ? "True" : "False"}
                  </td>
                  <td className="capitalize px-5 py-3">{adm.role}</td>
                  <td className="px-5 py-3">
                    <span>
                      <button
                        // onClick={handleCreateAdmin}
                        className="bg-red-500 text-white px-5 py-2 rounded-3xl capitalize"
                      >
                        delete
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showCreateAdmin && <Createadmin />}
      </div>
    </div>
  );
};

export default Admins;
