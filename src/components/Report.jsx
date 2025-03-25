// import React, { useState } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// import { useLocation } from "react-router-dom";

// const Report = () => {
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const location = useLocation();
//   const { userID, username } = location.state || {};
//   const [orders, setOrders] = useState([]);

  
//   const fetchOrders = async () => {
//     if (!month || !year) {
//       alert("Please enter both month and year.");
//       return;
//     }

//     const response = await fetch(`http://localhost:5000/orders?month=${month}&year=${year}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userID}`,
//       },
//     });

//     const data = await response.json();

//     if (data.message) {
//       alert(data.message);
//     } else {
//       setOrders(data);
//     }
//   };

//   // Function to generate and download PDF
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
  
//     // Add title
//     doc.text(`Report for ${username}`, 14, 20);
  
//     // Prepare the table data
//     const tableColumn = ["Shop Name", "Product Name", "Quantity", "Price", "Date"];
//     const tableRows = orders.map((order) => [
//       order.shopName,
//       order.productName,
//       order.quantity,
//       order.price,
//       new Date(order.date).toLocaleDateString(),
//     ]);
  
//     // Add the table
//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       theme: "grid",
//       headStyles: { fillColor: [41, 128, 185] }, // Customize header color
//     });
  
//     // Save the PDF with a filename
//     doc.save(`report_${month}_${year}.pdf`);
//   };
  


  
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome, {username}! (User ID: {userID})
//       </h1>
//       <h1>Generate Report</h1>
//       <label>
//         Month:
//         <input
//           type="number"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           min="1"
//           max="12"
//           placeholder="Enter Month (1-12)"
//         />
//       </label>
//       <br />
//       <label>
//         Year:
//         <input
//           type="number"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="Enter Year"
//         />
//       </label>
//       <br />
//       <button onClick={fetchOrders}>Generate</button>
  
//       <h2>Orders</h2>
//       {orders.length > 0 ? (
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Shop Name</th>
//                 <th>Product Name</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={index}>
//                   <td>{order.shopName}</td>
//                   <td>{order.productName}</td>
//                   <td>{order.quantity}</td>
//                   <td>{order.price}</td>
//                   <td>{new Date(order.date).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
  
//           {/* Download PDF Button */}
//           <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//             Download PDF
//           </button>
          
//         </div>
//       ) : (
//         <p>No orders found for the selected month and year.</p>
//       )}
//     </div>
//   );
// }  

// export default Report;



import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useLocation, useNavigate } from "react-router-dom";

const Report = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { userID, username, cart: initialCart = [], coinBalance: initialCoinBalance = null } = location.state || {};
  const [coinBalance, setCoinBalance] = useState(initialCoinBalance);
  const [cart, setCart] = useState(initialCart); 
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!month || !year) {
      alert("Please enter both month and year.");
      return;
    }

    const response = await fetch(`http://localhost:5000/orders?month=${month}&year=${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userID}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      alert(data.message);
    } else {
      setOrders(data);
    }
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);

    // Add title
    doc.text(`Report for ${username}`, 14, 20);

    // Prepare the table data
    const tableColumn = ["Shop Name", "Product Name", "Quantity", "Price", "Date"];
    const tableRows = orders.map((order) => [
      order.shopName,
      order.productName,
      order.quantity,
      order.price,
      new Date(order.date).toLocaleDateString(),
    ]);

    // Add the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] }, // Customize header color
    });

    // Save the PDF with a filename
    doc.save(`report_${month}_${year}.pdf`);
  };

  // Navigate back to dashboard
  const goToDashboard = () => {
    navigate("/dashboard", {
      state: { userID, username, coinBalance, cart },
    }); // Replace "/dashboard" with the correct path to your dashboard page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {username}! (User ID: {userID})
      </h1>
      <h1>Generate Report</h1>
      <label>
        Month:
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          min="1"
          max="12"
          placeholder="Enter Month (1-12)"
        />
      </label>
      <br />
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
        />
      </label>
      <br />
      <button onClick={fetchOrders}>Generate</button>

      <h2>Orders</h2>
      {orders.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.shopName}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Download PDF Button */}
          <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Download PDF
          </button>
        </div>
      ) : (
        <p>No orders found for the selected month and year.</p>
      )}

      {/* Back to Dashboard Button */}
      <button onClick={goToDashboard} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Report;
