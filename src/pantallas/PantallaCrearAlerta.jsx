import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';

// PANTALLA PARA CREAR ALERTA (agrónomo)
// Formulario con título, evento, riesgo, ubicación y recomendación
function PantallaCrearAlerta() {
  const { goHome, showToast } = useApp();

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

      {/* FORMULARIO con los campos de Bootstrap */}
      <div className="form-wrap">
        <Form.Group className="field" controlId="tituloAlerta">
          <Form.Label>Titulo de la alerta</Form.Label>
          <Form.Control placeholder="Ej. Lluvia intensa" />
        </Form.Group>

        <div className="form-row2">
          <Form.Group className="field" controlId="eventoAlerta">
            <Form.Label>Evento</Form.Label>
            <Form.Select>
              <option>LLUVIA</option>
              <option>VIENTO</option>
              <option>TEMPERATURA</option>
              <option>SEQUIA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="field" controlId="riesgoAlerta">
            <Form.Label>Riesgo</Form.Label>
            <Form.Select>
              <option>Bajo</option>
              <option>Medio</option>
              <option>Alto</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="field" controlId="ubicacionAlerta">
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control placeholder="Vereda / lote" />
        </Form.Group>
        <Form.Group className="field" controlId="recomendacionAlerta">
          <Form.Label>Recomendacion</Form.Label>
          <Form.Control as="textarea" placeholder="Escriba una recomendación para el productor" />
        </Form.Group>

        <div className="form-actions">
          <button className="btn-small navy" onClick={() => showToast('Modo edición')}>Editar</button>
          <button className="btn-small navy" onClick={() => showToast('Alerta guardada')}>Guardar</button>
        </div>
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaCrearAlerta;