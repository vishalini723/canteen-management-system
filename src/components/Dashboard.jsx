// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from 'axios';

// const Dashboard = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [error, setError] = useState("");
//   const location = useLocation();
//   // Retrieve userID and username from location state
//   const { userID, username } = location.state || {};
//   const [coinBalance, setCoinBalance] = useState(null); // State for coin balance

//   // Fetch all shops
//   useEffect(() => {
//     fetch("http://localhost:5000/shops")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch shops");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setShops(data);
//         setError("");
//       })
//       .catch((err) => setError(err.message));
//   }, []);

//   // Fetch products for a selected shop
//   const fetchProducts = (shopName) => {
//     setSelectedShop(shopName);
//     fetch(`http://localhost:5000/products/${shopName}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setError("");
//       })
//       .catch((err) => setError(err.message));
//   };


//  // Fetch user coins from the backend
//  useEffect(() => {
//   const fetchUserCoins = async () => {
//     try {
//       console.log('Fetching coins for userID:', userID); // Debug log
//       const response = await axios.post('http://localhost:5000/getUserCoins', { userID });
//       console.log('Response from backend:', response.data); // Log backend response
//       setCoinBalance(response.data.coins); // Update coin balance state
//     } catch (error) {
//       console.error('Error fetching coin balance:', error.response?.data || error.message);
//       setError('Failed to fetch coin balance. Please try again.');
//     }
//   };

//   if (userID) {
//     fetchUserCoins();
//   }
// }, [userID]);
//   return (
//     <div className="p-4">
//       {/* Display username and userID */}
//       {username && (
//         <h1 className="text-2xl font-bold mb-4">
//           Welcome, {username}! (User ID: {userID})
//         </h1>
//       )}
//       {coinBalance !== null ? (
//         <p className="text-4xl">Your Coin Balance: {coinBalance}</p>
//       ) : (
//         <p>Loading your coin balance...</p>
//       )}

//       {/* Error Message */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Shops */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Shops Available</h2>
//         <div className="grid grid-cols-5 gap-2">
//           {shops.length > 0 ? (
//             shops.map((shop, index) => (
//               <button
//                 key={index}
//                 onClick={() => fetchProducts(shop.shopName)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 {shop.shopName} ({shop.shopOwner})
//               </button>
//             ))
//           ) : (
//             <p>No shops available</p>
//           )}
//         </div>
//       </div>

//       {/* Products */}
//       {selectedShop && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">
//             Products for {selectedShop}
//           </h2>
//           {products.length > 0 ? (
//             <table className="w-full border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border px-4 py-2">Product Name</th>
//                   <th className="border px-4 py-2">Price</th>
//                   <th className="border px-4 py-2">Quantity</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product, index) => (
//                   <tr key={index}>
//                     <td className="border px-4 py-2">{product.productName}</td>
//                     <td className="border px-4 py-2">{product.price}</td>
//                     <td className="border px-4 py-2">{product.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No products found for this shop.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




















// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [error, setError] = useState("");
//   const [cart, setCart] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

  

//   // Retrieve userID and username from location state
//   const { userID, username } = location.state || {};
//   const [coinBalance, setCoinBalance] = useState(null); // State for coin balance

//   useEffect(() => {
//     fetch("http://localhost:5000/shops")
//       .then((response) => response.json())
//       .then((data) => setShops(data))
//       .catch((err) => setError("Failed to fetch shops"));
//   }, []);

//   const fetchProducts = (shopName) => {
//     setSelectedShop(shopName);
//     fetch(`http://localhost:5000/products/${shopName}`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch(() => setError("Failed to fetch products"));
//   };

//   useEffect(() => {
//     if (userID) {
//       axios
//         .post("http://localhost:5000/getUserCoins", { userID })
//         .then((response) => setCoinBalance(response.data.coins))
//         .catch(() => setError("Failed to fetch coin balance"));
//     }
//   }, [userID]);

//   const handleAddToCart = (product, shopName) => {
//     const existingItem = cart.find(
//       (item) => item.productName === product.productName && item.shopName === shopName
//     );

//     if (existingItem) {
//       setCart(
//         cart.map((item) =>
//           item.productName === product.productName && item.shopName === shopName
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, shopName, quantity: 1 }]);
//     }
//   };

//   const handleNavigateToCart = () => {
//     navigate("/cart", { state: { userID, username, coinBalance, cart } });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome, {username}! (User ID: {userID})
//       </h1>
//       {coinBalance !== null ? (
//         <p className="text-xl">Your Coin Balance: {coinBalance}</p>
//       ) : (
//         <p>Loading your coin balance...</p>
//       )}

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Shops Available</h2>
//         <div className="grid grid-cols-5 gap-2">
//           {shops.map((shop, index) => (
//             <button
//               key={index}
//               onClick={() => fetchProducts(shop.shopName)}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               {shop.shopName} ({shop.shopOwner})
//             </button>
//           ))}
//         </div>
//       </div>

//       {selectedShop && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Products for {selectedShop}</h2>
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Product Name</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Quantity</th>
//                 <th className="border px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{product.productName}</td>
//                   <td className="border px-4 py-2">{product.price}</td>
//                   <td className="border px-4 py-2">{product.quantity}</td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => handleAddToCart(product, selectedShop)}
//                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                     >
//                       Add to Cart
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <button
//         onClick={handleNavigateToCart}
//         className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-4"
//       >
//         View Cart
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
















// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
  

