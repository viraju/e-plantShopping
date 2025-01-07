import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeItem } from "./CartSlice";
import './CartItem.css'; // Make sure you define styles for this file

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Handle Increment
  const handleIncrement = (id) => {
    console.log(id);
    dispatch(increment({ id }));
  };

  // Handle Decrement
  const handleDecrement = (id) => {
    console.log(id);
    dispatch(decrement({ id }));
  };

  // Handle Remove
  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const calculateSubtotal = (item) => {
    const subtotal = item.quantity * item.cost;
    return (Math.round(subtotal * 100) / 100).toFixed(2);  // Rounding to 2 decimal places
  };
  
  // Calculate Total for all items
  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.cost, 0);
    return (Math.round(total * 100) / 100).toFixed(2);  // Rounding to 2 decimal places
  };
  
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping(); // Call the function passed from the parent
    }
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container mx-auto max-w-7xl p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list space-y-6">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details flex-grow pl-4">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-cost">Price: {item.cost}</p>
                  <p className="cart-item-quantity">Subtotal: Rs.{calculateSubtotal(item)}</p>
                  <div className="cart-item-controls flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="cart-item-button cart-item-button-dec"
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="cart-item-button cart-item-button-inc"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="cart-item-delete"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total mt-6 text-right">
            <h3 className="total_cart_amount">
              Total: Rs.{calculateTotal()}
            </h3>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={handleContinueShopping} className="get-started-button">
              Continue Shopping
            </button><br/>
            <button  onClick={handleCheckoutShopping } className="get-started-button1">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
