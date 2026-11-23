// Este es el primer archivo que se ejecuta. Carga los estilos y
// dibuja toda la aplicación dentro del div con id root del index.html

// StrictMode revisa el código mientras desarrollo y avisa errores comunes
import { StrictMode } from 'react';
// createRoot conecta React con el div root del index.html
import { createRoot } from 'react-dom/client';

// Primero se carga Bootstrap y después mis estilos,
// así mis estilos tienen prioridad y no se pierde el diseño
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

// App es el componente principal con el marco del celular y las pantallas
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);