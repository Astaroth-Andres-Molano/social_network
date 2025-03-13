import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  
import logo from '../assets/images/logo_terpel.webp';  // logo
import { useNavigate, Link } from 'react-router-dom';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  //El hook useNavigate para navegar después de hacer login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('http://localhost:5000/login', { email, password });
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);  // GuardaR el token en local storage
      navigate('/posts');  // RedirigiR al usuario a la página de posts
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Terpel Logo" className="logo" />
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register" className="register-link">¿No tienes una cuenta? Regístrate</Link>
    </div>
  );
};

export default Login;
