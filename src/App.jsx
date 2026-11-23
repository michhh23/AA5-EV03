// useState guarda datos que cambian y useRef guarda el temporizador del mensaje
import { useState, useRef } from 'react';
import { AppContext } from './AppContext.js';
import { HISTORIAL_INICIAL } from './data/datos.js';
import Toast from './componentes/Toast.jsx';

// Pantallas
import PantallaInicio from './pantallas/PantallaInicio.jsx';
import PantallaLogin from './pantallas/PantallaLogin.jsx';
import PantallaRegistro from './pantallas/PantallaRegistro.jsx';
import PantallaRecuperar from './pantallas/PantallaRecuperar.jsx';
import PantallaCodigo from './pantallas/PantallaCodigo.jsx';
import PantallaNuevaContrasena from './pantallas/PantallaNuevaContrasena.jsx';
import PantallaApp from './pantallas/PantallaApp.jsx';

// ESTADO INICIAL
// Pantalla actual, rol del usuario, pestaña activa y el historial de alertas.
// Es el mismo objeto state que tenía en app.js
const ESTADO_INICIAL = {
  screen: 'splash',
  role: null,
  homeTab: 'home',
  alertConfirmed: false,
  codeAttemptWrong: false,
  adminSession: false,
  history: HISTORIAL_INICIAL,
};

// APP PRINCIPAL
// Dibuja el marco del celular y dentro la pantalla que toque.
function App() {
  const [state, setState] = useState(ESTADO_INICIAL);
  // Mensaje emergente y si se ve o no
  const [toast, setToast] = useState({ msg: '', visible: false });
  // Guarda el temporizador para poder reiniciarlo si sale otro mensaje
  const temporizador = useRef(null);

  // ACTUALIZAR EL ESTADO
  // Cambia solo los datos que se le pasan y deja los demás igual
  const actualizar = (cambios) => {
    setState((anterior) => ({ ...anterior, ...cambios }));
  };

  // NAVEGACIÓN
  // go cambia de pantalla y setTab cambia la pestaña del menú de abajo
  const go = (screen) => actualizar({ screen });
  const setTab = (tab) => actualizar({ homeTab: tab });

  // MENSAJE EMERGENTE
  // Muestra un aviso corto en la parte de arriba y lo oculta después de un rato
  const showToast = (msg) => {
    setToast({ msg, visible: true });
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      setToast((anterior) => ({ ...anterior, visible: false }));
    }, 1800);
  };

  // VOLVER AL INICIO
  // Si es administrador, recupera su rol para que vea otra vez el selector de roles
  const goHome = () => {
    setState((anterior) => ({
      ...anterior,
      homeTab: 'home',
      role: anterior.adminSession ? 'admin' : anterior.role,
    }));
  };

  // GUARDAR EL ROL ESCOGIDO
  const selectRole = (role) => {
    actualizar({ role, homeTab: 'home' });
  };

  // CONFIRMAR LA ALERTA
  // Marca la alerta como confirmada y avisa que se envió el SMS
  const confirmAlert = () => {
    actualizar({ alertConfirmed: true });
    showToast('Alerta confirmada y SMS enviado');
  };

  // ELEGIR QUÉ PANTALLA MOSTRAR
  // Según state.screen devuelve la pantalla que corresponde
  const pantallaActual = () => {
    switch (state.screen) {
      case 'splash': return <PantallaInicio />;
      case 'login': return <PantallaLogin />;
      case 'register': return <PantallaRegistro />;
      case 'registerCode': return <PantallaCodigo kind="register" />;
      case 'forgotPhone': return <PantallaRecuperar />;
      case 'forgotCode': return <PantallaCodigo kind="forgot" />;
      case 'resetPassword': return <PantallaNuevaContrasena />;
      case 'app': return <PantallaApp />;
      default: return <PantallaInicio />;
    }
  };

  // Todo lo que se comparte con las pantallas
  const contexto = { state, actualizar, go, setTab, showToast, goHome, selectRole, confirmAlert };

  return (
    <AppContext.Provider value={contexto}>

      {/* MARCO DEL CELULAR */}
      <div className="device">
        <div className="notch"></div>
        <div className="screen">
          <Toast msg={toast.msg} visible={toast.visible} />

          {/* ÁREA DE CONTENIDO. El key hace que la animación se repita al cambiar de pantalla */}
          <div className="view">
            <div
              key={`${state.screen}-${state.homeTab}-${state.role}`}
              className="fade-in"
              style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
            >
              {pantallaActual()}
            </div>
          </div>

        </div>
      </div>

    </AppContext.Provider>
  );
}

export default App;