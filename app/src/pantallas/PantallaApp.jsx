import { useApp } from '../AppContext.js';
import BottomNav from '../componentes/BottomNav.jsx';
import PantallaRoles from './PantallaRoles.jsx';
import PantallaAlerta from './PantallaAlerta.jsx';
import PantallaGerencia from './PantallaGerencia.jsx';
import PantallaHistorial from './PantallaHistorial.jsx';
import PantallaCrearAlerta from './PantallaCrearAlerta.jsx';
import PantallaRegistroProductor from './PantallaRegistroProductor.jsx';
import PantallaRegistrarUsuario from './PantallaRegistrarUsuario.jsx';
import PantallaPerfil from './PantallaPerfil.jsx';

// ESTRUCTURA DE LA APP
// Después de iniciar sesión se muestra la pantalla de la pestaña activa
// y debajo el menú.
function PantallaApp() {
  const { state } = useApp();

  // PANTALLA PRINCIPAL SEGÚN EL ROL
  // Cada rol ve una pantalla de inicio diferente
  const pantallaSegunRol = () => {
    if (state.role === 'admin') return <PantallaRoles />;
    if (state.role === 'agronomo') return <PantallaCrearAlerta />;
    if (state.role === 'gerencia') return <PantallaGerencia />;
    return <PantallaAlerta />;
  };

  // ELEGIR QUÉ PANTALLA MOSTRAR SEGÚN LA PESTAÑA
  const pantallaSegunPestana = () => {
    switch (state.homeTab) {
      case 'home': return pantallaSegunRol();
      case 'historial': return <PantallaHistorial />;
      case 'crear': return <PantallaCrearAlerta />;
      case 'registroAdmin': return <PantallaRegistroProductor />;
      case 'registrarUsuario': return <PantallaRegistrarUsuario />;
      case 'perfil': return <PantallaPerfil />;
      default: return pantallaSegunRol();
    }
  };

  return (
    <>
      {pantallaSegunPestana()}
      <BottomNav />
    </>
  );
}

export default PantallaApp;