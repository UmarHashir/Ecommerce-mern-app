import { useState } from "react";
import { toast } from "react-hot-toast";
import { createReview } from "../../services/productService";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";

const ProductReviews = ({
  product,
  refreshProduct,
}) => {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview(product._id, {
        rating,
        comment,
      });

      toast.success("Review added");

      setComment("");
      setRating(5);

      refreshProduct();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit review"
      );
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews
      </h2>

      {/* Review Form */}
      <form
        onSubmit={submitHandler}
        className="border rounded-xl p-6 mb-8 space-y-4"
      >
        <div>
          <p className="mb-2 font-medium">
            Rating
          </p>

          <StarRating
            rating={rating}
            setRating={setRating}
          />
        </div>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write your review..."
          rows={4}
          className="border rounded-lg p-3 w-full"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-5">
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              productId={product._id}
              refreshProduct={refreshProduct}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;