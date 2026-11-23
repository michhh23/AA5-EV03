import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA PARA CAMBIAR LA CONTRASEÑA
// Muestra el mensaje de éxito y los campos de la nueva contraseña
function PantallaNuevaContrasena() {
  const { go } = useApp();

  return (
    <>
      <StatusBar dark />
      <div className="auth-wrap">
        <div className="banner success" style={{ margin: '16px 16px 0', background: '#e6e6e6' }}>
          <div>
            <p className="banner-title">POR FAVOR INICIE SESION</p>
            <p>Contraseña establecida correctamente.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', margin: '18px 0 8px' }}>
          <span className="hero-img"><img src="assets/registro.png" alt="sol" /></span>
        </div>
        <div className="auth-card">
          <h2>Recuperar contraseña</h2>
          <Form.Group className="field" controlId="newPass">
            <Form.Control type="password" placeholder="Nueva contraseña" />
          </Form.Group>
          <Form.Group className="field" controlId="confirmPass">
            <Form.Control type="password" placeholder="Confirmar contraseña" />
          </Form.Group>
          <button className="btn-app btn-indigo" onClick={() => go('login')}>REESTABLECER</button>
        </div>
      </div>
    </>
  );
}

export default PantallaNuevaContrasena;