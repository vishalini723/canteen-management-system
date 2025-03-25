// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const ShopPage = () => {
//   const [shops, setShops] = useState([]);
//   const [error, setError] = useState("");
//   const [shopOwner, setShopOwner] = useState("");
//   const [password, setPassword] = useState("");
//   const [shopName, setShopName] = useState("");
//   const navigate = useNavigate(); // Initialize the navigate function

//   useEffect(() => {
//     // Fetch the shop list from the backend
//     axios
//       .get("http://localhost:5000/shops")
//       .then((response) => {
//         setShops(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching shops:", error.message);
//         setError("Failed to load shop list.");
//       });
//   }, []);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/shopowner", {
//         shopOwner,
//         password,
//       });

//       if (response.status === 201) {
//         alert("First-time login successful. Password saved!");
//       } else if (response.status === 200) {
//         alert("Login successful!");
//         const shopName = response.data.shopName;
//         setShopName(shopName);
        
//         // Redirect to the shop's page after login
//         navigate(`/shop/${shopName}`);
//       }
//     } catch (error) {
//       alert(error.response?.data?.error || "An error occurred.");
//     }
//   };

//   return (
//     <div className="px-4 py-8">
//       <h1 className="font-bold text-4xl text-blue-700 text-center mb-8">Shops List</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {shops.length > 0 ? (
//           shops.map((shop, index) => (
//             <div
//               className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
//               key={index}
//             >
//               <h2 className="text-2xl font-semibold text-blue-600">{shop.shopName}</h2>
//               <p className="text-gray-700">Owned by {shop.shopOwner}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No shops available</p>
//         )}
//       </div>

//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Enter Shop Owner Details</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="shopOwner" className="block text-lg font-medium">
//               Shop Owner:
//             </label>
//             <input
//               type="text"
//               id="shopOwner"
//               value={shopOwner}
//               onChange={(e) => setShopOwner(e.target.value)}
//               placeholder="Enter shop owner name"
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-lg font-medium">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;








import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");
  const [shopOwner, setShopOwner] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch the shop list from the backend
    axios
      .get("http://localhost:5000/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error.message);
        setError("Failed to load shop list.");
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", { shopOwner, password });

      const response = await axios.post("http://localhost:5000/shopowner", {
        shopOwner,
        password,
      });

      console.log("API Response:", response);

      if (response.status === 201) {
        alert("First-time login successful. Password saved!");
      } else if (response.status === 200 && response.data.shopName) {
        alert("Login successful!");
        const shopName = response.data.shopName;
        navigate(`/shop/${shopName}`); // Redirect to shop page
      } else {
        alert("Unexpected response format. Please try again.");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      alert(error.response?.data?.error || error.message || "An error occurred.");
    }
  };

  return (
    <div className="px-4 py-8">
      <h1 className="font-bold text-4xl text-blue-700 text-center mb-8">Shops List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shops.length > 0 ? (
          shops.map((shop, index) => (
            <div
              className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
              key={index}
            >
              <h2 className="text-2xl font-semibold text-blue-600">{shop.shopName}</h2>
              <p className="text-gray-700">Owned by {shop.shopOwner}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No shops available</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Enter Shop Owner Details</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="shopOwner" className="block text-lg font-medium">
              Shop Owner:
            </label>
            <input
              type="text"
              id="shopOwner"
              value={shopOwner}
              onChange={(e) => setShopOwner(e.target.value)}
              placeholder="Enter shop owner name"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopPage;