import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "./../apis/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';



const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);  
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  
  const handleBuyNow = () => {

    console.log('Buy now:', product);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const {
    images,
    name,
    category,
    brand,
    rating,
    description,
    price,
    discountPercentage
  } = product;

  const discountedPrice = discountPercentage ? price - (price * (discountPercentage / 100)) : price;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={images} className="img-fluid" alt={name} />
        </div>
        <div className="col-md-6">
          <h2>{name}</h2>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Brand:</strong> {brand}</p>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} style={{ color: index < rating ? 'orange' : 'gray' }}>★</span>
            ))}
          </div>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Price:</strong> {discountPercentage ? (
            <>
              <span style={{ textDecoration: 'line-through' }}>${price}</span> ${discountedPrice.toFixed(2)}
              <br />
              <span className="text-danger">Discount: {discountPercentage}%</span>
            </>
          ) : (
            `$${price}`
          )}</p>
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
