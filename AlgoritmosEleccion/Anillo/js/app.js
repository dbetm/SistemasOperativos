/*
+ Inicialmente todos los procesos tienen su lista en orden lógico de esa manera
conocen la estructura del anillo.

+ Cada vez que hay una caída (de algún nodo) la lista de todos los nodos se debe
actualizar, de esta forma, desde la posición del proceso que se da cuenta se comienza
a enviar un mensaje (donde se van agregando los id's) a su sucesor, si este contesta
con un mensaje, dicho receptor repetirá el proceso de enviar el mensaje a su sucesor,
si, no hay respuesta, entonces, mandará mensaje al sucesor del proceso que no
le contestó.
*/
var nodos = [0, 1, 2, 3, 4, 5, 6, 7];
var procesos = [];
var mensaje = [];

function init() {
    for (var i = 0; i < nodos.length; i++) {
        var proceso = new Proceso(nodos[i]);
        procesos.push(proceso);
    }

    // Actualizamos la lista inicial en cada uno de los procesos
    for (var i = 0; i < procesos.length; i++) procesos[i].setLista(nodos);
    // Obtenemos el número de proceso de mayor valor para que indique que es
    // coordinador
    var max_of_array = Math.max.apply(Math, nodos);
    procesos[max_of_array].recibirMensaje("Soy coordinador");
    procesos[max_of_array].agregarRolCoordinador();
    var tagsIdCoordinador = document.getElementsByClassName("idCoordinador");
    for (var i = 0; i < tagsIdCoordinador.length; i++) {
        tagsIdCoordinador[i].innerHTML = max_of_array;
    }
}

function fallar(id) {
    procesos[id].fallar();

    // Si el que falla es el coordinador
    if(procesos[id].soyCoordinador()) {
        // Quitar el puesto de coordinador
        procesos[id].quitarRolCoordinador();
        var otroId;
        // Se debe elegir un proceso de forma aleatoria, que es el que se dará cuenta
        // de que el coordinador ha fallado.
        do {
            otroId = Math.floor(Math.random() * procesos.length);
        } while(procesos[otroId].getEstado == "fallando");
        mensaje.push(otroId);
        procesoDeActualizacion(otroId);
    }
    else {
        var otroId;
        // Se debe elegir un proceso de forma aleatoria, que es el que se dará cuenta
        // de que el proceso p_i ha fallado
        do {
            otroId = Math.floor(Math.random() * procesos.length);
        } while(procesos[otroId].getEstado == "fallando");
        mensaje.push(otroId);
        procesoDeActualizacion(otroId);
    }
}

function procesoDeActualizacion(id) {
    if(procesos[(id+1) % nodos.length].getEstado() == "activo") {
        var ans = procesos[(id+1) % nodos.length].recibirMensaje(mensaje);
        if(!mensaje.includes((id+1) % nodos.length)) {
            mensaje.push((id+1) % nodos.length);
        }
        if(ans === "fin") {
            // Es necesario actualizar la lista de nodos
            nodos = mensaje.sort();
            // Ponemos un pequeño retardo
            setTimeout(function() {
                // E inicializamos de nuevo
                mensaje = [];
                procesos = [];
                init();
            }, 6000);
        }
        else {
            setTimeout(function() {
                procesoDeActualizacion((id + 1) % nodos.length);
            }, 2000);
        }
    }
    else procesoDeActualizacion((id + 1) % nodos.length);
}

function recuperar(id) {
    nodos.push(id);
    var proceso = new Proceso(id);
    proceso.recuperar();
    procesos.push(proceso);
    // Obtener el id del actual coordinador
    var idCoordinador =
        document.getElementsByClassName("idCoordinador")[0].innerHTML;
    // Quitamos su rol al actual coordinador
    for (var i = 0; i < procesos.length; i++) {
        if(procesos[i].getId() == idCoordinador) {
            procesos[i].quitarRolCoordinador();
        }
    }
    mensaje.push(id);
    procesoDeActualizacion(id);
}
