import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utilities";
import {
  getAllAddresses,
  resetAddressUpdate,
  updateAddress,
} from "../features/addressSlice";

const headers = [
  { id: "coinName", name: "Currency" },
  { id: "network", name: "Network" },
  { id: "address", name: "Address" },
  { id: "actions", name: "Actions" },
];

const Adminwallet = () => {
  const dispatch = useDispatch();
  const [myAddresses, setMyAddress] = useState([]);
  const { addresses, updateAddressError, addressUpdated } = useSelector(
    (state) => state.address
  );
  const accessToken = getAccessToken();

  // Initialize state for storing address edits and individual loading states
  const [editedAddresses, setEditedAddresses] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const handleAddress = (rowId) => {
    const formData = { address: editedAddresses[rowId] || "" };
    // Set the loading state for the specific row
    setLoadingStates((prev) => ({ ...prev, [rowId]: true }));

    // Dispatch the update action
    dispatch(updateAddress({ rowId, formData }));
  };

  const handleInput = (rowId, e) => {
    const { value } = e.target;
    setEditedAddresses((prev) => ({
      ...prev,
      [rowId]: value,
    }));
  };

  useEffect(() => {
    if (addressUpdated) {
      dispatch(resetAddressUpdate());
      // Reset the loading state after the update
      setLoadingStates({});
    }
  }, [addressUpdated]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllAddresses());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (addresses) {
      setMyAddress(addresses);
    }
  }, [addresses]);

  useEffect(() => {
    document.title = "Admin - Wallet Addresses";
  }, []);

  return (
    <div className="p-6">
      <h3 className="font-bold text-2xl mb-4">Addresses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-red-500 text-white">
            <tr>
              {headers.map((hd) => (
                <th
                  key={hd.id}
                  className="py-2 px-4 border-b border-red-300 text-left font-medium uppercase"
                >
                  {hd.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myAddresses?.map((add) => (
              <tr
                key={add._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4 border-b border-gray-300 capitalize">
                  {add.coinName}
                </td>
                <td className="py-3 px-4 border-b border-gray-300 uppercase text-sm">
                  {add.network}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <input
                    type="text"
                    onChange={(e) => handleInput(add._id, e)}
                    value={editedAddresses[add._id] || add.address}
                    name="address"
                    placeholder={add.address}
                    className="p-2 border outline-none focus:outline-red-500 focus:border-none"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleAddress(add._id)}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md"
                    disabled={loadingStates[add._id]} // Disable button if loading
                  >
                    {loadingStates[add._id] ? "Wait..." : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminwallet;
