import api from "./api";

export const updateReview = (
  productId,
  reviewId,
  reviewData
) => {
  return api.put(
    `/reviews/${productId}/${reviewId}`,
    reviewData
  );
};

export const deleteReview = (
  productId,
  reviewId
) => {
  return api.delete(
    `/reviews/${productId}/${reviewId}`
  );
};