import {
  createContext,
  useContext,
  useState,
} from "react";

const CouponContext = createContext();

export const CouponProvider = ({
  children,
}) => {
  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  const [discount, setDiscount] =
    useState(0);

  const applyCoupon = (
    coupon,
    discountAmount
  ) => {
    setAppliedCoupon(coupon);
    setDiscount(discountAmount);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
  };

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        discount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () =>
  useContext(CouponContext);