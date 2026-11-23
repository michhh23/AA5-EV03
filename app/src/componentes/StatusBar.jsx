// BARRA SUPERIOR
// Dibuja la barra con la hora que va arriba de las pantallas.
// Si dark es verdadero la letra es oscura, si no es blanca
function StatusBar({ dark }) {
  return (
    <div className="statusbar" style={{ color: dark ? '#132A44' : '#fff' }}>
      <span>07:00</span>
    </div>
  );
}

export default StatusBar;