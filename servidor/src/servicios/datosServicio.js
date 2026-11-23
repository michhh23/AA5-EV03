// Lee y guarda las listas en archivos JSON dentro de la carpeta datos.
import { readFile, writeFile, mkdir } from 'fs/promises';

// Ubicación de la carpeta donde se guardan los archivos
const CARPETA_DATOS = new URL('../../datos/', import.meta.url);

// LEER UNA LISTA
// Lee el archivo con el nombre que se le pasa, por ejemplo alertas.
export async function leer(nombre, datosIniciales = []) {
  const archivo = new URL(`${nombre}.json`, CARPETA_DATOS);
  try {
    const texto = await readFile(archivo, 'utf-8');
    return JSON.parse(texto);
  } catch {
    await guardar(nombre, datosIniciales);
    return [...datosIniciales];
  }
}

// GUARDAR UNA LISTA
// Crea la carpeta datos si no existe y escribe la lista en su archivo
export async function guardar(nombre, lista) {
  await mkdir(CARPETA_DATOS, { recursive: true });
  const archivo = new URL(`${nombre}.json`, CARPETA_DATOS);
  await writeFile(archivo, JSON.stringify(lista, null, 2));
}

// SIGUIENTE ID
// Busca el id más alto de la lista y le suma uno
export function siguienteId(lista) {
  const ids = lista.map((elemento) => elemento.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

// FECHA DE HOY
// Devuelve la fecha de hoy en formato AAAA-MM-DD
export function fechaHoy() {
  return new Date().toISOString().slice(0, 10);
}