##  Notas:
###  **HTTP y WebSockets: Explicación, Diferencias y Funcionamiento**

###  **1. ¿Qué es HTTP?**

**HTTP (HyperText Transfer Protocol)** es un protocolo de comunicación utilizado en la web para la transferencia de datos entre clientes (navegadores, apps) y servidores. Es un protocolo basado en **solicitud-respuesta**, lo que significa que un cliente envía una petición y el servidor responde con los datos solicitados.

####  **Características de HTTP:**

- Es **sin estado**: Cada solicitud es independiente y no mantiene conexión con la anterior.

- Usa el modelo **request-response**: Un cliente hace una solicitud (`GET`, `POST`, etc.) y el servidor responde con los datos o recursos.

- Se usa principalmente para **navegar en la web**, APIs REST, descargar archivos, etc.

- Funciona sobre el **protocolo TCP/IP** en el puerto 80 (HTTP) o 443 (HTTPS con SSL/TLS)

- Es **basado en texto**, lo que lo hace fácil de leer y depurar.


###  **2. ¿Qué es WebSockets?**

**WebSockets** es un protocolo de comunicación que permite una **conexión bidireccional persistente** entre el cliente y el servidor. A diferencia de HTTP, WebSockets mantiene una conexión abierta, lo que permite que **tanto el cliente como el servidor puedan enviar mensajes en cualquier momento** sin necesidad de hacer múltiples solicitudes.

####  **Características de WebSockets:**

-  **Conexión persistente**: Una vez establecida, la conexión se mantiene abierta.

-  **Comunicación en tiempo real**: Se usa para chats, notificaciones en vivo, streaming de datos, etc.

-  **Menos sobrecarga**: No requiere enviar encabezados en cada mensaje como HTTP.

-  **Usa el protocolo TCP** y generalmente se ejecuta en el puerto **80** o **443**.

- Se inicia con una solicitud HTTP especial (`Upgrade`), luego cambia a WebSocket.


###  **3. Diferencias entre HTTP y WebSockets**

| Característica        | HTTP | WebSockets |
|-----------------------|----------------------------------------------|---------------------------------|
|  **Tipo de conexión**  | Basado en solicitud-respuesta (*stateless*) | Conexión persistente (*stateful*)|
|  **Bidireccionalidad**  | El cliente inicia la solicitud | Tanto cliente como servidor envían datos |
|  **Tiempo real**  | No es eficiente para tiempo real | Ideal para comunicación en tiempo real |
|  **Eficiencia**  | Consumo de encabezados en cada solicitud | Bajo consumo mantiene la conexión abierta |
|  **Casos de uso**  | APIs REST, transf. de archivos | Chats, juegos en línea, notif. en vivo |


###  **4. ¿Cuándo usar HTTP o WebSockets?**

✅ **Usar HTTP cuando:**

- Necesitas hacer solicitudes esporádicas al servidor (Ej: APIs REST).

- No es necesario actualizar los datos en tiempo real.

- El tráfico es liviano y las respuestas del servidor son predecibles.

✅ **Usar WebSockets cuando:**

- Se requiere comunicación en tiempo real (Ej: chats, videojuegos, transmisiones en vivo).

- Se espera una gran cantidad de interacciones entre cliente y servidor.

- Se necesita minimizar la sobrecarga de abrir y cerrar conexiones constantemente.

## npm install morgan: 

Morgan es un middleware para Express que se usa para registrar las solicitudes HTTP en el servidor.

Con `morgan`, cada vez que alguien haga una solicitud al servidor, se imprimirá información en la terminal, como el método HTTP, la URL, el estado de respuesta y el tiempo de respuesta.

## Para usar websocket:

***instalamos socket.io***

`npm i socket.io`

Socket.IO permite la comunicación bidireccional basada en eventos en tiempo real

Sus principales características son:

***Fiabilidad***
Las conexiones se establecen incluso en presencia de:

- Proxies y balanceadores de carga.
- Firewall personal y software antivirus.

***Soporte de reconexión automática***

A menos que se indique lo contrario, un cliente desconectado intentará volver a conectarse para siempre, hasta que el servidor vuelva a estar disponible.

***Detección de desconexión***

Se implementa un mecanismo de latido en el nivel Engine.IO, lo que permite que tanto el servidor como el cliente sepan cuándo el otro ya no responde.

**Nota:** Socket.IO no es una implementación de WebSocket. Aunque Socket.IO utiliza WebSocket como transporte cuando es posible, agrega algunos metadatos a cada paquete: el tipo de paquete, el espacio de nombres y el identificador de acuse de recibo cuando se necesita un acuse de recibo de un mensaje.