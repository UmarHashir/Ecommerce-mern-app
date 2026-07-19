import React from 'react'
import { useState,useEffect } from 'react'
import { getCoupons,deleteCoupon } from '../../services/couponService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AdminLayout from "../../components/admin/AdminLayout";
const AdminCoupons = () => {

    const [coupons, setCoupons] = useState([]);


    useEffect(() => {
  fetchCoupons();
}, []);

const fetchCoupons = async () => {
  try {
    const { data } = await getCoupons();

  //  console.log(data.coupons);

    setCoupons(data.coupons);
  } catch (error) {
    console.error(error);
  }
};

const deleteHandler = async (id) => {
  if (
    !window.confirm(
      "Delete this coupon?"
    )
  )
    return;

  try {
    await deleteCoupon(id);

    toast.success("Coupon deleted");

    fetchCoupons();
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
        Coupons
      </h1>

      <Link
        to="/admin/coupons/new"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Coupon
      </Link>
    </div>

    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">
              Code
            </th>

            <th className="text-left p-4">
              Discount
            </th>

            <th className="text-left p-4">
              Minimum Order
            </th>

            <th className="text-left p-4">
              Usage
            </th>

            <th className="text-left p-4">
              Expiry
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <tr
              key={coupon._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-semibold">
                {coupon.code}
              </td>

              <td className="p-4">
                {coupon.discountType === "percentage"
                  ? `${coupon.discountValue}%`
                  : `$${coupon.discountValue}`}
              </td>

              <td className="p-4">
                ${coupon.minimumOrder}
              </td>

              <td className="p-4">
                {coupon.usedCount} / {coupon.usageLimit}
              </td>

              <td className="p-4">
                {new Date(
                  coupon.expiresAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    coupon.isActive
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {coupon.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link
                    to={`/admin/coupons/${coupon._id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteHandler(coupon._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center p-8 text-gray-500"
              >
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </AdminLayout>
);
}

export default AdminCoupons