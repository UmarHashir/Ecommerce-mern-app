// import ProductCard from "./ProductCard";
// import ProductSkeleton from "./ProductSkeleton";

// const ProductGrid = ({
//   products,
//   loading,
// }) => {

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         {[...Array(8)].map((_, index) => (
//           <ProductSkeleton
//             key={index}
//           />
//         ))}

//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//       {products.map((product) => (
//         <ProductCard
//           key={product._id}
//           product={product}
//         />
//       ))}

//     </div>
//   );
// };

// export default ProductGrid;

import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = ({ products,loading, }) => {
    if (loading) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {[...Array(8)].map((_, index) => (

        <ProductSkeleton
          key={index}
        />

      ))}

    </div>

  );

}
  if (products.length === 0) {
    return (

      <EmptyState

        title="No Products Found"

        message="Try changing your search or filters."

      />

    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;