import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Get All Products
export const getProducts = async (
    keyword = "",
    category = "",
    page = 1
) => {

    return await axios.get(
        `http://localhost:5000/api/products?keyword=${keyword}&category=${category}&page=${page}`
    );

};

// Get Single Product
export const getSingleProduct = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create Product
export const createProduct = async (formData) => {
  return await axios.post(
    `${API_URL}/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Update Product
export const updateProduct = async (
  id,
  productData
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    productData
  );
};

// Delete Product
export const deleteProduct = async (id) => {
  return await axios.delete(
    `${API_URL}/${id}`
  );
};
