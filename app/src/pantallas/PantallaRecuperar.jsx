import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';

// RECUPERAR CONTRASEÑA
// Pide el número de teléfono para enviar el código de recuperación
function PantallaRecuperar() {
  const { go } = useApp();

  return (
    <>
      <StatusBar dark />
      <div className="auth-wrap">
        <div className="auth-top"><span className="auth-back" onClick={() => go('login')}>‹</span></div>
        <div className="auth-hero">
          <h1>¡BIENVENIDO!</h1>
          <span className="hero-img"><img src="assets/registro.png" alt="sol" /></span>
        </div>
        <div className="auth-card">
          <h2>Recuperar contraseña</h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'underline',
              color: 'var(--ink)',
              marginTop: '-4px',
            }}
          >
            Por favor ingrese el número de teléfono que fue asignado a su cuenta
          </p>
          <Form.Group className="field" controlId="fpPhone" style={{ marginTop: '14px' }}>
            <Form.Control placeholder="Telefono" />
          </Form.Group>
          <button className="btn-app btn-indigo" onClick={() => go('forgotCode')}>ENVIAR CODIGO</button>
        </div>
      </div>
    </>
  );
}

export default PantallaRecuperar;