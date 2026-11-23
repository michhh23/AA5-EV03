import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA DE SELECCIÓN DE ROL (solo para el administrador)
// Muestra el mapa y tres botones para entrar como agrónomo, gerencia o productor
function PantallaRoles() {
  const { selectRole } = useApp();

  return (
    <>
      <StatusBar dark />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px 0' }}>
        <div className="search-box" style={{ flex: 1 }}><span>buscar</span></div>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--sky-deep)', flexShrink: 0 }}></div>
      </div>
      <div className="welcome-title">BIENVENIDO</div>
      <div className="welcome-sub">
        <img src="assets/logo.png" alt="AgroAlertas" style={{ width: '22px', height: '22px', objectFit: 'contain', verticalAlign: '-4px', marginRight: '4px' }} /> AGROALERTAS
      </div>
      <div className="map-block"></div>

      {/* BOTONES DE ROL. Cada uno guarda el rol escogido */}
            {/* BOTONES DE ROL. Cada uno guarda el rol escogido */}
           {/* BOTONES DE ROL. Cada uno guarda el rol escogido */}
      <div className="role-row" style={{ background: 'var(--sky-light)', flex: 1 }}>
        <button className="role-card" onClick={() => selectRole('agronomo')}>Agronomo</button>
        <button className="role-card" onClick={() => selectRole('gerencia')}>Gerencia</button>
        <button className="role-card" onClick={() => selectRole('productor')}>Productor</button>
      </div>
    </>
  );
}

export default PantallaRoles;