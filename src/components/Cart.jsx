// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const CartPage = () => {
//   const location = useLocation();
//   const { cartItems = [], coinBalance, studentName } = location.state || {};
//   const navigate = useNavigate();

//   // Calculate the total price of all cart items
//   const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

//   // Handle proceed to buy and update balance
//   const handleProceedToBuy = () => {
//     if (coinBalance >= totalAmount) {
//       const updatedBalance = coinBalance - totalAmount; // Deduct amount from balance
//       alert(`Purchase successful! You spent ${totalAmount} coins. Your new balance is ${updatedBalance} coins.`);
//       navigate('/balance', { state: { coinBalance: updatedBalance, studentName, allCartItems: [] } });
//     } else {
//       alert('Not enough balance to complete the purchase.');
//     }
//   };

//   const handleGoBack = () => {
//     navigate('/balance', { state: { coinBalance, studentName, allCartItems: cartItems } });
//   };

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <h2>{studentName}'s Cart</h2>
//       <h3>Total Amount: {totalAmount} coins</h3>

//       {cartItems.length > 0 ? (
//         <ul>
//           {cartItems.map((item, index) => (
//             <li key={index}>
//               {item.name} - {item.price} coins
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}

//       <button onClick={handleProceedToBuy} disabled={totalAmount === 0}>
//         Proceed to Buy
//       </button>
//       <button onClick={handleGoBack}>Go Back</button>
//     </div>
//   );
// };

// export default CartPage;






// import React from "react";
// import { useLocation } from "react-router-dom";

// const Cart = () => {
//   const location = useLocation();
//   const { userID, username, coinBalance, cart } = location.state || {};

//   const totalCoins = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Cart</h1>
//       <p>User: {username} (ID: {userID})</p>
//       <p>Coin Balance: {coinBalance}</p>

//       {cart.length > 0 ? (
//         <table className="w-full border border-gray-300 mt-4">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Product Name</th>
//               <th className="border px-4 py-2">Shop Name</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Quantity</th>
//               <th className="border px-4 py-2">Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((item, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{item.productName}</td>
//                 <td className="border px-4 py-2">{item.shopName}</td>
//                 <td className="border px-4 py-2">{item.price}</td>
//                 <td className="border px-4 py-2">{item.quantity}</td>
//                 <td className="border px-4 py-2">{item.price * item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No items in the cart</p>
//       )}

//       <h2 className="text-xl font-bold mt-4">Total Coins: {totalCoins}</h2>
//     </div>
//   );
// };

// export default Cart;








import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userID, username, coinBalance, cart: initialCart } = location.state || {};
  const [cart, setCart] = useState(initialCart || []);

  // Calculate total coins
  const totalCoins = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  const placeOrder = async () => {
    try {
      for (const item of cart) {
        const response = await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID, // Automatically include the user's unique ID
            item,  // Product details
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error placing order:", errorData);
          throw new Error("Failed to place the order.");
        }
      }
      alert("Order placed successfully!");
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };
  
  // const placeOrder = async () => {
  //   try {
  //     let newCoinBalance = coinBalance - totalCoins; // Calculate the remaining balance
  
  //     if (newCoinBalance < 0) {
  //       alert("Insufficient coin balance to place the order.");
  //       return;
  //     }
  
  //     for (const item of cart) {
  //       const response = await fetch("http://localhost:5000/orders", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           userID, // Automatically include the user's unique ID
  //           item,  // Product details
  //         }),
  //       });
  
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error("Error placing order:", errorData);
  //         throw new Error("Failed to place the order.");
  //       }
  //     }
  
  //     // Update the coin balance in the backend (if applicable)
  //     const balanceResponse = await fetch("http://localhost:5000/updateCoinBalance", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userID,
  //         newCoinBalance,
  //       }),
  //     });
  
  //     if (!balanceResponse.ok) {
  //       throw new Error("Failed to update coin balance.");
  //     }
  
  //     // Update the local state for coin balance
  //     alert("Order placed successfully!");
  //     setCart([]);
  //     navigate("/dashboard", {
  //       state: { userID, username, coinBalance: newCoinBalance, cart: [] },
  //     });
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert("Failed to place the order. Please try again.");
  //   }
  // };
  




  // Handle removing a product or decreasing its quantity
  const handleRemove = (productIndex) => {
    const updatedCart = cart
      .map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0
    setCart(updatedCart);
  };

  // Handle cancel order
  const handleCancelOrder = () => {
    setCart([]); // Clear the cart
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <p>User: {username} (ID: {userID})</p>
      <p>Coin Balance: {coinBalance}</p>

      {cart.length > 0 ? (
        <table className="w-full border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Shop Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.productName}</td>
                <td className="border px-4 py-2">{item.shopName}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.price * item.quantity}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart</p>
      )}

      <h2 className="text-xl font-bold mt-4">Total Coins: {totalCoins}</h2>

      <div className="flex gap-4 mt-4">
        {/* Back to Dashboard */}
        <button
          onClick={() =>
            navigate("/dashboard", {
              state: { userID, username, coinBalance, cart },
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>

        {/* Cancel Order */}
        <button
          onClick={handleCancelOrder}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel Order
        </button>
      </div>
      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default Cart;




