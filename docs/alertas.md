# Alertas

Servicios de las alertas del clima. El agronomo las crea, el productor las ve y las confirma, y en el historial se pueden buscar por fecha.

Direccion del servidor: http://localhost:3000/api

Eventos que se pueden usar: LLUVIA, VIENTO, TEMPERATURA y SEQUIA.
Riesgos que se pueden usar: Bajo, Medio y Alto.

Una alerta se guarda asi:

    {
      "id": 1,
      "titulo": "LLUVIA EXTREMA",
      "evento": "LLUVIA",
      "riesgo": "Alto",
      "ubicacion": "Tierralta",
      "recomendacion": "Limpia los drenajes. No abones ni fumigues.",
      "fecha": "2026-06-01",
      "confirmada": false
    }

## Ver alertas

GET /api/alertas

Devuelve todas las alertas, primero las mas nuevas. Lo usan la pantalla del productor y el historial.

Para buscar por fecha se agrega el periodo (dia, mes o anio) y la fecha. Por ejemplo, para ver las de junio de 2026:

    GET /api/alertas?periodo=mes&fecha=2026-06-01

Responde:
- 200 con la lista de alertas
- 400 El periodo debe ser dia, mes o anio

## Ver una alerta

GET /api/alertas/1

Responde:
- 200 con la alerta
- 404 Alerta no encontrada

## Crear alerta

POST /api/alertas

La usa la pantalla de crear alerta del agronomo. La fecha se pone sola con el dia de hoy.

Se envia:

    {
      "titulo": "Ola de calor",
      "evento": "TEMPERATURA",
      "riesgo": "Alto",
      "ubicacion": "Tierralta, Vereda La Esperanza",
      "recomendacion": "Riega en la mañana temprano o al final de la tarde"
    }

El titulo, el evento, el riesgo y la ubicacion son obligatorios.

Responde:
- 201 Alerta guardada
- 400 si falta algun dato o si el evento o el riesgo no existen

## Editar alerta

PUT /api/alertas/4

Se envia solo lo que se quiere cambiar, lo demas queda igual. Por ejemplo:

    {
      "riesgo": "Medio"
    }

Responde:
- 200 Alerta actualizada
- 400 si algun dato no es valido
- 404 Alerta no encontrada

## Confirmar alerta

PATCH /api/alertas/1/confirmar

No se envia nada. Lo usa el boton CONFIRMAR del productor.

Responde:
- 200 Alerta confirmada
- 404 Alerta no encontrada

## Eliminar alerta

DELETE /api/alertas/4

No se envia nada.

Responde:
- 200 Alerta eliminada
- 404 Alerta no encontrada