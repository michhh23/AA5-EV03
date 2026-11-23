import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';

// PANTALLA PARA REGISTRAR USUARIOS (administrador)
// Formulario con usuario, contraseña y lote
function PantallaRegistrarUsuario() {
  const { goHome, showToast } = useApp();

  return (
    <>
      <div className="header-blue" style={{ textAlign: 'center', background: '#8BCAEB', color: 'var(--ink)', position: 'relative' }}>
        <div className="icon-btn" style={{ position: 'absolute', left: '14px', top: '14px', background: 'rgba(0,0,0,.1)' }} onClick={goHome}>‹</div>
        <h1 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <img src="assets/logo.png" alt="AgroAlertas" style={{ width: '24px', height: '24px', objectFit: 'contain' }} /> AGROALERTAS
        </h1>
      </div>
      <div className="map-block map-block-river" style={{ height: '150px' }}></div>

      {/* FORMULARIO con los campos de Bootstrap */}
      <div className="form-wrap" style={{ background: 'var(--sky-light)', flex: 1, paddingTop: '32px' }}>
        <Form.Group className="field" controlId="nuevoUsuario" style={{ marginBottom: '22px' }}>
          <Form.Label>usuario</Form.Label>
          <Form.Control placeholder="Usuario" style={{ padding: '16px' }} />
        </Form.Group>
        <Form.Group className="field" controlId="nuevaPassword" style={{ marginBottom: '22px' }}>
          <Form.Label>contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" style={{ padding: '16px' }} />
        </Form.Group>
        <Form.Group className="field" controlId="nuevoLote" style={{ marginBottom: '22px' }}>
          <Form.Label>lote</Form.Label>
          <Form.Control placeholder="Lote" style={{ padding: '16px' }} />
        </Form.Group>
        <button className="btn-app btn-indigo" onClick={() => showToast('Usuario registrado')}>registrar</button>
      </div>
    </>
  );
}

export default PantallaRegistrarUsuario;