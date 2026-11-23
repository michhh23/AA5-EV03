import { useApp } from '../AppContext.js';

// HISTORIAL
// Muestra el buscador, los filtros de fecha y una tarjeta por cada alerta
function PantallaHistorial() {
  const { state, goHome, showToast } = useApp();

  // NOMBRE DEL ROL
  // Devuelve el nombre del rol actual para ponerlo en el título
  const roleLabel = () => {
    if (state.role === 'admin') return 'Administrador';
    if (state.role === 'agronomo') return 'Agronomo';
    if (state.role === 'gerencia') return 'Gerencia';
    return 'Productor';
  };

  return (
    <>
      <div className="header-blue">
        <div className="top-row">
          <div className="icon-btn" onClick={goHome}>‹</div>
          <h1 style={{ textAlign: 'left' }}>{roleLabel()}</h1>
        </div>
        <h1 style={{ marginTop: '6px', fontSize: '22px' }}>Historial</h1>
      </div>

      <div className="hist-search"><input placeholder="Buscar por fecha" /></div>
      <div className="hist-filters">
        <select><option>Dia</option></select>
        <select><option>Mes</option></select>
        <select><option>Año</option></select>
      </div>

      {/* LISTA DE ALERTAS. map recorre el historial y crea una tarjeta por cada una */}
      <div className="hist-list">
        {state.history.map((h) => (
          <div className="hist-card" key={h.title}>
            <div className="hist-thumb"></div>
            <div>
              <h3>{h.title}</h3>
              <p>{h.risk}</p>
              <button className="detail-btn" onClick={() => showToast(`${h.title}: detalles`)}>DETALLES</button>
            </div>
            <span className="hist-date">{h.date}</span>
          </div>
        ))}
      </div>

      <div className="dots-row"><span className="active"></span><span></span><span></span></div>
    </>
  );
}

export default PantallaHistorial;