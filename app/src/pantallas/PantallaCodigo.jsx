import { useState } from 'react';
import { useApp } from '../AppContext.js';
import StatusBar from '../componentes/StatusBar.jsx';

// PANTALLA PARA INGRESAR EL CÓDIGO
// Se usa en el registro y en recuperar contraseña, eso lo dice kind.
// Si el código estaba mal, muestra un aviso de error arriba
function PantallaCodigo({ kind }) {
  const { state, actualizar, go, showToast } = useApp();
  // Lo que el usuario escribe en el campo del código
  const [codigo, setCodigo] = useState('');

  const wrong = state.codeAttemptWrong;
  // Si viene del registro entra a la app, si viene de recuperar va a cambiar la contraseña
  const nextScreen = kind === 'register' ? 'app' : 'resetPassword';

  // REENVIAR EL CÓDIGO
  const resendCode = () => {
    showToast('Código reenviado');
  };

  // VERIFICAR EL CÓDIGO
  // Si tiene menos de 4 números muestra el error, si no pasa a la siguiente pantalla
  const submitCode = () => {
    if (codigo.trim().length < 4) {
      actualizar({ codeAttemptWrong: true });
      return;
    }

    if (nextScreen === 'app') {
      actualizar({
        codeAttemptWrong: false,
        role: 'productor',
        adminSession: false,
        homeTab: 'home',
        screen: 'app',
      });
    } else {
      actualizar({ codeAttemptWrong: false, screen: nextScreen });
    }
  };

  // LO QUE SE VE EN PANTALLA
  // Si el código está mal sale el aviso de error, si no sale el título YA CASI.
  // Debajo va el sol, el campo del código y los botones de reenviar y seguir
  return (
    <>
      <StatusBar dark />
      <div
        className="auth-wrap"
        style={{ background: 'var(--sky-bright)' }}
      >
        {wrong ? (
          <div
            className="banner error"
            style={{ margin: '16px 16px 0', background: '#e9e6ea' }}
          >
            <div style={{ flex: 1 }}>
              <p className="banner-title">¡CODIGO INCORRECTO!</p>
              <p>Verifique su número de teléfono o reenvíelo</p>
            </div>
            <span
              style={{ cursor: 'pointer', fontWeight: 700 }}
              onClick={() => actualizar({ codeAttemptWrong: false })}
            >
              Cerrar
            </span>
          </div>
        ) : (
          <>
            <div style={{ padding: '22px 24px 4px' }}>
              <span
                className="auth-back"
                style={{ color: '#fff' }}
                onClick={() => go('login')}
              >
                ‹
              </span>
            </div>
            <div
              style={{ textAlign: 'center', padding: '0 24px 10px' }}
            >
              <p
                style={{
                  color: '#fff',
                  letterSpacing: '1px',
                  margin: 0,
                }}
              >
                YA CASI
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#fff',
                  fontSize: '26px',
                  margin: '2px 0 12px',
                }}
              >
                Ultimo paso
              </h1>
            </div>
          </>
        )}

        <div
          style={{
            textAlign: 'center',
            margin: `${wrong ? '26px' : '6px'} 0 20px`,
          }}
        >
          <span className="hero-img">
            <img src="assets/solcodigo.png" alt="sol" />
          </span>
        </div>

        <div
          style={{
            background: 'var(--cream)',
            flex: 1,
            borderTopLeftRadius: '36px',
            borderTopRightRadius: '36px',
            padding: '34px 26px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            id="codeInput"
            placeholder="ingrese el codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            style={{
              width: '100%',
              textAlign: 'center',
              border: '2px solid var(--ink)',
              borderRadius: '999px',
              padding: '15px',
              fontSize: '15px',
              background: 'transparent',
              marginBottom: '18px',
            }}
          />
          <button
            className="btn-app btn-indigo"
            style={{ marginBottom: '8px' }}
            onClick={resendCode}
          >
            Reenviar
          </button>
          <p className="timer-note">
            120 segundos para reenviar codigo
          </p>
          <button
            className="btn-app btn-indigo"
            style={{ maxWidth: '200px' }}
            onClick={submitCode}
          >
            SEGUIR
          </button>
        </div>
      </div>
    </>
  );
}

export default PantallaCodigo;