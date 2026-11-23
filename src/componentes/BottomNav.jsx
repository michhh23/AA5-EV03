import { useApp } from '../AppContext.js';

// MENÚ DE ABAJO
// Cambia los botones según el rol: gerencia, admin o productor.
// El botón de la pestaña actual lleva la clase active
function BottomNav() {
  const { state, goHome, setTab } = useApp();

  // Devuelve active si la pestaña es la que está abierta
  const clase = (tab) => (state.homeTab === tab ? 'active' : '');

  if (state.role === 'gerencia') {
    return (
      <div className="bottom-nav">
        <button className={clase('home')} onClick={goHome}>Inicio</button>
        <button className={clase('historial')} onClick={() => setTab('historial')}>Historial</button>
        <button className={clase('registroAdmin')} onClick={() => setTab('registroAdmin')}>Registro</button>
        <button className={clase('perfil')} onClick={() => setTab('perfil')}>Perfil</button>
      </div>
    );
  }

  if (state.role === 'admin') {
    return (
      <div className="bottom-nav">
        <button className={clase('home')} onClick={goHome}>Inicio</button>
        <button className={clase('historial')} onClick={() => setTab('historial')}>Historial</button>
        <button className={clase('registrarUsuario')} onClick={() => setTab('registrarUsuario')}>Registro</button>
        <button className={clase('perfil')} onClick={() => setTab('perfil')}>Perfil</button>
      </div>
    );
  }

  // Productor y agrónomo
  return (
    <div className="bottom-nav">
      <button className={clase('home')} onClick={goHome}>Inicio</button>
      <button className={clase('historial')} onClick={() => setTab('historial')}>Historial</button>
      <button className={clase('perfil')} onClick={() => setTab('perfil')}>Perfil</button>
    </div>
  );
}

export default BottomNav;