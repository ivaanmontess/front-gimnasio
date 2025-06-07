import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [dni, setDni] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    fechaVencimiento: '',
    membresiaActiva: false,
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

    // Convertir select a boolean para membresía
    if (name === 'membresiaActiva') {
      setNuevoUsuario(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      setNuevoUsuario(prev => ({ ...prev, [name]: value }));
    }
  };

  const buscarUsuario = async () => {
    if (!dni) return alert('Ingresá un DNI válido');

    setCargando(true);
    try {
      const res = await axios.get(`https://backend-gimnasio-fqfn.onrender.com/api/usuarios/${dni}`);
      setUsuario(res.data);
    } catch (err) {
      alert('Usuario no encontrado');
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      const usuarioAEnviar = { ...nuevoUsuario };
      if (!usuarioAEnviar.membresiaActiva) {
        delete usuarioAEnviar.fechaPago;
      }

      await axios.post(`https://backend-gimnasio-fqfn.onrender.com/api/usuarios`, usuarioAEnviar);
      alert('Usuario creado con éxito');

      setNuevoUsuario({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        fechaVencimiento: '',
        membresiaActiva: false,
        fechaPago: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  return (
    <div className={modoOscuro ? 'modo-oscuro' : 'modo-claro'}>
      <button onClick={toggleTema}>
        {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>

      <h2>Buscar Usuario por DNI</h2>
      <input
        type="text"
        placeholder="12345678"
        value={dni}
        onChange={(e) => {
          const soloNumeros = e.target.value.replace(/\D/, '');
          setDni(soloNumeros);
        }}
      />
      <button onClick={buscarUsuario}>Buscar</button>

      {cargando ? (
        <p>Buscando usuario...</p>
      ) : usuario && (
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
          <input type="text" name="nombre" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={nuevoUsuario.email} onChange={handleChange} required />
          <input type="text" name="telefono" placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={handleChange} />
          <input type="text" name="direccion" placeholder="Dirección" value={nuevoUsuario.direccion} onChange={handleChange} />
          <input type="date" name="fechaNacimiento" value={nuevoUsuario.fechaNacimiento} onChange={handleChange} />
          <input type="date" name="fechaVencimiento" value={nuevoUsuario.fechaVencimiento} onChange={handleChange} required />

          <label>
            ¿Pagó?
            <select name="membresiaActiva" value={nuevoUsuario.membresiaActiva ? 'true' : 'false'} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </label>

          {nuevoUsuario.membresiaActiva && (
            <input type="date" name="fechaPago" value={nuevoUsuario.fechaPago} onChange={handleChange} required />
          )}

          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
}
