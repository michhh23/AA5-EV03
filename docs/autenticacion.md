# Autenticacion

Servicios para registrarse e iniciar sesion. Los usan las pantallas de login y registro de la app.

Direccion del servidor: http://localhost:3000/api

## Registro

POST /api/registro

Registra un usuario nuevo. Todos los que se registran desde la app quedan como productor. La contraseña se guarda cifrada.

Se envia:

    {
      "usuario": "mich",
      "password": "clave123",
      "nombre": "Michel",
      "telefono": "3001234567"
    }

El usuario y la contraseña son obligatorios, el nombre y el telefono no.

Responde:
- 201 Usuario registrado correctamente
- 400 Debe enviar usuario y contraseña
- 409 El usuario ya existe

## Login

POST /api/login

Revisa si el usuario y la contraseña son correctos. Si lo son, devuelve el rol para saber que pantallas mostrar en la app.

Se envia:

    {
      "usuario": "productor",
      "password": "1234"
    }

Si sale bien responde:

    {
      "ok": true,
      "mensaje": "Autenticación satisfactoria",
      "usuario": "productor",
      "rol": "productor",
      "nombre": "Productor asociado"
    }

Responde:
- 200 Autenticación satisfactoria
- 400 Debe enviar usuario y contraseña
- 401 Error en la autenticación (el usuario no existe o la contraseña esta mal)