import { Link } from "react-router-dom";
import { FaHome, FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-8xl font-black text-red-600">
          403
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Access Denied
        </h2>

        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          You don't have permission to access this page.
          Please return to the homepage or contact an administrator if you believe this is a mistake.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/login"
            className="border px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <FaLock />
            Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Unauthorized;