import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, crearUsuario } from './services/userService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './index.css'; 

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [activo, setActivo] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaVencimiento: '',
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const datos = await obtenerUsuarios();
    setUsuarios(datos);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Usuarios', 10, 10);
    const filas = usuarios.map(u => [
      u.nombre,
      u.email,
      u.telefono || '-',
      u.fechaVencimiento?.substring(0, 10) || 'No registrada',
      u.membresiaActiva ? 'Activa' : 'Vencida',
    ]);
    autoTable(doc, {
      head: [['Nombre', 'Email', 'Teléfono', 'Vencimiento', 'Estado']],
      body: filas,
    });
    doc.save('usuarios.pdf');
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(nuevoUsuario);
      setNuevoUsuario({ nombre: '', email: '', telefono: '', fechaVencimiento: '' });
      setMostrarFormulario(false);
      cargarUsuarios();
    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="titulo">Panel de Administración</h1>

      <div className="acciones">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Cancelar' : 'Crear Usuario'}
        </button>
        <button onClick={exportarPDF}>Exportar PDF</button>
      </div>

      {mostrarFormulario && (
        <form className="formulario-usuario" onSubmit={handleCrearUsuario}>
          <input type="text" name="nombre" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={nuevoUsuario.email} onChange={handleChange} required />
          <input type="text" name="telefono" placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={handleChange} />
          <input type="date" name="fechaVencimiento" value={nuevoUsuario.fechaVencimiento} onChange={handleChange} required />
          <button type="submit">Guardar</button>
        </form>
      )}

      <ul className="lista-usuarios">
        {usuariosFiltrados.map((usuario, i) => (
          <li key={i} className="usuario-item">
            <div
              className="usuario-header"
              onClick={() => setActivo(activo === i ? null : i)}
            >
              <strong>{usuario.nombre}</strong>
              <span>{usuario.membresiaActiva ? '✅ Activa' : '❌ Vencida'}</span>
            </div>
            {activo === i && (
              <div className="usuario-detalles">
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono || '-'}</p>
                <p><strong>Vence:</strong> {usuario.fechaVencimiento?.substring(0, 10) || '-'}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
