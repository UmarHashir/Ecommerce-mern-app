import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllProductsAdmin, deleteProduct } from "../../services/productService";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../../components/common/Pagination";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
  try {
    const { data } =
  await getAllProductsAdmin({
    page,
  });

setProducts(data.products);

setTotalPages(data.totalPages);
  } catch (error) {
    console.error(error);
  }
};

  const deleteHandler = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    toast.success("Product deleted");

    fetchProducts();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete product"
    );
  }
};

const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">

  <div>
    <h1 className="text-3xl font-bold">
      Products
    </h1>

    <p className="text-gray-500 mt-1">
      Total Products: {filteredProducts.length}
    </p>
  </div>

  <div className="flex gap-3">

    <input
      type="text"
      placeholder="Search product..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border rounded-lg px-4 py-2 w-64"
    />

    <Link
      to="/admin/products/new"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      Add Product
    </Link>

  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Image
              </th>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Stock
              </th>

              <th className="text-left p-4">
                Category
              </th>

              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product._id}
                className="border-t"
              >
                <td className="p-4">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  ${product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  {product.category?.name}
                </td>

                <td className="p-4 flex gap-2">
                  <Link
  to={`/admin/products/${product._id}/edit`}
  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Edit
</Link>

                  <button
  onClick={() => deleteHandler(product._id)}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
      <Pagination
  page={page}
  totalPages={totalPages}
  setPage={setPage}
/>
    </AdminLayout>
  );
};

export default AdminProducts;