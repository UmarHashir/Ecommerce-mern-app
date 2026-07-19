const CouponForm = ({
  formData,
  handleChange,
  submitHandler,
  buttonText,
}) => {
  return (
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold">
          Coupon Information
        </h2>

        <p className="text-gray-500 mt-1">
          Create or update a discount coupon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">
            Coupon Code
          </label>

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="SAVE20"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Discount Type
          </label>

          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="percentage">
              Percentage
            </option>

            <option value="fixed">
              Fixed Amount
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Discount Value
          </label>

          <input
            type="number"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Minimum Order
          </label>

          <input
            type="number"
            name="minimumOrder"
            value={formData.minimumOrder}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Usage Limit
          </label>

          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Expiry Date
          </label>

          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="w-5 h-5"
        />

        <label className="font-medium">
          Active Coupon
        </label>
      </div>

      <div className="border-t pt-6 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;