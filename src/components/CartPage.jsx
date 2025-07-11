import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../redux/slices/cartslice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-bg py-4">
      <div className="container cart-page">
        <h4 className="fw-bold text-center mb-4">My Cart</h4>

        <div className="d-none d-md-flex fw-bold pb-2 mb-3">
          <div className="col-md-6">Name</div>
          <div className="col-md-3">Price</div>
          <div className="col-md-3">Quantity</div>
        </div>

        {cartItems.map((item) => (
          <div
            className="row align-items-start align-items-md-center mb-4 p-3"
            key={item.id}
          >
            <div className="col-12 col-md-6 d-flex flex-column flex-md-row align-items-start">
              <div className="me-md-3 mb-2 mb-md-0">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="img-fluid"
                  style={{
                    width: '150px',
                    height: '60px',
                    objectFit: 'contain',
                    borderRadius: '6px',
                  }}
                />
              </div>
              <div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="small text-muted mb-0">{item.description}</p>
              </div>
            </div>

            <div className="col-6 col-md-3 mt-3 mt-md-0 fw-bold">
              ₹ {item.price}
            </div>

            <div className="col-6 col-md-3 mt-3 mt-md-0">
              <div className="d-flex align-items-center justify-content-md-start justify-content-end gap-2">
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="row fw-bold pt-3">
          <div className="col-md-6"></div>
          <div className="col-6 col-md-3 text-end text-md-end">Total</div>
          <div className="col-6 col-md-3 text-start">₹ {totalPrice.toFixed(2)} /-</div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
