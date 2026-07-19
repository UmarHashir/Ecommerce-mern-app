import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const WishlistButton = ({ productId }) => {
  const { user } = useAuth();

  const {
    isInWishlist,
    addItem,
    removeItem,
  } = useWishlist();

  const inWishlist =
    isInWishlist(productId);

  const clickHandler = async (e) => {
    // Prevent opening product details
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error(
        "Please login to use wishlist."
      );
      return;
    }

    try {
      if (inWishlist) {
        await removeItem(productId);

        toast.success(
          "Removed from wishlist"
        );
      } else {
        await addItem(productId);

        toast.success(
          "Added to wishlist"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition"
    >
      {inWishlist ? (
        <FaHeart className="text-red-500 text-lg" />
      ) : (
        <FaRegHeart className="text-gray-600 text-lg" />
      )}
    </button>
  );
};

export default WishlistButton;