//   // Retrieve userID, username, coinBalance, and cart from location state or initialize default values
//   const { userID, username, cart: initialCart = [], coinBalance: initialCoinBalance = null } = location.state || {};
//   const [coinBalance, setCoinBalance] = useState(initialCoinBalance);
//   const [cart, setCart] = useState(initialCart); // Integrated cart persistence
  
//   // Fetch available shops on component mount
//   useEffect(() => {
//     fetch("http://localhost:5000/shops")
//       .then((response) => response.json())
//       .then((data) => setShops(data))
//       .catch((err) => setError("Failed to fetch shops"));
//   }, []);
  

//   // Fetch products for a specific shop
//   const fetchProducts = (shopName) => {
//     setSelectedShop(shopName);
//     fetch(`http://localhost:5000/products/${shopName}`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch(() => setError("Failed to fetch products"));
//   };

//   // Fetch coin balance from the backend when userID is available
//   useEffect(() => {
//     if (userID && coinBalance === null) {
//       axios
//         .post("http://localhost:5000/getUserCoins", { userID })
//         .then((response) => setCoinBalance(response.data.coins))
//         .catch(() => setError("Failed to fetch coin balance"));
//     }
//   }, [userID, coinBalance]);

//   // Add product to cart or update quantity if it already exists
//   const handleAddToCart = (product, shopName) => {
//     const existingItem = cart.find(
//       (item) => item.productName === product.productName && item.shopName === shopName
//     );

//     if (existingItem) {
//       setCart(
//         cart.map((item) =>
//           item.productName === product.productName && item.shopName === shopName
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, shopName, quantity: 1 }]);
//     }
//   };

//   // Navigate to the cart page and pass the current cart state
//   const handleNavigateToCart = () => {
//     navigate("/cart", { state: { userID, username, coinBalance, cart } });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome, {username}! (User ID: {userID})
//       </h1>
//       {coinBalance !== null ? (
//         <p className="text-xl">Your Coin Balance: {coinBalance}</p>
//       ) : (
//         <p>Loading your coin balance...</p>
//       )}

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Shops Available</h2>
//         <div className="grid grid-cols-5 gap-2">
//           {shops.map((shop, index) => (
//             <button
//               key={index}
//               onClick={() => fetchProducts(shop.shopName)}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               {shop.shopName} ({shop.shopOwner})
//             </button>
//           ))}
//         </div>
//       </div>

//       {selectedShop && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Products for {selectedShop}</h2>
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Product Name</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Quantity</th>
//                 <th className="border px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{product.productName}</td>
//                   <td className="border px-4 py-2">{product.price}</td>
//                   <td className="border px-4 py-2">{product.quantity}</td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => handleAddToCart(product, selectedShop)}
//                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                     >
//                       Add to Cart
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <button
//         onClick={handleNavigateToCart}
//         className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-4"
//       >
//         View Cart
//       </button>
//       <button onClick={() => navigate('/report', { state: { userID, username } })}>Go to Report</button>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userID, username, coinBalance, and cart from location state or initialize default values
  const { userID, username, cart: initialCart = [], coinBalance: initialCoinBalance = null } = location.state || {};
  const [coinBalance, setCoinBalance] = useState(initialCoinBalance);
  const [cart, setCart] = useState(initialCart); // Integrated cart persistence

  // Fetch available shops on component mount
  useEffect(() => {
    fetch("http://localhost:5000/shops")
      .then((response) => response.json())
      .then((data) => setShops(data))
      .catch((err) => setError("Failed to fetch shops"));
  }, []);

  // Fetch products for a specific shop
  const fetchProducts = (shopName) => {
    setSelectedShop(shopName);
    fetch(`http://localhost:5000/products/${shopName}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to fetch products"));
  };

  // Fetch coin balance from the backend when userID is available
  useEffect(() => {
    if (userID && coinBalance === null) {
      axios
        .post("http://localhost:5000/getUserCoins", { userID })
        .then((response) => setCoinBalance(response.data.coins))
        .catch(() => setError("Failed to fetch coin balance"));
    }
  }, [userID, coinBalance]);

  // Add product to cart or update quantity if it already exists
  const handleAddToCart = (product, shopName) => {
    const existingItem = cart.find(
      (item) => item.productName === product.productName && item.shopName === shopName
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productName === product.productName && item.shopName === shopName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, shopName, quantity: 1 }]);
    }
  };

  // Navigate to the cart page and pass the current cart state
  const handleNavigateToCart = () => {
    navigate("/cart", { state: { userID, username, coinBalance, cart } });
  };

  // Handle logout and navigate to login page
  const handleLogout = () => {
    // Clear any session data if needed
    setCart([]);
    setCoinBalance(null);
    navigate("/"); // Navigate to login page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {username}! (User ID: {userID})
      </h1>
      {coinBalance !== null ? (
        <p className="text-xl">Your Coin Balance: {coinBalance}</p>
      ) : (
        <p>Loading your coin balance...</p>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shops Available</h2>
        <div className="grid grid-cols-5 gap-2">
          {shops.map((shop, index) => (
            <button
              key={index}
              onClick={() => fetchProducts(shop.shopName)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {shop.shopName} ({shop.shopOwner})
            </button>
          ))}
        </div>
      </div>

      {selectedShop && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Products for {selectedShop}</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleAddToCart(product, selectedShop)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleNavigateToCart}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-4"
      >
        View Cart
      </button>
      <button
        onClick={() => navigate("/report", { state: { userID, username } })}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
      >
        Go to Report
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
