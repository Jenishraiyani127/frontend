import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const productlist = location.state?.from?.pathname || '/productlist';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!username) errors.username = 'Invalid Email';
    if (!password) errors.password = 'Invalid Password';
    if (Object.keys(errors).length > 0) {
      setErrorMsg(errors);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg({});
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('userToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
     toast.success('Login successful!');
      navigate(productlist, { replace: true });
    } catch (error) {
      setErrorMsg({ username: 'Invalid Email', password: 'Invalid Password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="text-center text-white mb-4">Login</h2>

        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() =>
              setErrorMsg((prev) => ({ ...prev, username: !username ? 'Invalid Email' : '' }))
            }
            className={username ? 'filled' : ''}
          />
          <label className={username ? 'float' : ''}>Email</label>
          {errorMsg.username && <small className="error-msg">{errorMsg.username}</small>}
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setErrorMsg((prev) => ({ ...prev, password: !password ? 'Invalid Password' : '' }))
            }
            className={password ? 'filled' : ''}
          />
          <label className={password ? 'float' : ''}>Password</label>
          {errorMsg.password && <small className="error-msg">{errorMsg.password}</small>}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Go'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
