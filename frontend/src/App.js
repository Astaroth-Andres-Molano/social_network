// App.js
import React, { useState, useEffect } from 'react';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';  // Importamos Routes
import Login from './components/Login';
import Perfil from './components/Perfil';
import Posts from './components/Posts';
import Register from './components/Register';

const App = () => {
  const [token, setToken] = useState(null);  // Estado para almacenar el token

  // Cargar el token desde localStorage cuando la página se carga o se recarga
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Si hay un token en localStorage, lo cargamos en el estado
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/" element={<Login setToken={setToken} />} />
          
          
          <Route path="/register" element={<Register />} />
          
          {/* Ruta de Posts - Solo accesible si hay un token */}
          {token && (
            <Route path="/posts" element={<Posts token={token} />} />
          )}
          
          {/* Ruta de Profile - Solo accesible si hay un token */}
          {token && (
            <Route path="/profile" element={<Perfil token={token} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

