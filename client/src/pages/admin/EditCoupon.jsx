import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import CouponForm from "../../components/admin/CouponForm";

import {
  getCouponById,
  updateCoupon,
} from "../../services/couponService";

const EditCoupon = () => {
    const { id } = useParams();

const navigate = useNavigate();

const [formData, setFormData] = useState({
  code: "",
  discountType: "percentage",
  discountValue: "",
  minimumOrder: 0,
  usageLimit: 100,
  expiresAt: "",
  isActive: true,
});

useEffect(() => {
  fetchCoupon();
}, []);

const fetchCoupon = async () => {
  try {
    const { data } =
      await getCouponById(id);

    const coupon = data.coupon;

    setFormData({
      code: coupon.code,
      discountType:
        coupon.discountType,
      discountValue:
        coupon.discountValue,
      minimumOrder:
        coupon.minimumOrder,
      usageLimit:
        coupon.usageLimit,

      expiresAt:
        coupon.expiresAt
          .substring(0, 10),

      isActive:
        coupon.isActive,
    });
  } catch (error) {
    console.error(error);
  }
};

const handleChange = (e) => {
  const {
    name,
    value,
    type,
    checked,
  } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};
const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await updateCoupon(id, formData);

    toast.success(
      "Coupon updated successfully"
    );

    navigate("/admin/coupons");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Update failed"
    );
  }
};


 return (
  <AdminLayout>

    <h1 className="text-3xl font-bold mb-8">
      Edit Coupon
    </h1>

    <CouponForm
      formData={formData}
      handleChange={handleChange}
      submitHandler={submitHandler}
      buttonText="Update Coupon"
    />

  </AdminLayout>
);
}

export default EditCoupon