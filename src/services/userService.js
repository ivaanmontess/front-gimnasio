const API_URL = 'http://localhost:3000/api/usuarios'; 


export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/usuarios');
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};


 
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
