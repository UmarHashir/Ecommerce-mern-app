import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProductById, updateProduct } from "../../services/productService";
import ProductForm from "../../components/admin/ProductForm";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

const [images, setImages] = useState([]);

const [imagePreviews, setImagePreviews] = useState([]);

const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  brand: "",
  category: "",
  featured: false,
  bestSeller: false,
});

  useEffect(() => {
  fetchProduct();
  fetchCategories();
}, []);

  const fetchProduct = async () => {
  try {
    const { data } = await getProductById(id);

    const product = data.product;

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      brand: product.brand,
      category: product.category?._id,
      featured: product.featured,
      bestSeller: product.bestSeller,
    });

    setImagePreviews(
      product.images.map((img) => img.url)
    );
  } catch (error) {
    console.error(error);
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await getCategories();

    setCategories(data.categories);
  } catch (error) {
    console.error(error);
  }
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};

const uploadImagesHandler = (e) => {
  const files = Array.from(e.target.files);

  setImages(files);

  setImagePreviews(
    files.map((file) =>
      URL.createObjectURL(file)
    )
  );
};

//   if (!product) {
//     return (
//       <AdminLayout>
//         <p>Loading...</p>
//       </AdminLayout>
//     );
//   }

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("stock", formData.stock);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("featured", formData.featured);
    data.append("bestSeller", formData.bestSeller);

    images.forEach((image) => {
      data.append("images", image);
    });

    await updateProduct(id, data);

    toast.success("Product updated successfully");

    navigate("/admin/products");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update product"
    );
  }
};
  return (
    <AdminLayout>
  <h1 className="text-3xl font-bold mb-8">
    Edit Product
  </h1>

  <ProductForm
    formData={formData}
    handleChange={handleChange}
    categories={categories}
    imagePreviews={imagePreviews}
    uploadImagesHandler={uploadImagesHandler}
    submitHandler={submitHandler}
    buttonText="Update Product"
  />
</AdminLayout>
  );
};

export default EditProduct;