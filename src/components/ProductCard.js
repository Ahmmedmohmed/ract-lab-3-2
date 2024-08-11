import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const stockText = product.stock > 0 ? 'In Stock' : 'Out of Stock';
  const stockColor = product.stock > 0 ? 'green' : 'red';

  return (
    <div className="card" style={{ width: '18rem' }}>
      <Link to={`/products/${product.id}`}>
        <img src={product.images} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <p className="card-text" style={{ color: stockColor }}>
            {stockText}
          </p>
          <div className="card-text">
            {/* Add any additional information here */}
          </div>
        </div>
      </Link>
      <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} style={{ color: index < product.rating ? 'orange' : 'gray' }}>★</span>
            ))}
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>  
            </div>
  );
};

export default ProductCard;
