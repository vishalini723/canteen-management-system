import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation

const ShopDetailsPage = () => {
  const { shopName } = useParams(); // Get shopName from URL
  const navigate = useNavigate(); // Initialize useNavigate for logout
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");

  useEffect(() => {
    // Fetch products for the shop dynamically based on shopName
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/shop/products?shopName=${encodeURIComponent(shopName)}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        alert("Failed to load products for this shop.");
      }
    };

    fetchProducts();
  }, [shopName]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/shop/addProduct", {
        shopName,
        productName: newProductName,
        price: newProductPrice,
        quantity: newProductQuantity,
      });
      setProducts([...products, response.data]);
      setNewProductName("");
      setNewProductPrice("");
      setNewProductQuantity("");
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  const handleLogout = () => {
    // Clear any stored user session data if needed
    // Example: localStorage.clear();
    alert("You have been logged out!");
    navigate("/"); // Redirect to the login or home page
  };

  return (
    <div className="px-4 py-8">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">
        Products in {shopName}
      </h1>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProductQuantity}
          onChange={(e) => setNewProductQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleAddProduct}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-bold">{product.productName}</h3>
                <p className="text-gray-700">Price: {product.price}</p>
                <p className="text-gray-500">Quantity: {product.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products available for this shop.</p>
        )}
      </div>
    </div>
  );
};

export default ShopDetailsPage;