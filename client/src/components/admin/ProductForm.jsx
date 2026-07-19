const ProductForm = ({
  formData,
  handleChange,
  categories,
  imagePreviews,
  uploadImagesHandler,
  submitHandler,
  buttonText,
}) => {
  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-8 rounded-xl shadow space-y-5"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        placeholder="Description"
        className="w-full border rounded-lg p-3"
      />

      <div className="grid grid-cols-2 gap-5">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          placeholder="Discount Price"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border rounded-lg p-3"
        />
      </div>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <div className="flex gap-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />

          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
          />

          Best Seller
        </label>
      </div>

      <input
        type="file"
        multiple
        onChange={uploadImagesHandler}
        className="w-full"
      />

      <div className="flex gap-4 flex-wrap">
        {imagePreviews.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="w-24 h-24 rounded-lg object-cover border"
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;