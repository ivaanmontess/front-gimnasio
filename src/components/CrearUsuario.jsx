import React, { useState } from 'react';
import axios from 'axios';

export default function CrearUsuario({ onUsuarioCreado }) {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    dni: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    fechaVencimiento: '',
    membresiaActiva: '',
    fechaPago: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      const usuarioAEnviar = {
        ...nuevoUsuario,
        membresiaActiva: nuevoUsuario.membresiaActiva === 'true'
      };

      await axios.post(`https://backend-gimnasio-fqfn.onrender.com/usuarios`, usuarioAEnviar);
      alert('Usuario creado con éxito');
      setNuevoUsuario({
        dni: '',
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        fechaVencimiento: '',
        membresiaActiva: '',
        fechaPago: ''
      });
      onUsuarioCreado();
    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  return (
    <form onSubmit={handleCrearUsuario} className="formulario-usuario">
      {/* ... mismos campos que en App.jsx ... */}
    </form>
  );
}
