import React, { useState } from "react";

const Datatable = ({ headers, data, itemsPerPage = 20 }) => {
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
      <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            {headers?.map((hdr, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {hdr.name}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
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
                <button className="text-red-900 px-5 py-2 inline-flex rounded-md border border-red-500 ">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={headers.length + 1} className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <div>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-200 rounded"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-200 rounded"
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
