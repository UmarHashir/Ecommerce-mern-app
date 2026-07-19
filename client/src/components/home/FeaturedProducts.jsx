import { useEffect, useState } from "react";

import ProductGrid from "../product/ProductGrid";

import { getFeaturedProducts } from "../../services/productService";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data = await getFeaturedProducts();

      setProducts(data.products);

    } catch (err) {

      setError("Failed to load featured products.");

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  if (loading) {

    return (
      <h2 className="text-center py-10">
        Loading...
      </h2>
    );

  }

  if (error) {

    return (
      <h2 className="text-center text-red-600 py-10">
        {error}
      </h2>
    );

  }

  return (

    <section className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">

        Featured Products

      </h1>

      <ProductGrid products={products} />

    </section>

  );

};

export default FeaturedProducts;