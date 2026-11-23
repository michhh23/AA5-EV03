import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA DE INICIO DE GERENCIA
// Muestra el buscador, el título de bienvenida, el mapa
// y el banner del productor asociado
function PantallaGerencia() {
  return (
    <>
      <StatusBar dark />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px 0' }}>
        <div className="search-box" style={{ flex: 1 }}><span>buscar</span></div>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--sky-deep)',
            flexShrink: 0,
          }}
        ></div>
      </div>
      <div className="welcome-title">BIENVENIDO</div>
      <div className="welcome-sub">
        <img
          src="assets/logo.png"
          alt="AgroAlertas"
          style={{
            width: '22px',
            height: '22px',
            objectFit: 'contain',
            verticalAlign: '-4px',
            marginRight: '4px',
          }}
        /> AGROALERTAS
      </div>
      <div className="map-block"></div>
      <div style={{ background: 'var(--sky-light)', flex: 1 }}>
        <div className="producer-banner">
          <span className="role-img"><img src="assets/productor.png" alt="productor" /></span>
          <strong>Productor<br />Asociado</strong>
        </div>
      </div>
    </>
  );
}

export default PantallaGerencia;