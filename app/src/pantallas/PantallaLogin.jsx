import { useState } from 'react';
// Form trae los campos del formulario con el estilo de Bootstrap
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';
import StatusBar from '../componentes/StatusBar.jsx';

// Formulario para iniciar sesión. El usuario y la contraseña
function PantallaLogin() {
  const { go, actualizar, showToast } = useApp();
  // Lo que el usuario escribe en cada campo
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Envía los datos al servidor. Si son correctos guarda el rol que
  // devuelve el servidor y entra a la app, si no muestra el error
  const handleLogin = async (e) => {
    e.preventDefault();

    const respuesta = await pedirApi('/login', 'POST', { usuario, password });
    showToast(respuesta.mensaje);

    if (!respuesta.ok) {
      return;
    }

    setTimeout(() => {
      actualizar({
        role: respuesta.rol,
        adminSession: respuesta.rol === 'admin',
        usuario: respuesta.usuario,
        nombre: respuesta.nombre,
        homeTab: 'home',
        screen: 'app',
      });
    }, 300);
  };

  // LO QUE SE VE EN PANTALLA
  // Al final va una línea con los usuarios de prueba
  return (
    <>
      <StatusBar dark />
      <div className="auth-wrap">
        <div className="auth-top"><span className="auth-back" onClick={() => go('splash')}>‹</span></div>
        <div className="auth-hero">
          <h1>¡BIENVENIDO!</h1>
          <span className="hero-img"><img src="assets/registro.png" alt="sol" /></span>
        </div>
        <div className="auth-card">
          <h2>Iniciar sesión</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="field" controlId="loginUser">
              <Form.Label>usuario</Form.Label>
              <Form.Control placeholder="Tu nombre de usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </Form.Group>
            <Form.Group className="field" controlId="loginPass">
              <Form.Label>contraseña</Form.Label>
              <Form.Control type="password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <button type="submit" className="btn-app btn-indigo">INGRESAR</button>
          </Form>

          <div className="auth-links">
            <a onClick={() => go('forgotPhone')}>¿olvidó su contraseña?</a>
            <a onClick={() => go('register')}>¿no tiene cuenta?</a>
          </div>

          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--ink-soft)', marginTop: '10px' }}>
            Prueba: admin / 123 o productor / 1234
          </p>
        </div>
      </div>
    </>
  );
}

export default PantallaLogin;