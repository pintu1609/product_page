import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
