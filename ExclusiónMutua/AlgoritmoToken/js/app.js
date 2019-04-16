var numProcesos = 5;
var procesos = new CircularQueue(numProcesos);
var contador = 0;

function init() {
    // Se obtiene la referencia de los procesos
    var ps = document.getElementsByClassName("proceso");
    // Agregamos los procesos a la cola circular
    for (var i = 0; i < ps.length; i++) {
        procesos.enqueue(ps[i]);
    }
    // Lanzamos el hilo que se encarga de ir pasando el token
    Concurrent.Thread.create(lanzarDaemon);
}

function lanzarDaemon() {
    setInterval(moverToken, 1500);
}

function moverToken() {
    //console.log(procesos.get(contador % numProcesos));
    // quitar la clase 'seleccionado' del proceso anterior
    procesos.get(contador % numProcesos).classList.remove('seleccionado');
    if(procesos.get((contador+1) % numProcesos).classList.contains("fallando")) {
        contador++;
        moverToken();
        return;
    }
    contador++;
    // poner la clase 'seleccionado' al proceso actual
    var sigProceso = procesos.get(contador % numProcesos);
    if(!sigProceso.classList.contains("fallando")) {
        sigProceso.classList.add('seleccionado');
    }
    if(!sigProceso.classList.contains("fallando") &&
        sigProceso.classList.contains("solicitado")) {
        // al proceso seleccionado anterior le remuevo la clase de seleccionado
        procesos.get((--contador) % numProcesos).classList.remove('seleccionado');
        sigProceso.classList.add('seleccionado');
        // habilitar el botón de liberar
        var btnLiberar = sigProceso.children[2];
        btnLiberar.classList.remove("noDisponible");
        btnLiberar.disabled = false;
    }

}

function solicitar(id, btn) {
    var proceso = document.getElementById(id).parentElement;
    // agrega la clase de solicitar al proceso
    proceso.classList.add('solicitado');
    // deshabilitar el botón de solicitar
    btn.classList.add("noDisponible");
    btn.disabled = "true";
}

function liberar(id, btn) {
    var proceso = document.getElementById(id).parentElement;
    // remueve la clase de solicitado
    proceso.classList.remove('solicitado');
    // deshabilitar el botón de liberar
    btn.classList.add("noDisponible");
    btn.disabled = true;
    // habilitar el botón de solicitar
    var btnSolicitar = proceso.children[1];
    btnSolicitar.classList.remove("noDisponible");
    btnSolicitar.disabled = false;
}

function fallar(id, btn) {
    var proceso = document.getElementById(id).parentElement;
    proceso.classList.add('fallando');
    // deshabilitar el botón de fallar
    btn.classList.add("noDisponible");
    btn.disabled = true;
    // deshabilitar el botón de solicitar
    var btnSolicitar = proceso.children[1];
    btnSolicitar.classList.add("noDisponible");
    btnSolicitar.disabled = true;
    // deshabilitar el botón de liberar
    var btnLiberar = proceso.children[2];
    btnLiberar.classList.add("noDisponible");
    btnLiberar.disabled = true;
}
