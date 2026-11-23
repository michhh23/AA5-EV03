// RUTAS DE USUARIOS
import { Router } from 'express';
import { listar, ver, crear, eliminar } from '../controladores/usuarioControlador.js';

const router = Router();

router.get('/', listar);
router.get('/:usuario', ver);
router.post('/', crear);
router.delete('/:usuario', eliminar);

export default router;