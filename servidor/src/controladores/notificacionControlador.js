//  NOTIFICACIONES
// Registra el envío de una alerta por SMS o WhatsApp.
// El envío es simulado: no se manda un mensaje real,
// se arma el texto y queda guardado el registro del envío
import { leer, guardar, siguienteId, fechaHoy } from '../servicios/datosServicio.js';
import { ALERTAS_INICIALES } from './alertaControlador.js';

// CANALES PERMITIDOS
const CANALES = ['sms', 'whatsapp'];

// LISTAR NOTIFICACIONES
export async function listar(req, res) {
  res.json({ ok: true, datos: await leer('notificaciones') });
}

// ENVIAR NOTIFICACIÓN
export async function enviar(req, res) {
  const { alertaId, canal, telefono } = req.body || {};

  if (!alertaId || !canal) {
    return res.status(400).json({ ok: false, mensaje: 'Debe enviar alertaId y canal' });
  }
  if (!CANALES.includes(canal)) {
    return res.status(400).json({ ok: false, mensaje: 'El canal debe ser sms o whatsapp' });
  }

  const alertas = await leer('alertas', ALERTAS_INICIALES);
  const alerta = alertas.find((a) => a.id === Number(alertaId));
  if (!alerta) {
    return res.status(404).json({ ok: false, mensaje: 'Alerta no encontrada' });
  }

  const notificaciones = await leer('notificaciones');
  const nueva = {
    id: siguienteId(notificaciones),
    alertaId: alerta.id,
    canal,
    telefono: telefono || '',
    mensaje: `AgroAlertas: ${alerta.titulo} en ${alerta.ubicacion}. Riesgo ${alerta.riesgo}. ${alerta.recomendacion}`,
    fecha: fechaHoy(),
  };
  notificaciones.push(nueva);
  await guardar('notificaciones', notificaciones);
  res.status(201).json({ ok: true, mensaje: `Alerta enviada por ${canal}`, datos: nueva });
}