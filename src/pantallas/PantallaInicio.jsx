import { useApp } from '../AppContext.js';

// PANTALLA DE INICIO
// Primera pantalla: nombre de la app, imagen y botón para continuar al login
function PantallaInicio() {
  const { go } = useApp();

  return (
    <div className="auth-wrap" style={{ background: 'var(--sky-mid)', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 30px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', textDecoration: 'underline', color: 'var(--ink)', marginBottom: '16px' }}>AGROALERTAS</h1>
      <img src="assets/inicio.png" alt="AgroAlertas" style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '16px' }} />
      <button className="btn-app btn-skyblue" style={{ maxWidth: '220px', marginBottom: '16px' }} onClick={() => go('login')}>Seguir</button>
      <img src="assets/login.png" alt="viento" style={{ width: '80px', height: 'auto', objectFit: 'contain' }} />
    </div>
  );
}

export default PantallaInicio;