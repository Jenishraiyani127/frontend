import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav className="navbar navbar-dark nav-padding" style={{ backgroundColor: '#333' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand text-white fw-bold" to="/">Hashtechy</Link>

          {isLoggedIn && (
            <div className="d-flex align-items-center gap-3">
              <button className="btn text-white fs-5" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn text-white" onClick={() => setSidebarOpen(true)}>
                <img src="/Vector.png" alt="Menu" height={24} width={24} />
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center p-3">
          <h6 className="mb-0">Close Menu</h6>
          <button className="btn btn-sm" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="p-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">Categories</li>

            <li className="mb-2">
              <Link
                to="/productlist"
                className="text-decoration-none text-dark mb-3"
                onClick={() => setSidebarOpen(false)}
              >
                Product List
              </Link>
            </li>

            <li className="mb-2">
              <Link
                to="/cart"
                className="text-decoration-none text-dark mb-3"
                onClick={() => setSidebarOpen(false)}
              >
                View my Cart
              </Link>
            </li>

            <li className="mb-2 d-flex justify-content-between align-items-center">
              <span>Makeup</span>
              <button className="btn btn-lg py-0" onClick={() => toggleMenu('makeup')}>
                {expandedMenus['makeup'] ? '−' : '+'}
              </button>
            </li>

            {expandedMenus['makeup'] && (
              <ul className="ps-3 mb-3 list-unstyled">
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Face Makeup</Link></li>
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Lip Makeup</Link></li>
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Eye Makeup</Link></li>
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Brushes & Tools</Link></li>
              </ul>
            )}

            <li className="mb-2 d-flex justify-content-between align-items-center">
              <span>Skincare</span>
              <button className="btn btn-lg py-0" onClick={() => toggleMenu('skincare')}>
                {expandedMenus['skincare'] ? '−' : '+'}
              </button>
            </li>

            {expandedMenus['skincare'] && (
              <ul className="ps-3 mb-3 list-unstyled">
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Face Wash</Link></li>
                <li><Link to="#" onClick={() => setSidebarOpen(false)} className="text-decoration-none text-dark">Moisturizer</Link></li>
              </ul>
            )}
          </ul>
        </div>
      </div>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
