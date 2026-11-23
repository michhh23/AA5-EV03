// SERVICIO DE USUARIOS
// Se encarga de guardar y buscar los usuarios en datos/usuarios.json.
// Las contraseñas se guardan cifradas con bcrypt, nunca como texto normal
import bcrypt from 'bcryptjs';
import { leer, guardar } from './datosServicio.js';

// ROLES QUE EXISTEN EN LA APP
export const ROLES = ['admin', 'agronomo', 'gerencia', 'productor'];

// LIMPIAR EL USUARIO
// Quita espacios y lo pasa a minúscula, igual que hacía el login de la app
export function limpiarUsuario(usuario) {
  return String(usuario || '').trim().toLowerCase().replace(/\s+/g, '');
}

// LEER TODOS LOS USUARIOS
// Los usuarios viejos que no tenían rol quedan como productor
export async function leerUsuarios() {
  const usuarios = await leer('usuarios');
  return usuarios.map((u) => ({ rol: 'productor', nombre: '', telefono: '', lote: '', ...u }));
}

// BUSCAR UN USUARIO
// Devuelve el usuario si existe, si no devuelve undefined
export async function buscarUsuario(usuario) {
  const usuarios = await leerUsuarios();
  return usuarios.find((u) => u.usuario === usuario);
}

// CREAR UN USUARIO
// Cifra la contraseña y agrega el usuario nuevo a la lista
export async function crearUsuario(datos) {
  const usuarios = await leerUsuarios();
  const passwordCifrada = await bcrypt.hash(datos.password, 10);
  const nuevo = {
    usuario: datos.usuario,
    password: passwordCifrada,
    rol: datos.rol || 'productor',
    nombre: datos.nombre || '',
    telefono: datos.telefono || '',
    lote: datos.lote || '',
  };
  usuarios.push(nuevo);
  await guardar('usuarios', usuarios);
  return quitarPassword(nuevo);
}

// ELIMINAR UN USUARIO
// Devuelve verdadero si lo encontró y lo borró
export async function eliminarUsuario(usuario) {
  const usuarios = await leerUsuarios();
  const restantes = usuarios.filter((u) => u.usuario !== usuario);
  if (restantes.length === usuarios.length) {
    return false;
  }
  await guardar('usuarios', restantes);
  return true;
}

// VALIDAR LA CONTRASEÑA
// Compara la contraseña escrita con la cifrada que está guardada
export async function validarPassword(password, passwordCifrada) {
  return bcrypt.compare(password, passwordCifrada);
}

// QUITAR LA CONTRASEÑA
export function quitarPassword(usuario) {
  const { password, ...resto } = usuario;
  return resto;
}

// USUARIOS INICIALES
// Crea los mismos usuarios que tenía la app móvil si todavía no existen
export async function crearUsuariosIniciales() {
  if (!(await buscarUsuario('productor'))) {
    await crearUsuario({ usuario: 'productor', password: '1234', rol: 'productor', nombre: 'Productor asociado' });
  }
  if (!(await buscarUsuario('admin'))) {
    await crearUsuario({ usuario: 'admin', password: '123', rol: 'admin', nombre: 'Argenis Yadir Mercado Triana', telefono: '3234662288' });
  }
}