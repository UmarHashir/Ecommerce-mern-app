import api from "./api";

export const getUsers = (params) => {
  return api.get("/users", {
    params,
  });
};

export const getUser = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (
  id,
  userData
) => {
  return api.put(
    `/users/${id}`,
    userData
  );
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};