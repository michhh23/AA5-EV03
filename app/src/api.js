// CONEXIÓN CON EL SERVIDOR
// Todas las pantallas usan pedirApi para hablar con los servicios web.
// Así la dirección del servidor y el manejo de errores están en un solo lugar

// Dirección donde corre el servidor
export const URL_API = 'http://localhost:3000/api';

// PEDIR DATOS AL SERVIDOR
// Recibe la ruta, el método y los datos que se envían.
// Siempre devuelve un objeto con ok y mensaje, igual que el servidor,
// y si el servidor está apagado devuelve el error de conexión
export async function pedirApi(ruta, metodo = 'GET', cuerpo) {
  try {
    const respuesta = await fetch(`${URL_API}${ruta}`, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
    return await respuesta.json();
  } catch {
    return { ok: false, mensaje: 'No se pudo conectar con el servidor' };
  }
}