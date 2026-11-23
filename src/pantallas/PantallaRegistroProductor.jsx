import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';

// PANTALLA DE REGISTRO DE PRODUCTOR (gerencia)
// Formulario con tipo, edad en meses, área y productor asociado
function PantallaRegistroProductor() {
  const { goHome, showToast } = useApp();

  // Lista del 1 al 12 para el campo de edad por mes
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <div className="header-blue">
        <div className="top-row">
          <div className="icon-btn" onClick={goHome}>‹</div>
          <h1>Gerencia</h1>
        </div>
      </div>
      <div style={{ background: 'var(--sky-header)', textAlign: 'center', padding: '10px 0 12px' }}>
        <h2 style={{ color: '#fff', fontFamily: 'var(--font-display)', margin: 0 }}>Registro</h2>
      </div>

      {/* FORMULARIO con los campos de Bootstrap */}
      <div className="form-wrap">
        <Form.Group className="field" controlId="tipoRegistro">
          <Form.Label>TIPO</Form.Label>
          <Form.Control placeholder="Tipo de cultivo / registro" />
        </Form.Group>
        <Form.Group className="field" controlId="edadMes">
          <Form.Label>EDAD POR MES</Form.Label>
          <Form.Select defaultValue="1">
            {meses.map((mes) => (
              <option key={mes} value={mes}>{mes}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="field" controlId="areaLote">
          <Form.Label>AREA</Form.Label>
          <Form.Control as="textarea" placeholder="Área del lote (hectáreas)" />
        </Form.Group>
        <Form.Group className="field" controlId="productorAsociado">
          <Form.Label>PRODUCTOR ASOCIADO</Form.Label>
          <Form.Select>
            <option>Eduardo Perez Martinez</option>
            <option>Argenis Mercado</option>
          </Form.Select>
        </Form.Group>

        <div className="form-actions">
          <button className="btn-small navy" onClick={() => showToast('Modo edición')}>Editar</button>
          <button className="btn-small navy" onClick={() => showToast('Registro guardado')}>Guardar</button>
        </div>
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaRegistroProductor;