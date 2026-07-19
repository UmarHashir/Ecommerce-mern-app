const Pagination = ({
  currentPage,
  totalProducts,
  resultPerPage,
  setPage,
}) => {
  const totalPages = Math.ceil(
    totalProducts / resultPerPage
  );

  // Don't show pagination if only one page exists
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">

      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;