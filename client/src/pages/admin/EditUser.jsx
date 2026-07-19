import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getUser,
  updateUser,
} from "../../services/userService";

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await getUser(id);

      setFormData({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, formData);

      toast.success("User updated");

      navigate("/admin/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update user"
      );
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Edit User
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Update User
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditUser;