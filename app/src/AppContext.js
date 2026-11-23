// Guarda el estado y las funciones que comparten todas las pantallas,
// como cambiar de pantalla o mostrar un mensaje.
// Así no hay que pasarlas una por una a cada pantalla
import { createContext, useContext } from 'react';

export const AppContext = createContext(null);

// Cada pantalla usa useApp para traer lo que necesita del contexto
export function useApp() {
  return useContext(AppContext);
}