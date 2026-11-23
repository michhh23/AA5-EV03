import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';

// FORMULARIO VACÍO
const CULTIVO_VACIO = { tipo: '', edadMeses: '1', area: '', productor: 'Eduardo Perez Martinez' };

// PANTALLA DE REGISTRO DE PRODUCTOR
// Formulario con tipo, edad en meses, área y productor asociado.
function PantallaRegistroProductor() {
  const { goHome, showToast } = useApp();
  // Datos del formulario
  const [datos, setDatos] = useState(CULTIVO_VACIO);

  // Lista del 1 al 12 para el campo de edad por mes
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);

  // GUARDAR LO QUE SE ESCRIBE
  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // GUARDAR EL REGISTRO
  // Si el servidor lo guarda limpia el formulario, si no muestra el error
  const guardarCultivo = async () => {
    const respuesta = await pedirApi('/cultivos', 'POST', datos);
    showToast(respuesta.mensaje);
    if (respuesta.ok) {
      setDatos(CULTIVO_VACIO);
    }
  };

  // LO QUE SE VE EN PANTALLA
  // Encabezado de gerencia y el formulario con los campos de Bootstrap
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

      <div className="form-wrap">
        <Form.Group className="field" controlId="tipoRegistro">
          <Form.Label>TIPO</Form.Label>
          <Form.Control name="tipo" placeholder="Tipo de cultivo / registro" value={datos.tipo} onChange={cambiar} />
        </Form.Group>
        <Form.Group className="field" controlId="edadMes">
          <Form.Label>EDAD POR MES</Form.Label>
          <Form.Select name="edadMeses" value={datos.edadMeses} onChange={cambiar}>
            {meses.map((mes) => (
              <option key={mes} value={mes}>{mes}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="field" controlId="areaLote">
          <Form.Label>AREA</Form.Label>
          <Form.Control
            type="number"
            name="area"
            placeholder="Área del lote (hectáreas)"
            value={datos.area}
            onChange={cambiar}
          />
        </Form.Group>
        <Form.Group className="field" controlId="productorAsociado">
          <Form.Label>PRODUCTOR ASOCIADO</Form.Label>
          <Form.Select name="productor" value={datos.productor} onChange={cambiar}>
            <option>Eduardo Perez Martinez</option>
            <option>Argenis Mercado</option>
          </Form.Select>
        </Form.Group>

        <div className="form-actions">
          <button className="btn-small navy" onClick={() => setDatos(CULTIVO_VACIO)}>Limpiar</button>
          <button className="btn-small navy" onClick={guardarCultivo}>Guardar</button>
        </div>
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaRegistroProductor;