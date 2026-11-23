import { useState, useEffect } from 'react';
import { useApp } from '../AppContext.js';
import { pedirApi } from '../api.js';

// Muestra el nombre y el teléfono del usuario que inició sesión,
// traídos del servidor con el servicio /api/usuarios.
// El productor ve ubicación y cultivo, los demás ven solicitar info y ayuda
function PantallaPerfil() {
  const { state, goHome, showToast } = useApp();
  // Datos del usuario que llegan del servidor
  const [perfil, setPerfil] = useState(null);

  // TRAER LOS DATOS DEL USUARIO
  useEffect(() => {
    pedirApi(`/usuarios/${state.usuario}`).then((respuesta) => {
      if (respuesta.ok) {
        setPerfil(respuesta.datos);
      }
    });
  }, []);

  const isProductor = state.role === 'productor';
  // Si el usuario no tiene nombre o teléfono guardado se muestra el usuario y un texto
  const name = perfil?.nombre || state.usuario;
  const sub = perfil?.telefono || 'numero de telefono';

  // LO QUE SE VE EN PANTALLA
  // Encabezado con el avatar y la lista de opciones. Las opciones
  // de la sección Informacion cambian según el rol
  return (
    <>
      <div className="profile-header">
        <div className="top-row">
          <div className="icon-btn" onClick={goHome}>‹</div>
          <h1>Perfil</h1>
        </div>
        <div className="avatar-wrap">
          <div className="avatar"></div>
        </div>
        <h2>{name}</h2>
        <div className="phone">{sub}</div>
      </div>

      <div className="section-label">General</div>
      <div className="settings-list">
        <div className="settings-row">
          <div className="txt"><strong>Modo</strong><span>Dark &amp; Light</span></div>
          <div className="toggle"></div>
        </div>
        <div className="settings-row" onClick={() => showToast('Cambiar contraseña')}>
          <div className="txt"><strong>Contraseña</strong></div>
          <span className="chev">›</span>
        </div>
        <div className="settings-row" onClick={() => showToast('Lenguaje')}>
          <div className="txt"><strong>Lenguaje</strong></div>
          <span className="chev">›</span>
        </div>

        <div className="section-label">Informacion</div>
        <div className="settings-row" onClick={() => showToast('Datos personales')}>
          <div className="txt"><strong>Personal</strong></div>
          <span className="chev">›</span>
        </div>

        {isProductor ? (
          <>
            <div className="settings-row" onClick={() => showToast('Ubicación')}>
              <div className="txt"><strong>ubicacion</strong></div>
              <span className="chev">›</span>
            </div>
            <div className="settings-row" onClick={() => showToast('Cultivo')}>
              <div className="txt"><strong>Cultivo</strong></div>
              <span className="chev">›</span>
            </div>
          </>
        ) : (
          <>
            <div className="settings-row" onClick={() => showToast('Solicitar info')}>
              <div className="txt"><strong>Solicitar info</strong></div>
              <span className="chev">›</span>
            </div>
            <div className="settings-row" onClick={() => showToast('Ayuda')}>
              <div className="txt"><strong>Ayuda</strong></div>
              <span className="chev">›</span>
            </div>
          </>
        )}

        <div className="settings-row" onClick={() => showToast('Manual')}>
          <div className="txt"><strong>Manual</strong></div>
          <span className="chev">›</span>
        </div>
      </div>
    </>
  );
}

export default PantallaPerfil;