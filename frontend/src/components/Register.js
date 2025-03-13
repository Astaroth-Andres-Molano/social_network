import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/logo_terpel.webp';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  //Estado para mostrar el mensaje de éxito
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password, nombre: name });
      //Timeout para redireccionar despues de registrar
      console.log('Usuario registrado:', response.data);
      setSuccess("Registro exitoso!");
      setTimeout(() => {
        navigate('/');  
      }, 2000);  
    } catch (err) {
      setError('Hubo un error al registrar al usuario');
    }
  };

  return (
    <div className="register-container">
      <img src={logo} alt="Terpel Logo" className="logo" />
      <h2>Ingresa tus datos</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirmar Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} 
    </div>
  );
};

export default Register;
