// CALENDARIO
// Dibuja el mes de junio.
const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const ESPACIOS = 1;
const DIAS_DEL_MES = 30;
const HOY = 17;

function Calendar() {
  // Array.from crea una lista con la cantidad de elementos que se le pide
  const espacios = Array.from({ length: ESPACIOS }, (_, i) => i);
  const dias = Array.from({ length: DIAS_DEL_MES }, (_, i) => i + 1);

  return (
    <div className="cal-grid">
      {DIAS_SEMANA.map((dia) => (
        <div key={dia} className="dow">{dia}</div>
      ))}
      {espacios.map((i) => (
        <div key={`vacio-${i}`} className="day empty"></div>
      ))}
      {dias.map((dia) => (
        <div key={dia} className={dia === HOY ? 'day today' : 'day'}>{dia}</div>
      ))}
    </div>
  );
}

export default Calendar;