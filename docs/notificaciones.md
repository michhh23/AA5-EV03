# Notificaciones

Servicios para enviar una alerta al productor por SMS o WhatsApp.

Por ahora el envio es simulado: el servidor arma el mensaje con los datos de la alerta y guarda que se envio, pero no manda un mensaje de verdad al celular.

Direccion del servidor: http://localhost:3000/api

## Enviar notificacion

POST /api/notificaciones

Lo usa la pantalla del productor cuando confirma la alerta y en el boton SMS.

Se envia:

    {
      "alertaId": 1,
      "canal": "whatsapp",
      "telefono": "3001234567"
    }

El id de la alerta y el canal son obligatorios. El canal puede ser sms o whatsapp.

Si sale bien responde:

    {
      "ok": true,
      "mensaje": "Alerta enviada por whatsapp",
      "datos": {
        "id": 1,
        "alertaId": 1,
        "canal": "whatsapp",
        "telefono": "3001234567",
        "mensaje": "AgroAlertas: LLUVIA EXTREMA en Tierralta. Riesgo Alto. Limpia los drenajes...",
        "fecha": "2026-11-23"
      }
    }

Responde:
- 201 Alerta enviada
- 400 Debe enviar alertaId y canal
- 400 El canal debe ser sms o whatsapp
- 404 Alerta no encontrada

## Ver notificaciones enviadas

GET /api/notificaciones

No se envia nada. Devuelve todos los envios que se han hecho.