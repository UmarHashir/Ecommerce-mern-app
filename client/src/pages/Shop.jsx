import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/product/ProductGrid";
import SearchBar from "../components/product/SearchBar";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/product/Pagination";

import ErrorState from "../components/common/ErrorState";
const Shop = () => {
  // Filters
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Products
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

const [resultPerPage, setResultPerPage] =
  useState(8);

const [totalProducts, setTotalProducts] =
  useState(0);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts({
        keyword,
        category,
        brand,
        page,
        sort,
        minPrice,
        maxPrice,
      });

      setProducts(data.products);

setCurrentPage(data.currentPage);

setResultPerPage(data.resultPerPage);

setTotalProducts(data.totalProducts);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Load products when page opens or filters change
  useEffect(() => {
    fetchProducts();
  }, [
    keyword,
    category,
    brand,
    page,
    sort,
    minPrice,
    maxPrice,
  ]);

  return (

<div className="container mx-auto py-10">

<h1 className="text-3xl font-bold mb-8">
Shop
</h1>

<SearchBar
keyword={keyword}
setKeyword={setKeyword}
/>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

<div>

<ProductFilters

category={category}
setCategory={setCategory}

brand={brand}
setBrand={setBrand}

minPrice={minPrice}
setMinPrice={setMinPrice}

maxPrice={maxPrice}
setMaxPrice={setMaxPrice}

setPage={setPage}

/>

</div>

<div className="lg:col-span-3">


{error && (

  <ErrorState

    title="Oops!"

    message={error}

    buttonText="Retry"

    onRetry={fetchProducts}

  />

)}

{!loading && !error && (

<>
  <ProductGrid
  products={products}
  loading={loading}
/>

  <Pagination
    currentPage={currentPage}
    totalProducts={totalProducts}
    resultPerPage={resultPerPage}
    setPage={setPage}
  />
</>

)}

</div>

</div>

</div>

);
};

export default Shop;