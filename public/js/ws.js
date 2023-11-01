const IP = "ws://localhost:3000";
const socket = io(IP);
let envie = -1
socket.on("connect", () => {
    console.log("Me conecté a WS");
});

function mandarMensaje(mensaje) {
    mensaje = document.getElementById("mensaje").value
    if (envie == -1) {
    socket.emit("incoming-message", { data: mensaje });
    console.log("envie", mensaje);
    document.getElementById("chat").innerHTML += `
    <div class="chat2">
      <h1 class="chat"> ${mensaje}</h1>
    </div>
    `    
    envie = 1
    }};
socket.on("server-message", data => { // Llega el parametro NO el objeto
    console.log("tengo que mandar", data);
    if (envie == -1) {
        document.getElementById("chat").innerHTML += `
            <div class="chat1">
              <h1 class="chat">${data.mensaje.data}</h1>
          </div>
          `
          envie = 1
    }
    envie=-1
});

function unirmeSala() {
    socket.emit('unirme-room', {user: localStorage.getItem("user")}); 
}


/*
socket con fede
api: pedido http haces un pedido y el servidor te responde termina ahi la conexion
socket esta todo el tiempo conectado esperando recibir info 
hasta que te desconectes

socket.emit = emitir mensajes puede hacerlo el back como el front
manda un evento con lo que tiene que pasar si pasa eso se activa
el socket on con el mismo evento

socket on se "une" a ese evento, esta pendiente a ese evento 
y interpreta el mensaje

todos los eventos tienen que estar encerrados en el io.on que es de configuracion de conectarse a servidor
*/