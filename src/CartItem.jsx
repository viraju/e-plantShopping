import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeItem } from "./CartSlice";
import './CartItem.css'; // Make sure you define styles for this file

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Handle Increment
  const handleIncrement = (id) => {
    dispatch(increment({ id }));
  };

  // Handle Decrement
  const handleDecrement = (id) => {
    dispatch(decrement({ id }));
  };

  // Handle Remove
  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const calculateSubtotal = (item) => {
    const subtotal = item.quantity * item.cost;
    console.log(subtotal);
    return (Math.round(subtotal * 100) / 100).toFixed(2);  // Rounding to 2 decimal places
  };
  
  // Calculate Total for all items
  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.cost, 0);
    console.log(total);
    return (Math.round(total * 100) / 100).toFixed(2);  // Rounding to 2 decimal places
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
                  className="cart-item-image w-24 h-24 object-cover rounded-md"
                />
                <div className="cart-item-details flex-grow pl-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: {item.cost}</p>
                  <p className="text-gray-600">Subtotal: Rs.{calculateSubtotal(item)}</p>
                  <div className="cart-item-controls flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total mt-6 text-right">
            <h3 className="text-2xl font-semibold">
              Total: Rs. ${calculateTotal()}
            </h3>
          </div>
          <div className="mt-6 flex justify-between">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Continue Shopping
            </button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
