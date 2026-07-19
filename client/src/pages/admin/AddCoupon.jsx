import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import CouponForm from "../../components/admin/CouponForm";
import { createCoupon } from "../../services/couponService";

const AddCoupon = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
      await createCoupon(formData);

      toast.success("Coupon created successfully");

      navigate("/admin/coupons");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create coupon"
      );
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Add Coupon
      </h1>

      <CouponForm
        formData={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
        buttonText="Create Coupon"
      />
    </AdminLayout>
  );
};

export default AddCoupon;