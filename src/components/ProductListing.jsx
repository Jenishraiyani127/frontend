import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartslice';

const ProductListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=12');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h4 className="fw-bold mb-4">All Products Listing</h4>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-sm-6 col-md-3 mb-4" key={product.id}>
              <div className="card border-0">
                <div className="product-img" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="card-body card-bg">
                  <h6 className="fw-bold">{product.title}</h6>
                  <p className="small text-muted">{product.description}</p>
                  <p className="fw-bold">₹ {product.price}</p>
                  <button className="btn btn-dark w-100" onClick={() => dispatch(addToCart(product))}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-outline-dark" onClick={() => navigate('/cart')}>
          View My Cart
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
