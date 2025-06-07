// App.jsx (Panel Web)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [dni, setDni] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
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

  useEffect(() => {
    const tema = localStorage.getItem('tema');
    if (tema) setModoOscuro(tema === 'oscuro');
  }, []);

  const toggleTema = () => {
    const nuevoTema = !modoOscuro;
    setModoOscuro(nuevoTema);
    localStorage.setItem('tema', nuevoTema ? 'oscuro' : 'claro');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({ ...prev, [name]: value }));
  };

  const buscarUsuario = async () => {
    try {
      const res = await axios.get(`https://backend-gimnasio-fqfn.onrender.com/api/usuarios/${dni}`);
      setUsuario(res.data);
    } catch (err) {
      alert('Usuario no encontrado');
      setUsuario(null);
    }
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
      setMostrarFormulario(false);
    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  return (
    <div className={modoOscuro ? 'modo-oscuro' : 'modo-claro'}>
      <div className="contenedor-principal">
        <h1 className="titulo">Panel de administración - Talero Gimnasio</h1>

        <button onClick={toggleTema}>
          {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>

        <div className="buscador">
          <h2>Buscar Usuario por DNI</h2>
          <input
            type="text"
            placeholder="12345678"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <button onClick={buscarUsuario}>Buscar</button>
        </div>

        {usuario && (
          <div className="tarjeta-usuario">
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Fecha de pago:</strong> {usuario.fechaPago?.substring(0, 10) || '-'}</p>
          </div>
        )}

        <button onClick={() => setMostrarFormulario(true)}>+ Crear nuevo usuario</button>

        {mostrarFormulario && (
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
        )}
      </div>
    </div>
  );
}
