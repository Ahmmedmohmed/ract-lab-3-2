import React, { useEffect, useState } from 'react';
import axiosInstance from "./../apis/config";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');  // استدعاء API لجلب المنتجات
        setProducts(response.data.products);  // افترض أن استجابة API تحتوي على قائمة المنتجات في 'products'
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container ">
      <div className="row mb-4">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
