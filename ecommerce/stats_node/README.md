# Microservicio de Estadisticas

Este microservicio genera estadisiticas con datos generados por usuarios, carritos y articulos agregados a carritos.

Existen varios tipos de estadisticas:
    * Usuarios logeados por minuto y por hora.
    * Usuarios deslogeados por minuto y por hora.
    * Carritos creados por hora y cantidad de articulos total de cada carrito.
    * Articulos más incorporados a los carritos por minuto y por hora.

En el apartado de "Obtener Estadisticas"
Se pueden realizar cosultas dependiendo del filtro seteado por el usuario administrador se puede generar un grafico y 
guardar esa cosnulta.

Tipos de filtro: tipos de estadisticas de usuarios/carritos/articulos, intervalos por minuto/hora, acción de login/logout (solo para usuarios), Contador por registro mayor a un numero que se puede estableser libremente , y por ultimo rango de fecha y hora

En el apartado de "Historial"
Se pueden visualizar una lista de estadisticas previamente guardadas. Si se lo desea se puede generar de nuevo el grafico correspondiente a esa estadistica.


[Documentación de API](./README-API.md)

La documentación de las api también se pueden consultar desde el home del microservicio
que una vez levantado el servidor se puede navegar en [localhost:4200](http://localhost:4200/)

## Dependencias
    * Lodash
    * moment
(https://github.com/EmitoSanti/ecommerce-final/blob/master/ecommerce/stats_node/package.json)

### Node 8

Seguir los pasos de instalación del sitio oficial

[nodejs.org](https://nodejs.org/en/)

### MongoDb

Ver tutorial de instalación en [README.md](../README.md) en la raíz.

### RabbitMQ

La comunicación con Cart y Auth es a través de rabbit.

Ver tutorial de instalación en [README.md](../README.md) en la raíz.

## Ejecución

Abrir ventana de comandos en la carpeta del microservicio y ejecutar :

```bash
npm install
npm start
```

## Apidoc

Apidoc es una herramienta que genera documentación de apis para proyectos node (ver [Apidoc](http://apidocjs.com/)).

El microservicio muestra la documentación como archivos estáticos si se abre en un browser la raíz del servidor [localhost:3008](http://localhost:3008/)

Ademas se genera la documentación en formato markdown.

## Archivo .env

Este archivo permite configurar diversas opciones de la app, ver ejemplos en .env.example
