import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateReview,deleteReview } from "../../services/reviewService";
import StarRating from "./StarRating";
import { useAuth } from "../../context/AuthContext";
const ReviewCard = ({
  review,
  productId,
  refreshProduct,
}) => {
    const { user } = useAuth();
 const isOwner =
  user?.id === review.user;

  const [editing, setEditing] =
    useState(false);

  const [rating, setRating] =
    useState(review.rating);

  const [comment, setComment] =
    useState(review.comment);

  const submitHandler = async () => {
    try {
      await updateReview(
        productId,
        review._id,
        {
          rating,
          comment,
        }
      );

      toast.success(
        "Review updated"
      );

      setEditing(false);

      refreshProduct();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  const deleteHandler = async () => {
  const confirmed = window.confirm(
    "Delete this review?"
  );

  if (!confirmed) return;

  try {
    await deleteReview(
      productId,
      review._id
    );

    toast.success("Review deleted");

    refreshProduct();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};

  return (
    <div className="border rounded-xl p-5">

      <h3 className="font-semibold">
        {review.name}
      </h3>

      {editing ? (
        <>
          <div className="mt-3">
  <StarRating
    rating={rating}
    setRating={setRating}
  />
</div>
          <textarea
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            className="border rounded p-2 w-full mt-3"
          />

          <button
            onClick={submitHandler}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="text-yellow-500">
            {"★".repeat(review.rating)}
          </p>

          <p className="mt-3">
            {review.comment}
          </p>
        </>
      )}

      {isOwner && !editing && (
  <div className="flex gap-3 mt-4">
    <button
      onClick={() =>
        setEditing(true)
      }
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
    >
      Edit
    </button>

    <button
      onClick={deleteHandler}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete
    </button>
  </div>
)}
    </div>
  );
};

export default ReviewCard;