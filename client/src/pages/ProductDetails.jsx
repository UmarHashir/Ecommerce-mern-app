import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductReviews from "../components/product/ProductReviews";
import WishlistButton from "../components/product/WishlistButton";
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await getProduct(id);
      setProduct(data.product);

if (data.product.images.length > 0) {
  setSelectedImage(data.product.images[0].url);
}
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => {
  if (quantity < product.stock) {
    setQuantity((prev) => prev + 1);
  }
};

const decreaseQty = () => {
  if (quantity > 1) {
    setQuantity((prev) => prev - 1);
  }
};

const buyNowHandler = () => {
  addToCart(product, quantity);
  navigate("/checkout");
};
  if (loading) return <h2>Loading...</h2>;

  return (
  <div className="container mx-auto px-4 py-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Left Side */}
      {/* Left Side */}

<div className="relative">

  <WishlistButton
    productId={product._id}
  />

  {/* Main Image */}

  <img
    src={selectedImage}
    alt={product.name}
    className="w-full aspect-square object-contain rounded-xl border bg-white"
  />

  {/* Thumbnails */}

  <div className="flex gap-3 mt-4 flex-wrap">

    {product.images.map((image, index) => (

      <img
        key={index}
        src={image.url}
        alt={product.name}
        onClick={() => setSelectedImage(image.url)}
        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
          selectedImage === image.url
            ? "border-blue-600"
            : "border-gray-300"
        }`}
      />

    ))}

  </div>

</div>

      {/* Right Side */}
<div>

  <h1 className="text-4xl font-bold">
  {product.name}
</h1>

  <p className="text-gray-500 mt-2">
    Brand: {product.brand}
  </p>

  {/* Rating */}
  <div className="flex items-center gap-2 mt-3">
    <span className="text-yellow-500 text-xl">
      ⭐⭐⭐⭐⭐
    </span>

    <span>
      ({product.numReviews || 0} Reviews)
    </span>
  </div>


  {/* Price */}

  <div className="flex items-center gap-3 mt-6">

    <h2 className="text-3xl font-bold text-green-600">
      $
      {product.discountPrice > 0
        ? product.discountPrice
        : product.price}
    </h2>

    {product.discountPrice > 0 && (
      <span className="line-through text-gray-400 text-xl">
        ${product.price}
      </span>
    )}

  </div>

  <p className="mt-6 text-gray-700">
    {product.description}
  </p>

  <p className="mt-6">
    <span className="font-semibold">
      Stock:
    </span>{" "}
    {product.stock > 0 ? (
      <span className="text-green-600">
        In Stock
      </span>
    ) : (
      <span className="text-red-600">
        Out of Stock
      </span>
    )}
  </p>

  {/* Quantity */}

  <div className="flex items-center gap-4 mt-8">

    <button
      onClick={decreaseQty}
      className="w-10 h-10 bg-gray-200 rounded"
    >
      -
    </button>

    <span className="text-xl font-bold">
      {quantity}
    </span>

    <button
      onClick={increaseQty}
      className="w-10 h-10 bg-gray-200 rounded"
    >
      +
    </button>

    

  </div>

  {/* Buttons */}

  <div className="flex gap-4 mt-8">

    <button
  onClick={() => addToCart(product, quantity)}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Add to Cart
</button>

   <button
  onClick={buyNowHandler}
  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Buy Now
</button>

  </div>

</div>

    </div>
    <ProductReviews
  product={product}
  refreshProduct={fetchProduct}
/>
  </div>
  
);
};

export default ProductDetails;