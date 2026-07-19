import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const {
    wishlist,
    removeItem,
  } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <FaHeart className="mx-auto text-6xl text-gray-300 mb-5" />

        <h2 className="text-3xl font-bold">
          Your Wishlist is Empty
        </h2>

        <Link
          to="/shop"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-4"
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-52 object-cover rounded"
            />

            <h2 className="font-semibold mt-3">
              {product.name}
            </h2>

            <p className="text-blue-600 font-bold mt-2">
              ${product.price}
            </p>

            <button
              onClick={() =>
                removeItem(product._id)
              }
              className="mt-4 bg-red-600 text-white w-full py-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;