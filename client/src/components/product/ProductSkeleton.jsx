import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="border rounded-lg shadow p-4">

      <Skeleton
        height={220}
        borderRadius={10}
      />

      <div className="mt-4">

        <Skeleton width="70%" />

      </div>

      <div className="mt-3">

        <Skeleton width="40%" />

      </div>

      <div className="mt-4">

        <Skeleton width={80} />

      </div>

      <div className="mt-5">

        <Skeleton
          height={40}
          borderRadius={8}
        />

      </div>

    </div>
  );
};

export default ProductSkeleton;