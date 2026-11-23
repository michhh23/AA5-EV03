// CONTROLADOR DE AUTENTICACIÓN
// registro e inicio de sesión.
// Revisa los datos que llegan y decide qué respuesta devolver
import { buscarUsuario, crearUsuario, validarPassword, limpiarUsuario } from '../servicios/usuarioServicio.js';

// REGISTRO
// Recibe usuario y contraseña, y si quiere nombre y teléfono.
export async function registrar(req, res) {
  const { usuario, password, nombre, telefono } = req.body || {};
  const usuarioLimpio = limpiarUsuario(usuario);
  const passwordLimpia = String(password || '').trim();

  if (!usuarioLimpio || !passwordLimpia) {
    return res.status(400).json({ ok: false, mensaje: 'Debe enviar usuario y contraseña' });
  }

  if (await buscarUsuario(usuarioLimpio)) {
    return res.status(409).json({ ok: false, mensaje: 'El usuario ya existe' });
  }

  await crearUsuario({ usuario: usuarioLimpio, password: passwordLimpia, rol: 'productor', nombre, telefono });
  res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
}

// INICIO DE SESIÓN
// Compara el usuario y la contraseña con los guardados.
// Si coinciden responde autenticación satisfactoria con el rol del usuario
export async function iniciarSesion(req, res) {
  const { usuario, password } = req.body || {};
  const usuarioLimpio = limpiarUsuario(usuario);
  const passwordLimpia = String(password || '').trim();

  if (!usuarioLimpio || !passwordLimpia) {
    return res.status(400).json({ ok: false, mensaje: 'Debe enviar usuario y contraseña' });
  }

  const cuenta = await buscarUsuario(usuarioLimpio);
  const passwordCorrecta = cuenta ? await validarPassword(passwordLimpia, cuenta.password) : false;

  if (!passwordCorrecta) {
    return res.status(401).json({ ok: false, mensaje: 'Error en la autenticación' });
  }

  res.json({
    ok: true,
    mensaje: 'Autenticación satisfactoria',
    usuario: cuenta.usuario,
    rol: cuenta.rol,
    nombre: cuenta.nombre,
  });
}