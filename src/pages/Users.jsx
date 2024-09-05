import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";

const header = [
  {
    id: "username",
    name: "username",
  },
  {
    id: "email",
    name: "email",
  },

  {
    id: "completedOrders",
    name: "completedOrders",
  },
  {
    id: "pendingOrders",
    name: "pendingOrders",
  },
  {
    id: "createdAt",
    name: "createdAt",
  },
];

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [myUsers, setMyUsers] = useState([]);

  const { getError, getLoading, users } = useSelector((state) => state.user);

  const deleteUser = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getUsers());
    }
  }, [accessToken]);

  useEffect(() => {
    if (users) {
      setMyUsers(users.users);
    }
  }, [users]);

  // if (getLoading) {
  //   return <p className="mt-5">Getting users...</p>;
  // }

  useEffect(() => {
    document.title = "Admin - Users";
  }, []);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Users</h3>
      <div>
        <Datatable
          headers={header}
          data={myUsers}
          title={"Delete"}
          handleClick={deleteUser}
          customClass={
            "bg-red-500 text-white px-5 py-2 inline-flex rounded-md border border-red-500 hover:bg-red-700"
          }
        />
      </div>
    </div>
  );
};

export default Users;
