import React from 'react';
import Home from '../components/Home.jsx';
import Login from '../components/Login.jsx';
import ProductListing from '../components/ProductListing.jsx';
import CartPage from '../components/CartPage.jsx';
export const HomeRoute = {
  path: "/",
  element: <Home />,
};

export const LoginRoute = {
  path: "/login",
  element: <Login />,
};
export const ProductListRoute = {
  path: "/productlist",
  element: <ProductListing />,
};
export const CartPageRoute = {
  path: "/cart",
  element: <CartPage />,
};




