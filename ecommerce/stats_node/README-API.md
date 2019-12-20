<a name="top"></a>
# Stats Service v0.1.0

Microservicio de Estadistica

- [Estadistica](#estadistica)
	- [Guardar estadistica](#guardar-estadistica)
	- [Obtener Estadistica antigua](#obtener-estadistica-antigua)
	
- [Obtener_Estadisticas_Nuevas](#obtener_estadisticas_nuevas)
	- [Obtener Estadisticas Nuevas](#obtener-estadisticas-nuevas)
	
- [RabbitMQ_GET](#rabbitmq_get)
	- [Para Estadisitica de Articulos y Carritos](#para-estadisitica-de-articulos-y-carritos)
	- [Login de Usuarios](#login-de-usuarios)
	- [Logout de Usuarios](#logout-de-usuarios)
	


# <a name='estadistica'></a> Estadistica

## <a name='guardar-estadistica'></a> Guardar estadistica
[Back to top](#top)

<p>Guardar estadistica nueva.</p>

	POST /v1/stats/history/



### Examples

Body

```
{
  "stat": "{string}"
  "labels": "{string}",
  "datasets": [{label: {string}, [data: {number}]}],
  "updated": "{Fecha ultima actualización}",
  "created": "{Fecha creado}"
}
```

### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
  "menssage": "{string}"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='obtener-estadistica-antigua'></a> Obtener Estadistica antigua
[Back to top](#top)

<p>Obtener estadistica antigua del la base de datos</p>

	GET /v1/stat/history/



### Examples

Body

```
{
  "label": "{string}",
  "data": [number]
}
```

### Success Response

Body

```
{
  "stat": "{string}"
  "labels": "{string}",
  "datasets": [{data}],
  "updated": "{Fecha ultima actualización}",
  "created": "{Fecha creado}"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='obtener_estadisticas_nuevas'></a> Obtener_Estadisticas_Nuevas

## <a name='obtener-estadisticas-nuevas'></a> Obtener Estadisticas Nuevas
[Back to top](#top)

<p>Devuelve las estadisticas requeridas</p>

	GET /v1/stats




### Success Response

Body

```
HTTP/1.1 200 OK
{
  "objId": "true|false",
  "collection": "{collection de la BD}",
  "typeTime": "{Filtro de por tiempo}",
  "accion": "{accion de auth}",
  "countObj": {Filtro por cantidad minima por articulo},
  "created": "{Fecha de Inicio}",
  "timeEnd": "{Fecha de finalizacion}",
  "enabled": true|false,
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='rabbitmq_get'></a> RabbitMQ_GET

## <a name='para-estadisitica-de-articulos-y-carritos'></a> Para Estadisitica de Articulos y Carritos
[Back to top](#top)

<p>Escucha de mensajes stat-article desde cart. Para Estadisitica de Articulos y Carritos</p>

	DIRECT cart/stat-article




### Success Response

Mensaje

```
{
   "type": "stat-article",
   "message": {
        "cartId": "{cartId}",
        "orderId": "{orderId}",
        "articleId": "{articleId}",
        "quantity": {quantity},
        "time": "{time}"
   }
}
```


## <a name='login-de-usuarios'></a> Login de Usuarios
[Back to top](#top)

<p>Escucha de mensajes login desde auth.</p>

	FANOUT auth/login




### Success Response

Mensaje

```
{
   "type": "logout",
   "message": "NaN",
   "time": "Date"
}
```


## <a name='logout-de-usuarios'></a> Logout de Usuarios
[Back to top](#top)

<p>Escucha de mensajes logout desde auth.</p>

	FANOUT auth/logout




### Success Response

Mensaje

```
{
   "type": "logout",
   "message": "NaN",
   "time": "Date"
}
```


