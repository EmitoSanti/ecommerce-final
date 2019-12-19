<a name="top"></a>
# Stats Service v0.1.0

Microservicio de Estadistica

- [Carrito](#carrito)
	- [Agregar Artículo](#agregar-artículo)
	- [Checkout](#checkout)
	- [Decrementar](#decrementar)
	- [Incrementar](#incrementar)
	- [Obtener Carrito](#obtener-carrito)
	- [Quitar Artículo](#quitar-artículo)
	- [Validar Carrito](#validar-carrito)
	
- [RabbitMQ_GET](#rabbitmq_get)
	- [Para Estadisitica de Articulos y Carritos](#para-estadisitica-de-articulos-y-carritos)
	- [Login de Usuarios](#login-de-usuarios)
	- [Logout de Usuarios](#logout-de-usuarios)
	


# <a name='carrito'></a> Carrito

## <a name='agregar-artículo'></a> Agregar Artículo
[Back to top](#top)

<p>Agregar artículos al carrito.</p>

	POST /v1/cart/article



### Examples

Body

```
{
  "articleId": "{Article Id}",
  "quantity": {Quantity to add}
}
```

### Success Response

Body

```
{
  "userId": "{User Id}",
  "enabled": true|false,
  "_id": "{Id de carrito}",
  "articles": [{Artículos}],
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
## <a name='checkout'></a> Checkout
[Back to top](#top)

<p>Realiza el checkout del carrito.</p>

	POST /v1/cart/checkout




### Success Response

Body

```
HTTP/1.1 200 Ok
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
## <a name='decrementar'></a> Decrementar
[Back to top](#top)

<p>Decrementa la cantidad de artículos en el cart.</p>

	POST /v1/cart/article/:articleId/decrement




### Success Response

Body

```
{
  "articleId": "{Article Id}",
  "quantity": {articles to decrement}
}
```
Body

```
{
  "userId": "{User Id}",
  "enabled": true|false,
  "_id": "{Id de carrito}",
  "articles": [{Artículos}],
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
## <a name='incrementar'></a> Incrementar
[Back to top](#top)

<p>Incrementa la cantidad de artículos en el cart.</p>

	POST /v1/cart/article/:articleId/increment




### Success Response

Body

```
{
  "articleId": "{Article Id}",
  "quantity": {articles to increment},
  "validated": True|False Determina si el articulo se valido en catalog
}
```
Body

```
{
  "userId": "{User Id}",
  "enabled": true|false,
  "_id": "{Id de carrito}",
  "articles": [{Artículos}],
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
## <a name='obtener-carrito'></a> Obtener Carrito
[Back to top](#top)

<p>Devuelve el carrito activo.</p>

	GET /v1/cart




### Success Response

Body

```
{
  "userId": "{User Id}",
  "enabled": true|false,
  "_id": "{Id de carrito}",
  "articles": [{Artículos}],
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
## <a name='quitar-artículo'></a> Quitar Artículo
[Back to top](#top)

<p>Eliminar un articulo del carrito.</p>

	DELETE /cart/article/:articleId




### Success Response

Body

```
HTTP/1.1 200 Ok
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
## <a name='validar-carrito'></a> Validar Carrito
[Back to top](#top)

<p>Realiza una validación completa del cart, para realizar el checkout.</p>

	POST /v1/cart/validate




### Success Response

Body

```
{
   "errors": [
       {  "articleId": "{Article}",
          "message" : "{Error message}"
       }, ...],
   "warnings": [
       {  "articleId": "{Article}",
          "message" : "{Error message}"
       }, ...]
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
        "time": "{time}""
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


