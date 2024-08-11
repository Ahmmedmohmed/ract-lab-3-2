import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.name}</h5>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.totalPrice}</p>
              </div>
              <div>
                <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))} className="btn btn-outline-danger">-</button>
                <button onClick={() => dispatch(increaseQuantity({ id: item.id }))} className="btn btn-outline-success">+</button>
                <button onClick={() => dispatch(removeFromCart({ id: item.id }))} className="btn btn-danger ml-3">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        <button onClick={() => dispatch(clearCart())} className="btn btn-danger mt-3">Clear Cart</button>
      </div>
    </div>
  );
};

export default CartPage;
