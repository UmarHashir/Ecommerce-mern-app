const TopSellingProducts = ({
  products = [],
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Top Selling Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No sales yet.
        </p>
      ) : (
        <div className="space-y-4">

          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {product.sold} sold
                </p>

                <p className="text-sm text-gray-500">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default TopSellingProducts;