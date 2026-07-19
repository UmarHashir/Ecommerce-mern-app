import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers,deleteUser, } from "../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [keyword, setKeyword] =
    useState("");

  const [page, setPage] = useState(1);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const resultPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers({
        page,
        keyword,
      });

      setUsers(data.users);

      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(id);

    toast.success("User deleted");

    fetchUsers();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};
  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

      </div>

      <input
        type="text"
        placeholder="Search user..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="border rounded-lg p-3 w-full mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Created
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

  <Link
    to={`/admin/users/${user._id}/edit`}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </Link>

  <button
  onClick={() =>
    deleteHandler(user._id)
  }
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>

</div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default AdminUsers;