// RUTAS DE CULTIVOS
import { Router } from 'express';
import { listar, crear, editar, eliminar } from '../controladores/cultivoControlador.js';

const router = Router();

router.get('/', listar);
router.post('/', crear);
router.put('/:id', editar);
router.delete('/:id', eliminar);

export default router;