import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ product }) => {

    const displayPrice =
    product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const discount =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) /
            product.price) *
            100
        )
      : 0;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="relative bg-white rounded-xl shadow">
        <WishlistButton
  productId={product._id}
/>

        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="h-56 w-full object-cover rounded-lg"
        />

        <h3 className="mt-3 font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-500">
          {product.brand}
        </p>

        <div className="mt-2 flex items-center gap-2">

  <span className="font-bold text-lg text-green-600">
    ${displayPrice}
  </span>

  {product.discountPrice > 0 && (
    <>
      <span className="line-through text-gray-400">
        ${product.price}
      </span>

      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
        -{discount}%
      </span>
    </>
  )}

</div>

      </div>
    </Link>
  );
};

export default ProductCard;