import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA DE REGISTRO
// Formulario para crear una cuenta nueva. Al final pide el código de verificación.
// El título y el sol usan las mismas clases del login para que se vean iguales
function PantallaRegistro() {
  const { go } = useApp();

  return (
    <>
      <StatusBar dark />
      <div className="auth-wrap">
        <div className="auth-top"><span className="auth-back" onClick={() => go('login')}>‹</span></div>
        <div className="auth-hero">
          <h1>REGISTRO</h1>
          <span className="hero-img"><img src="assets/registro.png" alt="sol" /></span>
        </div>
        <div className="auth-card">

          {/* CAMPOS DEL REGISTRO con Form.Group de Bootstrap */}
          <Form.Group className="field" controlId="regName">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control placeholder="Nombre y apellido" />
          </Form.Group>
          <Form.Group className="field" controlId="regUser">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control placeholder="Usuario" />
          </Form.Group>
          <Form.Group className="field" controlId="regPass">
            <Form.Label>contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>
          <Form.Group className="field" controlId="regPhone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control placeholder="Número de teléfono" />
          </Form.Group>

          <button className="btn-app btn-indigo" onClick={() => go('registerCode')}>ENVIAR CODIGO</button>
        </div>
      </div>
    </>
  );
}

export default PantallaRegistro;