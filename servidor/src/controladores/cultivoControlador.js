// CONTROLADOR DE CULTIVOS
// Lógica del registro que hace gerencia: tipo de cultivo,
// edad por mes, área del lote y productor asociado
import { leer, guardar, siguienteId } from '../servicios/datosServicio.js';

// CULTIVO INICIAL
const CULTIVOS_INICIALES = [
  { id: 1, tipo: 'Platano', edadMeses: 6, area: 2.5, productor: 'Eduardo Perez Martinez' },
];

// LEER LOS CULTIVOS
function leerCultivos() {
  return leer('cultivos', CULTIVOS_INICIALES);
}

// REVISAR LOS DATOS DE UN CULTIVO
function revisarDatos(datos) {
  if (!datos.tipo || !datos.productor || datos.edadMeses === undefined || datos.area === undefined) {
    return 'Debe enviar tipo, edadMeses, area y productor';
  }
  const edad = Number(datos.edadMeses);
  if (!Number.isInteger(edad) || edad < 1 || edad > 12) {
    return 'La edad debe ser un número de 1 a 12 meses';
  }
  if (!(Number(datos.area) > 0)) {
    return 'El área debe ser un número mayor a cero';
  }
  return '';
}

// LISTAR CULTIVOS
export async function listar(req, res) {
  res.json({ ok: true, datos: await leerCultivos() });
}

// CREAR CULTIVO
export async function crear(req, res) {
  const datos = req.body || {};
  const error = revisarDatos(datos);
  if (error) {
    return res.status(400).json({ ok: false, mensaje: error });
  }

  const cultivos = await leerCultivos();
  const nuevo = {
    id: siguienteId(cultivos),
    tipo: datos.tipo,
    edadMeses: Number(datos.edadMeses),
    area: Number(datos.area),
    productor: datos.productor,
  };
  cultivos.push(nuevo);
  await guardar('cultivos', cultivos);
  res.status(201).json({ ok: true, mensaje: 'Registro guardado', datos: nuevo });
}

// EDITAR CULTIVO
export async function editar(req, res) {
  const cultivos = await leerCultivos();
  const posicion = cultivos.findIndex((c) => c.id === Number(req.params.id));
  if (posicion === -1) {
    return res.status(404).json({ ok: false, mensaje: 'Cultivo no encontrado' });
  }

  const actualizado = { ...cultivos[posicion], ...req.body, id: cultivos[posicion].id };
  const error = revisarDatos(actualizado);
  if (error) {
    return res.status(400).json({ ok: false, mensaje: error });
  }

  actualizado.edadMeses = Number(actualizado.edadMeses);
  actualizado.area = Number(actualizado.area);
  cultivos[posicion] = actualizado;
  await guardar('cultivos', cultivos);
  res.json({ ok: true, mensaje: 'Cultivo actualizado', datos: actualizado });
}

// ELIMINAR CULTIVO
export async function eliminar(req, res) {
  const cultivos = await leerCultivos();
  const restantes = cultivos.filter((c) => c.id !== Number(req.params.id));
  if (restantes.length === cultivos.length) {
    return res.status(404).json({ ok: false, mensaje: 'Cultivo no encontrado' });
  }
  await guardar('cultivos', restantes);
  res.json({ ok: true, mensaje: 'Cultivo eliminado' });
}