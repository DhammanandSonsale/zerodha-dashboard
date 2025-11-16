import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext  from "./GeneralContext"; // ✅ Named import for context
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");

  // ✅ Get the function from context using useContext
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      const quantity = parseInt(stockQuantity);
      const price = parseFloat(stockPrice);

      const response = await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: quantity,
        price: price,
        mode: "BUY",
      });

      console.log("Order placed:", response.data);
      closeBuyWindow(); // ✅ works now
    } catch (err) {
      console.error("Order failed:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow(); // ✅ works now
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default BuyActionWindow;
