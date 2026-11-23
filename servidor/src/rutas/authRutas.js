// RUTAS DE AUTENTICACIÓN
// Registro e inicio de sesión.
import { Router } from 'express';
import { registrar, iniciarSesion } from '../controladores/authControlador.js';

const router = Router();

router.post('/registro', registrar);
router.post('/login', iniciarSesion);

export default router;