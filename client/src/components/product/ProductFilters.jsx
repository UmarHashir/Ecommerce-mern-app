const ProductFilters = ({
  category,
  setCategory,

  brand,
  setBrand,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  setPage,
}) => {

  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">

      <h2 className="text-xl font-semibold mb-5">
        Filters
      </h2>

      {/* Category */}

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg p-2"
        >

          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Shoes">
            Shoes
          </option>

          <option value="Accessories">
            Accessories
          </option>

        </select>

      </div>

      {/* Brand */}

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg p-2"
        >

          <option value="">
            All Brands
          </option>

          <option value="Apple">
            Apple
          </option>

          <option value="Samsung">
            Samsung
          </option>

          <option value="Nike">
            Nike
          </option>

          <option value="Adidas">
            Adidas
          </option>

        </select>

      </div>

      {/* Min Price */}

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Minimum Price
        </label>

        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg p-2"
          placeholder="0"
        />

      </div>

      {/* Max Price */}

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Maximum Price
        </label>

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg p-2"
          placeholder="10000"
        />

      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default ProductFilters;