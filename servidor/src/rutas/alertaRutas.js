// RUTAS DE ALERTAS
import { Router } from 'express';
import { listar, ver, crear, editar, confirmar, eliminar } from '../controladores/alertaControlador.js';

const router = Router();

router.get('/', listar);
router.get('/:id', ver);
router.post('/', crear);
router.put('/:id', editar);
router.patch('/:id/confirmar', confirmar);
router.delete('/:id', eliminar);

export default router;