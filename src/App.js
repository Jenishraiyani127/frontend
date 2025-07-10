// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartPageRoute, HomeRoute, LoginRoute, ProductListRoute } from "./routes/routes";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="nav-padding">
          <Routes>
            <Route path={HomeRoute.path} element={HomeRoute.element} />
            <Route path={LoginRoute.path} element={LoginRoute.element} />
            <Route
              path={ProductListRoute.path}
              element={<PrivateRoute>{ProductListRoute.element}</PrivateRoute>}
            />
            <Route
              path={CartPageRoute.path}
              element={<PrivateRoute>{CartPageRoute.element}</PrivateRoute>}
            />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
