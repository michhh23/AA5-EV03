# Usuarios

Servicios para ver, crear y eliminar usuarios. Los usa la pantalla de registrar usuario del administrador y la pantalla de perfil. Nunca devuelven la contraseña.

Direccion del servidor: http://localhost:3000/api

Los roles que hay son: admin, agronomo, gerencia y productor.

## Ver todos los usuarios

GET /api/usuarios

No se envia nada. Devuelve la lista de usuarios.

    {
      "ok": true,
      "datos": [
        { "usuario": "productor", "rol": "productor", "nombre": "Productor asociado", "telefono": "", "lote": "" },
        { "usuario": "admin", "rol": "admin", "nombre": "Argenis Yadir Mercado Triana", "telefono": "3234662288", "lote": "" }
      ]
    }

## Ver un usuario

GET /api/usuarios/productor

Se cambia productor por el usuario que se quiera ver. Lo usa la pantalla de perfil.

Responde:
- 200 con los datos del usuario
- 404 Usuario no encontrado

## Crear usuario

POST /api/usuarios

Lo usa el administrador para crear usuarios con su rol y su lote.

Se envia:

    {
      "usuario": "agro1",
      "password": "agro123",
      "rol": "agronomo",
      "lote": "Lote 4"
    }

El usuario y la contraseña son obligatorios. Si no se manda el rol queda como productor.

Responde:
- 201 Usuario registrado
- 400 Debe enviar usuario y contraseña
- 400 si el rol no es uno de los que existen
- 409 El usuario ya existe

## Eliminar usuario

DELETE /api/usuarios/agro1

No se envia nada.

Responde:
- 200 Usuario eliminado
- 404 Usuario no encontrado