import React, { useState } from 'react';
import axios from 'axios';

const ActualizarMembresia = ({ idUsuario }) => {
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://backend-gimnasio-fqfn.onrender.com/${idUsuario}`, {
        membresiaActiva: true,
        fechaPago
      });
      alert('Membresía actualizada con éxito');
    } catch (err) {
      alert('Error al actualizar la membresía');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Actualizar Membresía</h3>
      <label>Fecha de pago:</label>
      <input
        type="date"
        value={fechaPago}
        onChange={(e) => setFechaPago(e.target.value)}
        required
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ActualizarMembresia;
