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

      await axios.post(`https://backend-gimnasio-fqfn.onrender.com/api/usuarios`, usuarioAEnviar);
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
      <label>DNI</label>
      <input type="text" name="dni" placeholder="DNI" value={nuevoUsuario.dni} onChange={handleChange} required />

      <label>Nombre y apellido</label>
      <input type="text" name="nombre" placeholder="Nombre completo" value={nuevoUsuario.nombre} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" placeholder="Email" value={nuevoUsuario.email} onChange={handleChange} required />

      <label>Teléfono</label>
      <input type="text" name="telefono" placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={handleChange} />

      <label>Dirección</label>
      <input type="text" name="direccion" placeholder="Dirección" value={nuevoUsuario.direccion} onChange={handleChange} />

      <label>Fecha de nacimiento</label>
      <input type="date" name="fechaNacimiento" value={nuevoUsuario.fechaNacimiento} onChange={handleChange} />

      <label>Fecha de vencimiento de membresía</label>
      <input type="date" name="fechaVencimiento" value={nuevoUsuario.fechaVencimiento} onChange={handleChange} required />

      <label>¿Pagó la membresía?</label>
      <select name="membresiaActiva" value={nuevoUsuario.membresiaActiva} onChange={handleChange} required>
        <option value="">Seleccionar</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>

      {nuevoUsuario.membresiaActiva === 'true' && (
        <>
          <label>Fecha de pago</label>
          <input type="date" name="fechaPago" value={nuevoUsuario.fechaPago} onChange={handleChange} required />
        </>
      )}

      <button type="submit">Guardar</button>
    </form>
  );
}
