import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Perfil.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige al login
      navigate('/');
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError('Error al cargar el perfil.');
      }
    };

    fetchUserProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirigir al login después de cerrar sesión
  };

  const handleViewPosts = () => {
    navigate('/posts'); // Redirige a la página de publicaciones
  };

  return (
    <div className="profile-container">
      {/* Botón de cerrar sesión */}
      <button className="logout-button-pro" onClick={handleLogout}>Cerrar sesión</button>
      <h2>Perfil del Usuario</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user ? (
        <div>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Otros datos del perfil si los necesitas */}
          
          

          {/* Botón para ver las noticias (posts) */}
          <button className="view-posts-button" onClick={handleViewPosts}>Ver Noticias</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Profile;
