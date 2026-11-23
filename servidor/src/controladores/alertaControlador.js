// El agrónomo crea las alertas, el productor las confirma
import { leer, guardar, siguienteId, fechaHoy } from '../servicios/datosServicio.js';

// VALORES PERMITIDOS
const EVENTOS = ['LLUVIA', 'VIENTO', 'TEMPERATURA', 'SEQUIA'];
const RIESGOS = ['Bajo', 'Medio', 'Alto'];

// ALERTAS INICIALES
export const ALERTAS_INICIALES = [
  {
    id: 1,
    titulo: 'LLUVIA EXTREMA',
    evento: 'LLUVIA',
    riesgo: 'Alto',
    ubicacion: 'Tierralta',
    recomendacion: 'Limpia los drenajes. No abones ni fumigues. Asegura el amarre del plátano.',
    fecha: '2026-06-01',
    confirmada: false,
  },
  {
    id: 2,
    titulo: 'TEMPERATURA',
    evento: 'TEMPERATURA',
    riesgo: 'Bajo',
    ubicacion: 'Tierralta',
    recomendacion: 'Sin acciones especiales.',
    fecha: '2026-05-01',
    confirmada: false,
  },
  {
    id: 3,
    titulo: 'VIENTO',
    evento: 'VIENTO',
    riesgo: 'Medio',
    ubicacion: 'Tierralta',
    recomendacion: 'Revisa los tutores de las plantas jóvenes.',
    fecha: '2026-04-01',
    confirmada: false,
  },
];

// LEER LAS ALERTAS
function leerAlertas() {
  return leer('alertas', ALERTAS_INICIALES);
}

// REVISAR LOS DATOS DE UNA ALERTA
// Devuelve el mensaje de error si algo está mal, o vacío si todo está bien
function revisarDatos(datos) {
  if (!datos.titulo || !datos.evento || !datos.riesgo || !datos.ubicacion) {
    return 'Debe enviar titulo, evento, riesgo y ubicacion';
  }
  if (!EVENTOS.includes(datos.evento)) {
    return `El evento debe ser uno de estos: ${EVENTOS.join(', ')}`;
  }
  if (!RIESGOS.includes(datos.riesgo)) {
    return `El riesgo debe ser uno de estos: ${RIESGOS.join(', ')}`;
  }
  return '';
}

// LISTAR ALERTAS
export async function listar(req, res) {
  const { periodo, fecha } = req.query;
  let alertas = await leerAlertas();

  if (periodo && fecha) {
    // Cuántas letras de la fecha se comparan: 10 el día, 7 el mes, 4 el año
    const largo = { dia: 10, mes: 7, anio: 4 }[periodo];
    if (!largo) {
      return res.status(400).json({ ok: false, mensaje: 'El periodo debe ser dia, mes o anio' });
    }
    alertas = alertas.filter((a) => a.fecha.slice(0, largo) === fecha.slice(0, largo));
  }

  alertas.sort((a, b) => b.fecha.localeCompare(a.fecha));
  res.json({ ok: true, datos: alertas });
}

// VER UNA ALERTA
export async function ver(req, res) {
  const alertas = await leerAlertas();
  const alerta = alertas.find((a) => a.id === Number(req.params.id));
  if (!alerta) {
    return res.status(404).json({ ok: false, mensaje: 'Alerta no encontrada' });
  }
  res.json({ ok: true, datos: alerta });
}

// CREAR ALERTA
// Recibe los datos del formulario del agrónomo y guarda la alerta con la fecha de hoy
export async function crear(req, res) {
  const datos = req.body || {};
  const error = revisarDatos(datos);
  if (error) {
    return res.status(400).json({ ok: false, mensaje: error });
  }

  const alertas = await leerAlertas();
  const nueva = {
    id: siguienteId(alertas),
    titulo: datos.titulo,
    evento: datos.evento,
    riesgo: datos.riesgo,
    ubicacion: datos.ubicacion,
    recomendacion: datos.recomendacion || '',
    fecha: datos.fecha || fechaHoy(),
    confirmada: false,
  };
  alertas.push(nueva);
  await guardar('alertas', alertas);
  res.status(201).json({ ok: true, mensaje: 'Alerta guardada', datos: nueva });
}

// EDITAR ALERTA
// Cambia los datos de una alerta que ya existe
export async function editar(req, res) {
  const alertas = await leerAlertas();
  const posicion = alertas.findIndex((a) => a.id === Number(req.params.id));
  if (posicion === -1) {
    return res.status(404).json({ ok: false, mensaje: 'Alerta no encontrada' });
  }

  // Se mezclan los datos viejos con los nuevos para revisarlos completos
  const actualizada = { ...alertas[posicion], ...req.body, id: alertas[posicion].id };
  const error = revisarDatos(actualizada);
  if (error) {
    return res.status(400).json({ ok: false, mensaje: error });
  }

  alertas[posicion] = actualizada;
  await guardar('alertas', alertas);
  res.json({ ok: true, mensaje: 'Alerta actualizada', datos: actualizada });
}

// CONFIRMAR ALERTA
// El productor confirma que recibió la alerta
export async function confirmar(req, res) {
  const alertas = await leerAlertas();
  const alerta = alertas.find((a) => a.id === Number(req.params.id));
  if (!alerta) {
    return res.status(404).json({ ok: false, mensaje: 'Alerta no encontrada' });
  }

  alerta.confirmada = true;
  await guardar('alertas', alertas);
  res.json({ ok: true, mensaje: 'Alerta confirmada', datos: alerta });
}

// ELIMINAR ALERTA
export async function eliminar(req, res) {
  const alertas = await leerAlertas();
  const restantes = alertas.filter((a) => a.id !== Number(req.params.id));
  if (restantes.length === alertas.length) {
    return res.status(404).json({ ok: false, mensaje: 'Alerta no encontrada' });
  }
  await guardar('alertas', restantes);
  res.json({ ok: true, mensaje: 'Alerta eliminada' });
}