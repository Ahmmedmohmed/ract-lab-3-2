import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import logo from './1.png';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand text-secondary">Products App</NavLink>


      <div className="collapse navbar-collapse d-flex justify-content-end m-3">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink 
              to="/Register" 
              className="nav-link"
              activeClassName="active-link"
            >
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/login" 
              className="nav-link"
              activeClassName="active-link"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <NavLink to="/cart" style={{ display: 'inline-block', position: 'relative' }}>
              <img src={logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
              <p style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'transparent',
                color: 'lightgray',
                fontWeight: 'bold',
                fontSize: '12px',
                margin: 0,  
              }}>
                {totalQuantity}
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
