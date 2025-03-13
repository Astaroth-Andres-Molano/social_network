// Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css'; 
import { useNavigate } from 'react-router-dom'; 

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');  //Estado para el contenido del nuevo post
  const [error, setError] = useState('');

  //Obtener el token de localStorage
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
        //Si no hay token se redirige al login
        window.location.href = '/';
        return;
      }

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (err) {
        console.error('Error al obtener las publicaciones:', err);
        setError('Error al cargar los posts');
      }
    };

    
      fetchPosts(); //Llamado a la función para cargar las publicaciones
    
  }, [token]);   //Dependencia del token para que solo se ejecute cuando el token cambie

  //Función para manejar el "like" de un post
  const handleLike = async (postId) => {
    try {
      await axios.post('http://localhost:5000/posts/like', 
        { postId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //Actualización de los posts después de dar like
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Error obteniendo like:', err);
    }
  };

  //Función para manejar la creación de un nuevo post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
        await axios.post(
            'http://localhost:5000/posts',
            { content: newPostContent },  //Contenido de la nueva publicación
            { headers: { Authorization: `Bearer ${token}` } }
          );

      const response = await axios.get('http://localhost:5000/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setPosts(response.data);  //Agregar el nuevo post al inicio
      setNewPostContent('');  //Limpiar el campo del formulario
    } catch (err) {
      setError('Error al crear la publicación');
    }
  };

  //Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  //Función para redireccionar a vista de perfil
  const handleViewProfile = () => {
    navigate('/profile');  
  };

  //Función para formatear la fecha
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'Fecha inválida' : parsedDate.toLocaleDateString();
  };

  return (
    <div className="posts-container">
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      <button className="view-profile-button" onClick={handleViewProfile}>Ver Perfil</button>
      <h2>Publicaciones Recientes</h2>

      
      <form onSubmit={handleCreatePost}>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Escribe tu publicación..."
          rows="4"
          cols="50"
          required
        />
        <button type="submit">Publicar</button>
      </form>

      {error && <p>{error}</p>}

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-author">{post.usuario.nombre}</span>
              <span className="post-date">{formatDate(post.createdAt)}</span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-footer">
              <button className="like-button" onClick={() => handleLike(post.id)}>
                👍 Like
              </button>
              <span className="like-count">{post.likes} Likes</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
