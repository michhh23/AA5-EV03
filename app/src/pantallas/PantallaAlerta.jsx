// useEffect se ejecuta al abrir la pantalla, aquí sirve para pedir la alerta al servidor
import { useState, useEffect } from 'react';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';
import StatusBar from '../componentes/StatusBar.jsx';
import Calendar from '../componentes/Calendar.jsx';

// PANTALLA DE ALERTAS DEL PRODUCTOR
// Muestra la alerta más reciente que está en el servidor y el calendario.
// Antes de confirmar aparece el botón CONFIRMAR, después sale ALERTA CONFIRMADA
function PantallaAlerta() {
  const { showToast } = useApp();
  // Alerta que se muestra. Empieza vacía mientras llega del servidor
  const [alerta, setAlerta] = useState(null);

  // TRAER LA ALERTA
  // Pide la lista de alertas y se queda con la primera, que es la más nueva
  useEffect(() => {
    pedirApi('/alertas').then((respuesta) => {
      if (respuesta.ok && respuesta.datos.length) {
        setAlerta(respuesta.datos[0]);
      } else if (!respuesta.ok) {
        showToast(respuesta.mensaje);
      }
    });
  }, []);

  // CONFIRMAR LA ALERTA
  // Le avisa al servidor que el productor confirmó y luego envía el SMS
  const confirmAlert = async () => {
    const respuesta = await pedirApi(`/alertas/${alerta.id}/confirmar`, 'PATCH');
    if (!respuesta.ok) {
      showToast(respuesta.mensaje);
      return;
    }
    setAlerta(respuesta.datos);
    await pedirApi('/notificaciones', 'POST', { alertaId: alerta.id, canal: 'sms' });
    showToast('Alerta confirmada y SMS enviado');
  };

  // ENVIAR POR SMS
  const enviarSms = async () => {
    const respuesta = await pedirApi('/notificaciones', 'POST', { alertaId: alerta.id, canal: 'sms' });
    showToast(respuesta.mensaje);
  };

  // LO QUE SE VE EN PANTALLA
  // El buscador, el título, la tarjeta de la alerta y el calendario.
  // La tarjeta cambia si la alerta ya fue confirmada o no
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

      {!alerta && (
        <div className="alert-hero">
          <h2>Cargando alertas...</h2>
        </div>
      )}

      {alerta && alerta.confirmada && (
        <div className="alert-hero">
          <span className="alert-img"><img src="assets/lluvia.png" alt="lluvia" /></span>
          <h2>ALERTA {alerta.evento.toLowerCase()}</h2>
          <p>
            {alerta.titulo} en {alerta.ubicacion}. {alerta.recomendacion}{' '}
            <u style={{ cursor: 'pointer' }} onClick={() => showToast(alerta.recomendacion)}>Mas detalles</u>
          </p>
          <div className="alert-actions">
            <span className="pill-btn green">ALERTA CONFIRMADA</span>
            <span className="pill-btn dark" style={{ cursor: 'pointer' }} onClick={enviarSms}>SMS</span>
          </div>
        </div>
      )}

      {alerta && !alerta.confirmada && (
        <div className="alert-hero">
          <span className="alert-img alert-img-lg"><img src="assets/lluvia.png" alt="lluvia" /></span>
          <h2>ALERTA<br />{alerta.evento}</h2>
          <p>{alerta.titulo} en {alerta.ubicacion}. {alerta.recomendacion}</p>
          <div className="risk-pill">RIESGO {alerta.riesgo.toUpperCase()}</div>
          <div className="alert-actions">
            <button className="pill-btn" onClick={confirmAlert}>CONFIRMAR</button>
            <button className="pill-btn dark" onClick={() => showToast(alerta.recomendacion)}>mas detalles</button>
          </div>
          <span className="sms-tag" style={{ cursor: 'pointer' }} onClick={enviarSms}>SMS</span>
        </div>
      )}

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