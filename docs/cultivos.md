# Cultivos

Servicios del registro que hace gerencia: tipo de cultivo, edad en meses, area del lote y productor asociado.

Direccion del servidor: http://localhost:3000/api

Un cultivo se guarda asi:

    {
      "id": 1,
      "tipo": "Platano",
      "edadMeses": 6,
      "area": 2.5,
      "productor": "Eduardo Perez Martinez"
    }

## Ver cultivos

GET /api/cultivos

No se envia nada. Devuelve todos los cultivos.

## Crear cultivo

POST /api/cultivos

Lo usa la pantalla de registro de gerencia.

Se envia:

    {
      "tipo": "Maiz",
      "edadMeses": 3,
      "area": 1.5,
      "productor": "Argenis Mercado"
    }

Todos los datos son obligatorios. La edad va de 1 a 12 meses y el area (en hectareas) tiene que ser mayor a cero.

Responde:
- 201 Registro guardado
- 400 si falta algun dato o si la edad o el area no son validas

## Editar cultivo

PUT /api/cultivos/2

Se envia solo lo que se quiere cambiar. Por ejemplo:

    {
      "area": 3
    }

Responde:
- 200 Cultivo actualizado
- 400 si algun dato no es valido
- 404 Cultivo no encontrado

## Eliminar cultivo

DELETE /api/cultivos/2

No se envia nada.

Responde:
- 200 Cultivo eliminado
- 404 Cultivo no encontrado