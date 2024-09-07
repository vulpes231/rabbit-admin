import React, { useState } from "react";

const Datatable = ({
  headers,
  data,
  itemsPerPage = 8,
  title,
  handleClick,
  customClass,
  deleteBtn,
  handleDelete,
  cusClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y-2 shadow-xl">
        <thead className="">
          <tr className="bg-red-500">
            {headers?.map((hdr, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                {hdr.name}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {paginatedData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((hdr, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 capitalize font-medium"
                >
                  {row[hdr.id]} {/* Access row data using hdr.id */}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className="flex items-center gap-2">
                  <button
                    onClick={() => handleClick(row)}
                    className={customClass}
                  >
                    {title}
                  </button>
                  <button
                    onClick={() => handleDelete(row)}
                    className={cusClass}
                  >
                    {deleteBtn}
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className=" ">
            <td colSpan={headers.length + 1} className="px-6 py-4">
              <div className="flex justify-between items-center ">
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <div>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-red-500 text-white rounded"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-red-500 text-white rounded"
                  >
                    Next
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Datatable;
