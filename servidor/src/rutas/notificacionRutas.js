// RUTAS DE NOTIFICACIONES
import { Router } from 'express';
import { listar, enviar } from '../controladores/notificacionControlador.js';

const router = Router();

router.get('/', listar);
router.post('/', enviar);

export default router;