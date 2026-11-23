// USUARIOS PERMITIDOS
// Usuario, contraseña y rol de cada cuenta que puede entrar
export const CREDENTIALS = {
  admin: { password: '123', role: 'admin' },
  productor: { password: '1234', role: 'productor' },
};

// HISTORIAL DE ALERTAS
// Alertas que se muestran en la pantalla de historial
export const HISTORIAL_INICIAL = [
  { title: 'LLUVIA EXTREMA', risk: 'Riesgo alto', date: '01/06/2026' },
  { title: 'TEMPERATURA', risk: 'Sin riesgo', date: '01/05/2026' },
  { title: 'VIENTO', risk: 'Riesgo Medio', date: '01/04/2026' },
];