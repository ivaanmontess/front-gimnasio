const API_URL = 'https://backend-gimnasio-fqfn.onrender.com/usuarios';

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener usuarios con membresía próxima a vencer
export const obtenerUsuariosPorVencer = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/por-vencer`);
    if (!respuesta.ok) throw new Error('Error al obtener usuarios por vencer');
    return await respuesta.json();
  } catch (error) {
    console.error('❌ Error en obtenerUsuariosPorVencer:', error.message);
    return [];
  }
};

// Crear un nuevo usuario
export const crearUsuario = async (nuevoUsuario) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });
    return await res.json();
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    throw error;
  }
};
