import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="text-center">

        <h1 className="text-8xl font-black text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 max-w-md">
          The page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaHome />

            Home
          </Link>

          <Link
            to="/shop"
            className="border px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100"
          >
            <FaSearch />

            Browse Products
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFound;