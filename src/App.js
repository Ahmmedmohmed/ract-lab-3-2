import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navebar';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

const ProductList = lazy(() => import('./components/ProductList'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Cart = lazy(() => import('./components/Cart'));
const NotFound = lazy(() => import('./components/NotFound'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
