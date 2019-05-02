var procesos = [
    document.getElementById("p-" + 0),
    document.getElementById("p-" + 1),
    document.getElementById("p-" + 2),
    document.getElementById("p-" + 3),
    document.getElementById("p-" + 4),
    document.getElementById("p-" + 5),
    document.getElementById("p-" + 6),
    document.getElementById("p-" + 7)
];

function fallar(id) {
    // Poner clase de 'fallando' (color rojo).
    var proceso = procesos[id];
    proceso.classList.add("fallando");
    // Deshabilitar el botón de fallar y agregar clase 'deshabilitado'.
    proceso.children[4].disabled = true;
    proceso.children[4].classList.add("deshabilitado");
    // Habilitar el botón de recuperar y remover clase 'deshabilitado'.
    proceso.children[3].disabled = false;
    proceso.children[3].classList.remove("deshabilitado");
    // Por si acaso tiene la clase de 'convocador'
    proceso.classList.remove('convocador');

    // Si el proceso que falla es el coordinador algún otro proceso, que no
    // esté fallando, debe darse cuenta y debe convocar a elección, en este caso
    // dicho proceso de elige de forma aleatoria.
    if(proceso.classList.contains("coordinador")) {
        // remover clase 'coordinador'.
        proceso.classList.remove("coordinador");
        setTimeout(function() {
            do {
                var nextId = Math.floor(Math.random() * 8);
                var probProceso = procesos[nextId];
            } while(nextId == id || probProceso.classList.contains("fallando"));
            convocarEleccion(nextId);
        }, 2000);
    }
}

function recuperar(id) {
    // Remover clase de fallando
    var proceso = procesos[id];
    proceso.classList.remove("fallando");
    // Habilitar el botón de fallar
    proceso.children[4].disabled = false;
    proceso.children[4].classList.remove("deshabilitado");
    // Deshabilitar el botón de recuperar
    proceso.children[3].disabled = true;
    proceso.children[3].classList.add("deshabilitado");
    // Remover el cargo al coordinador, en este caso se busca
    for (var i = procesos.length-1; i >= 0; i--) {
        if(i == id) continue;
        if(procesos[i].classList.contains("coordinador")) {
            procesos[i].classList.remove("coordinador");
            break;
        }
    }
    // Se convoca a una elección
    convocarEleccion(id);
}

function convocarEleccion(id) {
    // Se hace la referencia
    var proceso = procesos[id];
    /* Se agrega la clase para identificar que es el proceso que convoca a la
    elección */
    proceso.classList.add("convocador");
    // Muestra mensaje que dice "Elección".
    var popup = document.getElementById("popup-" + id);
    popup.innerHTML = "Elección";
    mensaje(popup);
    var oks = 0;
    // A los procesos con identificadores mayores los ponemos de morado
    // si no han fallado muestran mensaje de ok y se cuentan estos.
    setTimeout(function() {
        for (var i = id+1; i < procesos.length; i++) {
            procesos[i].classList.add("participante");
            // Si el proceso está disponible responderá con un "Ok".
            if(!procesos[i].classList.contains("fallando")) {
                oks++;
                popup = document.getElementById("popup-" + i);
                popup.innerHTML = "Ok";
                mensaje(popup);
            }
        }
        // Removemos la clase 'participante' (morado) y quitamos su mensaje
        setTimeout(function() {
            for (var i = id+1; i < procesos.length; i++) {
                procesos[i].classList.remove("participante");
                // Quitar los mensajes "Ok".
                if(!procesos[i].classList.contains("fallando")) {
                    popup = document.getElementById("popup-" + i);
                    mensaje(popup);
                }
            }
            if(oks > 0) {
                // Quitamos su rol de convocador
                proceso.classList.remove("convocador");
                // Y el mensaje de elección
                popup = document.getElementById("popup-" + id);
                mensaje(popup);
                // Se hace una llamada recursiva, para que el mayor inmediato haga
                // la elección.
                convocarEleccion(id+1);
            }
            else {
                // Avisa a todos que se ha convertido en el coordinador
                proceso.classList.add("coordinador");
                popup = document.getElementById("popup-" + id);
                popup.innerHTML = "Coordinador";
                // Un momento después desaparece el mensaje
                setTimeout(function() {
                    mensaje(popup);
                    // Se remueve la clase de convocador
                    proceso.classList.remove("convocador");
                }, 4000);
            }
        }, 5000);
    }, 2000);
}

function mensaje(popup) {
    popup.classList.toggle("show");
}
