import api from "./api";

export const uploadImage = (formData) => {
  return api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};