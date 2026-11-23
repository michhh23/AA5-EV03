import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';
import Calendar from '../componentes/Calendar.jsx';

// PANTALLA DE ALERTAS DEL PRODUCTOR
// Muestra la alerta de lluvia y el calendario.
// Antes de confirmar aparece el botón CONFIRMAR, después sale ALERTA CONFIRMADA
function PantallaAlerta() {
  const { state, confirmAlert, showToast } = useApp();
  const confirmed = state.alertConfirmed;

  return (
    <>
      <StatusBar dark />
      <div className="search-row">
        <div className="search-box"><span>Buscar en AgroAlertas</span></div>
      </div>
      <div className="app-title-row">
        <img src="assets/logo.png" alt="AgroAlertas" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
        <h2>AGROALERTAS</h2>
      </div>

      {/* TARJETA DE ALERTA. Cambia si ya fue confirmada o no */}
      {confirmed ? (
        <div className="alert-hero">
          <span className="alert-img"><img src="assets/lluvia.png" alt="lluvia" /></span>
          <h2>ALERTA lluvia</h2>
          <p>Lluvia fuerte pronosticada en Tierralta. En las próximas 3 horas se esperan lluvias intensas. <u style={{ cursor: 'pointer' }} onClick={() => showToast('Más detalles')}>Mas detalles</u></p>
          <div className="alert-actions">
            <span className="pill-btn green">ALERTA CONFIRMADA</span>
            <span className="pill-btn dark">SMS</span>
          </div>
        </div>
      ) : (
        <div className="alert-hero">
          <span className="alert-img alert-img-lg"><img src="assets/lluvia.png" alt="lluvia" /></span>
          <h2>ALERTA<br />LLUVIA</h2>
          <p>Lluvia fuerte pronosticada en Tierralta. En las próximas 3 horas se esperan lluvias intensas</p>
          <div className="risk-pill">RIESGO ALTO</div>
          <div className="alert-actions">
            <button className="pill-btn" onClick={confirmAlert}>CONFIRMAR</button>
            <button className="pill-btn dark" onClick={() => showToast('Más detalles')}>mas detalles</button>
          </div>
          <span className="sms-tag">SMS</span>
        </div>
      )}

      {/* CALENDARIO */}
      <div className="calendar">
        <div className="cal-head">
          <span className="cal-year">2026</span>
          <span className="cal-month">JUNIO</span>
        </div>
        <Calendar />
      </div>
    </>
  );
}

export default PantallaAlerta;