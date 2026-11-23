import { useState } from 'react';
// Form trae los campos del formulario con el estilo de Bootstrap
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { CREDENTIALS } from '../data/datos.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA DE LOGIN
// Formulario para iniciar sesión
function PantallaLogin() {
  const { go, actualizar, showToast } = useApp();
  // Lo que el usuario escribe en cada campo
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // VALIDAR EL LOGIN
  // Lee el usuario y la contraseña y los compara con la lista de usuarios.
  // Si están bien guarda el rol y entra a la app
  const handleLogin = (e) => {
    // Evita que la página se recargue al enviar el formulario
    e.preventDefault();

    // Quita espacios y pasa el usuario a minúscula
    const userVal = usuario.trim().toLowerCase().replace(/\s+/g, '');
    const passVal = password.trim();
    const account = CREDENTIALS[userVal];

    if (!account || account.password !== passVal) {
      showToast('Usuario o contraseña incorrectos');
      return;
    }

    showToast('Ingresando');
    setTimeout(() => {
      actualizar({
        role: account.role,
        adminSession: account.role === 'admin',
        homeTab: 'home',
        screen: 'app',
      });
    }, 300);
  };

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

          {/* FORMULARIO. value muestra lo guardado y onChange guarda cada letra que se escribe */}
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
        </div>
      </div>
    </>
  );
}

export default PantallaLogin;