import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';

// FORMULARIO VACÍO
const USUARIO_VACIO = { usuario: '', password: '', rol: 'productor', lote: '' };

// PANTALLA PARA REGISTRAR USUARIOS (administrador)
// Formulario con usuario, contraseña, rol y lote.
function PantallaRegistrarUsuario() {
  const { goHome, showToast } = useApp();
  // Datos del formulario
  const [datos, setDatos] = useState(USUARIO_VACIO);

  // GUARDAR LO QUE SE ESCRIBE
  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // REGISTRAR EL USUARIO
  // Si el servidor lo crea limpia el formulario, si no muestra el error
  const registrar = async () => {
    const respuesta = await pedirApi('/usuarios', 'POST', datos);
    showToast(respuesta.mensaje);
    if (respuesta.ok) {
      setDatos(USUARIO_VACIO);
    }
  };

  // LO QUE SE VE EN PANTALLA
  return (
    <>
      <div
        className="header-blue"
        style={{
          textAlign: 'center',
          background: '#8BCAEB',
          color: 'var(--ink)',
          position: 'relative',
        }}
      >
        <div
          className="icon-btn"
          style={{
            position: 'absolute',
            left: '14px',
            top: '14px',
            background: 'rgba(0,0,0,.1)',
          }}
          onClick={goHome}
        >
          ‹
        </div>
        <h1
          style={{
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <img src="assets/logo.png" alt="AgroAlertas" style={{ width: '24px', height: '24px', objectFit: 'contain' }} /> AGROALERTAS
        </h1>
      </div>
      <div className="map-block map-block-river" style={{ height: '150px' }}></div>

      <div className="form-wrap" style={{ background: 'var(--sky-light)', flex: 1, paddingTop: '32px' }}>
        <Form.Group className="field" controlId="nuevoUsuario" style={{ marginBottom: '22px' }}>
          <Form.Label>usuario</Form.Label>
          <Form.Control name="usuario" placeholder="Usuario" style={{ padding: '16px' }} value={datos.usuario} onChange={cambiar} />
        </Form.Group>
        <Form.Group className="field" controlId="nuevaPassword" style={{ marginBottom: '22px' }}>
          <Form.Label>contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
            style={{ padding: '16px' }}
            value={datos.password}
            onChange={cambiar}
          />
        </Form.Group>
        <Form.Group className="field" controlId="nuevoRol" style={{ marginBottom: '22px' }}>
          <Form.Label>rol</Form.Label>
          <Form.Select name="rol" style={{ padding: '16px' }} value={datos.rol} onChange={cambiar}>
            <option value="productor">Productor</option>
            <option value="agronomo">Agronomo</option>
            <option value="gerencia">Gerencia</option>
            <option value="admin">Administrador</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="field" controlId="nuevoLote" style={{ marginBottom: '22px' }}>
          <Form.Label>lote</Form.Label>
          <Form.Control name="lote" placeholder="Lote" style={{ padding: '16px' }} value={datos.lote} onChange={cambiar} />
        </Form.Group>
        <button className="btn-app btn-indigo" onClick={registrar}>registrar</button>
      </div>
    </>
  );
}

export default PantallaRegistrarUsuario;