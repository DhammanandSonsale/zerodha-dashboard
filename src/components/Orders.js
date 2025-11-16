import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css"; // Create and style this

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3002/getOrders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="order-container">
      <h3 className="title">Orders ({orders.length})</h3>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td className={order.mode === "BUY" ? "green" : "red"}>
                    {order.mode}
                  </td>
                  <td style={{fontSize:"15px"}}>
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
