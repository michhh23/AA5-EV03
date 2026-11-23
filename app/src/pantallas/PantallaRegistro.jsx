import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA DE REGISTRO
// Formulario para crear una cuenta nueva
function PantallaRegistro() {
  const { go, actualizar, showToast } = useApp();
  // Lo que el usuario escribe en cada campo
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');

  // ENVIAR EL REGISTRO
  // Si el servidor lo registra guarda el usuario y pide el código,
  // si no muestra el mensaje de error, por ejemplo que el usuario ya existe
  const handleRegistro = async (e) => {
    e.preventDefault();

    const respuesta = await pedirApi('/registro', 'POST', { nombre, usuario, password, telefono });
    showToast(respuesta.mensaje);

    if (respuesta.ok) {
      actualizar({ usuario: usuario.trim().toLowerCase(), nombre, screen: 'registerCode' });
    }
  };

  // LO QUE SE VE EN PANTALLA
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
          <Form onSubmit={handleRegistro}>
            <Form.Group className="field" controlId="regName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control placeholder="Nombre y apellido" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Form.Group>
            <Form.Group className="field" controlId="regUser">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </Form.Group>
            <Form.Group className="field" controlId="regPass">
              <Form.Label>contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="field" controlId="regPhone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control placeholder="Número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </Form.Group>

            <button type="submit" className="btn-app btn-indigo">ENVIAR CODIGO</button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PantallaRegistro;