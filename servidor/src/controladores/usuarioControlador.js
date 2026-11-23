// CONTROLADOR DE USUARIOS
// Lógica para listar, ver, crear y eliminar usuarios.
// Lo usa el administrador para registrar usuarios y la pantalla de perfil
import {
  leerUsuarios,
  buscarUsuario,
  crearUsuario,
  eliminarUsuario,
  limpiarUsuario,
  quitarPassword,
  ROLES,
} from '../servicios/usuarioServicio.js';

// LISTAR USUARIOS
// Devuelve todos los usuarios sin la contraseña
export async function listar(req, res) {
  const usuarios = await leerUsuarios();
  res.json({ ok: true, datos: usuarios.map(quitarPassword) });
}

// VER UN USUARIO
// Busca el usuario que viene en la dirección, por ejemplo /api/usuarios/productor
export async function ver(req, res) {
  const cuenta = await buscarUsuario(limpiarUsuario(req.params.usuario));
  if (!cuenta) {
    return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
  }
  res.json({ ok: true, datos: quitarPassword(cuenta) });
}

// CREAR USUARIO
// El administrador crea un usuario con su rol y su lote
export async function crear(req, res) {
  const { usuario, password, rol, nombre, telefono, lote } = req.body || {};
  const usuarioLimpio = limpiarUsuario(usuario);
  const passwordLimpia = String(password || '').trim();

  if (!usuarioLimpio || !passwordLimpia) {
    return res.status(400).json({ ok: false, mensaje: 'Debe enviar usuario y contraseña' });
  }
  if (rol && !ROLES.includes(rol)) {
    return res.status(400).json({ ok: false, mensaje: `El rol debe ser uno de estos: ${ROLES.join(', ')}` });
  }
  if (await buscarUsuario(usuarioLimpio)) {
    return res.status(409).json({ ok: false, mensaje: 'El usuario ya existe' });
  }

  const nuevo = await crearUsuario({ usuario: usuarioLimpio, password: passwordLimpia, rol, nombre, telefono, lote });
  res.status(201).json({ ok: true, mensaje: 'Usuario registrado', datos: nuevo });
}

// ELIMINAR USUARIO
export async function eliminar(req, res) {
  const borrado = await eliminarUsuario(limpiarUsuario(req.params.usuario));
  if (!borrado) {
    return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
  }
  res.json({ ok: true, mensaje: 'Usuario eliminado' });
}