import { Link } from "react-router-dom";
import { FaHome, FaRedoAlt } from "react-icons/fa";

const ServerError = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-8xl font-black text-orange-500">
          500
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Internal Server Error
        </h2>

        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          Something went wrong on our side.
          Please try refreshing the page or come back later.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={refreshPage}
            
            className="bg-orange-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
          >
            <FaRedoAlt />
            Refresh
          </button>

          <Link
            to="/"
            className="border px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <FaHome />
            Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ServerError;