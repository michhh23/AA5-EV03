// SERVIDOR DE LA API
// Arranca los servicios web de AgroAlertas con Express.
// Cada grupo de servicios tiene su archivo de rutas: autenticación,
// usuarios, alertas, cultivos y notificaciones

// express crea el servidor y cors deja que la app de React lo pueda llamar
import express from 'express';
import cors from 'cors';
import authRutas from './rutas/authRutas.js';
import usuarioRutas from './rutas/usuarioRutas.js';
import alertaRutas from './rutas/alertaRutas.js';
import cultivoRutas from './rutas/cultivoRutas.js';
import notificacionRutas from './rutas/notificacionRutas.js';
import { crearUsuariosIniciales } from './servicios/usuarioServicio.js';

const app = express();
const PUERTO = 3000;

// Permite peticiones desde otra dirección, como la de la app en el puerto 5173
app.use(cors());
// Permite leer los datos que llegan en formato JSON
app.use(express.json());

// RUTA DE PRUEBA
// Sirve para revisar en el navegador que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de AgroAlertas funcionando' });
});

// RUTAS DE LOS SERVICIOS
app.use('/api', authRutas);
app.use('/api/usuarios', usuarioRutas);
app.use('/api/alertas', alertaRutas);
app.use('/api/cultivos', cultivoRutas);
app.use('/api/notificaciones', notificacionRutas);

// RUTA NO ENCONTRADA
// Si piden una dirección que no existe responde con error 404
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

// MANEJO DE ERRORES
// Si llega un JSON mal escrito responde 400, si falla otra cosa responde 500
app.use((err, req, res, next) => {
  const codigo = err.status === 400 ? 400 : 500;
  const mensaje = codigo === 400 ? 'Los datos se enviaron mal' : 'Error en el servidor';
  res.status(codigo).json({ ok: false, mensaje });
});

// ARRANCAR EL SERVIDOR
// Primero crea los usuarios de prueba si no existen y luego empieza a escuchar
await crearUsuariosIniciales();
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});