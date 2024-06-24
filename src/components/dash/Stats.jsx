import React, { useEffect } from "react";
import Box from "./Box";
import {} from "react-icons/fa";
import { FaUserGroup, FaBoxArchive } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import { getTrnxs } from "../../features/trnxSlice";
import { getUsers } from "../../features/userSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { users } = useSelector((state) => state.user);
  const { trnxs } = useSelector((state) => state.trnx);

  // console.log(users?.users?.length);

  useEffect(() => {
    if (accessToken) {
      dispatch(getTrnxs());
      dispatch(getUsers());
      // dispatch(getTrnxs())
    }
  }, [accessToken, dispatch]);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Box
        icon={<FaUserGroup />}
        title={"users"}
        value={users?.users?.length ? users.users.length : 0}
      />
      <Box
        icon={<FaBoxArchive />}
        title={"transactions"}
        value={trnxs?.trnxs?.length ? trnxs.trnx.length : 0}
      />
      <Box icon={<MdAdminPanelSettings />} title={"wallets"} value={0} />
    </div>
  );
};

export default Stats;
