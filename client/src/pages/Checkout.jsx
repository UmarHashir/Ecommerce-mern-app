import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCoupon } from "../context/CouponContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    appliedCoupon,
    discount,
  } = useCoupon();

  const [shippingInfo, setShippingInfo] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("shippingInfo")) || {
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      }
    );
  });

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(shippingInfo)
    );

    navigate("/review-order");
  };

  return (
    <div className="container mx-auto max-w-2xl py-10">

      <h1 className="text-3xl font-bold mb-8">
        Shipping Address
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State / Province"
          value={shippingInfo.state}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>

      </form>

    </div>
  );
};

export default Checkout;