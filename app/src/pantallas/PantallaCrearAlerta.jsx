import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';

// FORMULARIO VACÍO
// Valores con los que empieza el formulario y a los que vuelve después de guardar
const ALERTA_VACIA = { titulo: '', evento: 'LLUVIA', riesgo: 'Bajo', ubicacion: '', recomendacion: '' };

// PANTALLA PARA CREAR ALERTA (agrónomo)
// Formulario con título, evento, riesgo, ubicación y recomendación.
// Al guardar, la alerta se envía al servidor con el servicio /api/alertas
function PantallaCrearAlerta() {
  const { goHome, showToast } = useApp();
  // Datos del formulario
  const [datos, setDatos] = useState(ALERTA_VACIA);

  // GUARDAR LO QUE SE ESCRIBE
  // Usa el name de cada campo para saber qué dato cambiar
  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // GUARDAR LA ALERTA
  // Si el servidor la guarda limpia el formulario, si no muestra el error
  const guardarAlerta = async () => {
    const respuesta = await pedirApi('/alertas', 'POST', datos);
    showToast(respuesta.mensaje);
    if (respuesta.ok) {
      setDatos(ALERTA_VACIA);
    }
  };

  // LO QUE SE VE EN PANTALLA
  // Encabezado del agrónomo y el formulario con los campos de Bootstrap
  return (
    <>
      <div className="header-blue">
        <div className="top-row">
          <div className="icon-btn" onClick={goHome}>‹</div>
          <h1>Agronomo</h1>
        </div>
      </div>
      <div style={{ background: 'var(--sky-header)', textAlign: 'center', padding: '10px 0 12px' }}>
        <h2 style={{ color: '#ffce54', fontFamily: 'var(--font-display)', margin: 0, letterSpacing: '1px' }}>CREAR ALERTA</h2>
      </div>

      <div className="form-wrap">
        <Form.Group className="field" controlId="tituloAlerta">
          <Form.Label>Titulo de la alerta</Form.Label>
          <Form.Control name="titulo" placeholder="Ej. Lluvia intensa" value={datos.titulo} onChange={cambiar} />
        </Form.Group>

        <div className="form-row2">
          <Form.Group className="field" controlId="eventoAlerta">
            <Form.Label>Evento</Form.Label>
            <Form.Select name="evento" value={datos.evento} onChange={cambiar}>
              <option>LLUVIA</option>
              <option>VIENTO</option>
              <option>TEMPERATURA</option>
              <option>SEQUIA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="field" controlId="riesgoAlerta">
            <Form.Label>Riesgo</Form.Label>
            <Form.Select name="riesgo" value={datos.riesgo} onChange={cambiar}>
              <option>Bajo</option>
              <option>Medio</option>
              <option>Alto</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="field" controlId="ubicacionAlerta">
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control name="ubicacion" placeholder="Vereda / lote" value={datos.ubicacion} onChange={cambiar} />
        </Form.Group>
        <Form.Group className="field" controlId="recomendacionAlerta">
          <Form.Label>Recomendacion</Form.Label>
          <Form.Control
            as="textarea"
            name="recomendacion"
            placeholder="Escriba una recomendación para el productor"
            value={datos.recomendacion}
            onChange={cambiar}
          />
        </Form.Group>

        <div className="form-actions">
          <button className="btn-small navy" onClick={() => setDatos(ALERTA_VACIA)}>Limpiar</button>
          <button className="btn-small navy" onClick={guardarAlerta}>Guardar</button>
        </div>
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaCrearAlerta;