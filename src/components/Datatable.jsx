import React, { useState } from "react";
import { motion } from "framer-motion";
import numeral from "numeral";

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
	handleUnban,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [hoveredRow, setHoveredRow] = useState(null);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);
	const totalPages = Math.ceil(data?.length / itemsPerPage);

	const nextPage = () =>
		currentPage < totalPages && setCurrentPage(currentPage + 1);
	const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
	const goToPage = (page) =>
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));

	return (
		<div className="overflow-hidden rounded-xl border border-gray-100 shadow-lg">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gradient-to-r from-red-600 to-red-500">
						<tr>
							{headers?.map((hdr, index) => (
								<th
									key={index}
									className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
								>
									{hdr.name}
								</th>
							))}
							<th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{paginatedData?.map((row, rowIndex) => (
							<motion.tr
								key={rowIndex}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								onMouseEnter={() => setHoveredRow(rowIndex)}
								onMouseLeave={() => setHoveredRow(null)}
								className={`transition-colors ${
									hoveredRow === rowIndex ? "bg-gray-50" : ""
								}`}
							>
								{headers.map((hdr, colIndex) => (
									<td
										key={colIndex}
										className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
									>
										<span
											className={`${
												hdr.id === "status" && row[hdr.id] === "pending"
													? "text-yellow-500 bg-yellow-500/30 px-2 py-1 rounded-[5px]"
													: hdr.id === "status" && row[hdr.id] === "completed"
													? "text-green-500 bg-green-500/30 px-2 py-1 rounded-[5px]"
													: hdr.id === "status" && row[hdr.id] === "failed"
													? "text-red-500 bg-red-500/30 px-2 py-1 rounded-[5px]"
													: ""
											}`}
										>
											{hdr.id === "createdAt"
												? new Date(row[hdr.id]).toLocaleDateString()
												: hdr.id === "amount"
												? `$${numeral(row[hdr.id]).format("0,0.00")}`
												: hdr.id === "balance"
												? `$${numeral(row[hdr.id]).format("0,0.00")}`
												: hdr.id === "price"
												? `$${numeral(row[hdr.id]).format("0,0.00")}`
												: row[hdr.id]}
										</span>
									</td>
								))}
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex justify-end gap-2">
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleClick(row)}
											className={`${
												row.suspended ? "hidden" : "inline-flex"
											} items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-colors`}
										>
											{title}
										</motion.button>
										{/* <motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleUnban(row)}
											className={`${
												row.suspended ? "inline-flex" : "hidden"
											} items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 transition-colors`}
										>
											Unban
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleDelete(row)}
											className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
										>
											{deleteBtn}
										</motion.button> */}
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="bg-white px-6 py-3 border-t border-gray-200">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm text-gray-600">
						Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
						<span className="font-medium">
							{Math.min(startIndex + itemsPerPage, data?.length || 0)}
						</span>{" "}
						of <span className="font-medium">{data?.length || 0}</span> results
					</div>

					<div className="flex items-center gap-2">
						<motion.button
							whileHover={{ backgroundColor: "#dc2626" }}
							whileTap={{ scale: 0.95 }}
							onClick={prevPage}
							disabled={currentPage === 1}
							className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</motion.button>

						<div className="flex items-center gap-1">
							{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								let pageNum;
								if (totalPages <= 5) {
									pageNum = i + 1;
								} else if (currentPage <= 3) {
									pageNum = i + 1;
								} else if (currentPage >= totalPages - 2) {
									pageNum = totalPages - 4 + i;
								} else {
									pageNum = currentPage - 2 + i;
								}

								return (
									<button
										key={pageNum}
										onClick={() => goToPage(pageNum)}
										className={`w-8 h-8 rounded-md text-sm font-medium ${
											currentPage === pageNum
												? "bg-red-500 text-white"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										{pageNum}
									</button>
								);
							})}
							{totalPages > 5 && currentPage < totalPages - 2 && (
								<span className="px-2">...</span>
							)}
							{totalPages > 5 && currentPage < totalPages - 2 && (
								<button
									onClick={() => goToPage(totalPages)}
									className={`w-8 h-8 rounded-md text-sm font-medium ${
										currentPage === totalPages
											? "bg-red-500 text-white"
											: "text-gray-700 hover:bg-gray-100"
									}`}
								>
									{totalPages}
								</button>
							)}
						</div>

						<motion.button
							whileHover={{ backgroundColor: "#dc2626" }}
							whileTap={{ scale: 0.95 }}
							onClick={nextPage}
							disabled={currentPage === totalPages}
							className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Datatable;
