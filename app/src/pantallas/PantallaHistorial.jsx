import { useState, useEffect } from 'react';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';

// HISTORIAL
// Muestra las alertas guardadas en el servidor
function PantallaHistorial() {
  const { state, goHome, showToast } = useApp();
  // Alertas que llegan del servidor
  const [alertas, setAlertas] = useState([]);
  // Fecha y periodo del filtro. Si no hay fecha se muestran todas
  const [fecha, setFecha] = useState('');
  const [periodo, setPeriodo] = useState('mes');

  // TRAER LAS ALERTAS
  // Se ejecuta al abrir la pantalla y cada vez que cambia la fecha o el periodo
  useEffect(() => {
    const filtro = fecha ? `?periodo=${periodo}&fecha=${fecha}` : '';
    pedirApi(`/alertas${filtro}`).then((respuesta) => {
      if (respuesta.ok) {
        setAlertas(respuesta.datos);
      } else {
        showToast(respuesta.mensaje);
      }
    });
  }, [fecha, periodo]);

  // NOMBRE DEL ROL
  // Devuelve el nombre del rol actual para ponerlo en el título
  const roleLabel = () => {
    if (state.role === 'admin') return 'Administrador';
    if (state.role === 'agronomo') return 'Agronomo';
    if (state.role === 'gerencia') return 'Gerencia';
    return 'Productor';
  };

  // FECHA PARA MOSTRAR
  // El servidor guarda la fecha como 2026-06-01 y aquí se muestra como 01/06/2026
  const mostrarFecha = (texto) => texto.split('-').reverse().join('/');

  // LO QUE SE VE EN PANTALLA
  // Encabezado, el filtro de fecha y una tarjeta por cada alerta
  return (
    <>
      <div className="header-blue">
        <div className="top-row">
          <div className="icon-btn" onClick={goHome}>‹</div>
          <h1 style={{ textAlign: 'left' }}>{roleLabel()}</h1>
        </div>
        <h1 style={{ marginTop: '6px', fontSize: '22px' }}>Historial</h1>
      </div>

      <div className="hist-search">
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="hist-filters">
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="dia">Dia</option>
          <option value="mes">Mes</option>
          <option value="anio">Año</option>
        </select>
        {fecha && <button className="pill-btn dark" onClick={() => setFecha('')}>Ver todas</button>}
      </div>

      <div className="hist-list">
        {alertas.length === 0 && <p style={{ textAlign: 'center' }}>No hay alertas en esa fecha</p>}
        {alertas.map((h) => (
          <div className="hist-card" key={h.id}>
            <div className="hist-thumb"></div>
            <div>
              <h3>{h.titulo}</h3>
              <p>Riesgo {h.riesgo.toLowerCase()}</p>
              <button className="detail-btn" onClick={() => showToast('Más detalles')}>DETALLES</button>
            </div>
            <span className="hist-date">{mostrarFecha(h.fecha)}</span>
          </div>
        ))}
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaHistorial;