import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategories } from "../../services/categoryService";
import { createProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProductForm from "../../components/admin/ProductForm";
const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
const [imagePreviews, setImagePreviews] = useState([]);
const navigate = useNavigate();

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


    const uploadImagesHandler = (e) => {
  const files = Array.from(e.target.files);

  setImages(files);

  const previews = files.map((file) =>
    URL.createObjectURL(file)
  );

  setImagePreviews(previews);
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const { data } = await getCategories();
    setCategories(data.categories);
  } catch (error) {
    console.error(error);
  }
};

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

    await createProduct(data);

    toast.success("Product created successfully");

    navigate("/admin/products");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create product"
    );
  }
};
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <ProductForm
  formData={formData}
  handleChange={handleChange}
  categories={categories}
  imagePreviews={imagePreviews}
  uploadImagesHandler={uploadImagesHandler}
  submitHandler={submitHandler}
  buttonText="Save Product"
/>
    </AdminLayout>
  );
};

export default AddProduct;