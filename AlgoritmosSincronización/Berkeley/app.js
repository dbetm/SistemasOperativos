function lanzarMasterTimeDaemon() {
    // Inicialmente el maestro consigo mismo tiene una diferencia de 0
    var diferencia = document.getElementById("diferencia-maestro");
    diferencia.innerHTML = "0" + " seg";
    setInterval(actualizarMaestro, 1000);
}

function actualizarMaestro() {
    // Se recupera la fecha actual
    var fecha = new Date();
    var segundos = fecha.getSeconds();
    var minutos = fecha.getMinutes();
    var horas = fecha.getHours();
    var tiempo = document.getElementById("maestro");

    // Sumar la diferencia
    var diferencia = parseInt(document.getElementById("diferencia-maestro").innerHTML.split(" ")[0]);
    // Convertimos todo a segundos y sumamos la diferencia
    var horasSegundos = horas * 3600;
    var minutosSegundos = minutos * 60;
    segundos = segundos + minutosSegundos + horasSegundos + diferencia;
    // Hacemos floor para evitar los décimales
    horas = Math.floor(segundos/3600);
    minutos = Math.floor((segundos % 3600) / 60);
    segundos = segundos % 60;

    // Agregar los ceros cuando son unidades
    if(segundos < 10) segundos = "0" + segundos;
    if(minutos < 10) minutos = "0" + minutos;
    if(horas < 10) horas = "0" + horas;

    tiempo.innerHTML = horas + ":" + minutos + ":" + segundos;
}

function agregarEsclavo() {
    // Deshabilitar la edición de umbral
    document.getElementById("umbral").disabled = true;

    var esclavos = document.getElementById("esclavos");
    //console.log("Longitud: ", esclavos.childElementCount);
    var divEsclavo = document.createElement("div");
    var id = "esclavo-" + (esclavos.childElementCount+1);
    divEsclavo.setAttribute("id", id);
    divEsclavo.setAttribute("class", "esclavo");

    var numEsclavo = document.createElement("p");
    numEsclavo.setAttribute("class", "num");
    numEsclavo.innerHTML = esclavos.childElementCount+1;
    divEsclavo.appendChild(numEsclavo);

    var divReloj = document.createElement("div");
    divReloj.setAttribute("class", "reloj");
    var tiempo = document.createElement("p");
    tiempo.setAttribute("class", "tiempo");
    divReloj.appendChild(tiempo);
    divEsclavo.appendChild(divReloj);

    var divDiferencia = document.createElement("div");
    divDiferencia.setAttribute("class", "diferencia");
    divDiferencia.classList.add("oculto");
    var dif = document.createElement("p");
    divDiferencia.appendChild(dif);
    divEsclavo.appendChild(divDiferencia);

    // Agregar la maqueta de esclavo al nodo padre
    esclavos.appendChild(divEsclavo);

    var esclavo = Concurrent.Thread.create(lanzarSlaveTimeDaemon, id);
    nodos.push(esclavo);
}

function lanzarSlaveTimeDaemon(id) {
    var diferencia = obtenerDiferenciaAleatoria();
    document.getElementById(id).children[2].children[0].innerHTML = diferencia + " seg";
    setInterval(function() { actualizarReloj(id); }, 1000);
}

function actualizarReloj(id) {
    var esclavo = document.getElementById(id);
    var tiempo = esclavo.children[1].children[0];
    var fecha = new Date();
    var segundos = fecha.getSeconds();
    var minutos = fecha.getMinutes();
    var horas = fecha.getHours();
    // Sumar la diferencia
    var diferencia = parseInt(esclavo.children[2].children[0].innerHTML.split(" ")[0]);
    // Convertimos todo a segundos y sumamos la diferencia
    var horasSegundos = horas * 3600;
    var minutosSegundos = minutos * 60;
    segundos = segundos + minutosSegundos + horasSegundos + diferencia;
    // Hacemos floor para evitar los décimales
    horas = Math.floor(segundos/3600);
    minutos = Math.floor((segundos % 3600) / 60);
    segundos = segundos % 60;

    // Agregar los ceros cuando son unidades
    if(segundos < 10) segundos = "0" + segundos;
    if(minutos < 10) minutos = "0" + minutos;
    if(horas < 10) horas = "0" + horas;

    tiempo.innerHTML = horas + ":" + minutos + ":" + segundos;
}

function obtenerDiferenciaAleatoria() {
    var umbral = document.getElementById("umbral").value;
    var r1;
    var diferencia = 0;
    // Se implementa el método Monte Carlo
    while(true) {
        // Pick a random number
        r1 = Math.random()*(2*umbral) + 1;
        // Assign a probability
        var probability = r1;
        // Pick a second random value
        var r2 = Math.random()*(2*umbral) + 1;
        // Does it qualify? If so, we're done
        if(r2 > probability) break;
    }
    // Elegimos una diferencia positiva o negativa
    diferencia = (Math.random() < 0.5)? -r1 : r1;
    return Math.floor(diferencia);
}

function reiniciar() {
    /*
    // Detenemos los hilos
    for (var i = 0; i < nodos.length; i++) {
        //Concurrent.Thread.stop(nodos[i]);
    }
    // Eliminamos todos los nodos hijo de la sección de esclavos
    var esclavos = document.getElementById("esclavos");
    while (esclavos.firstChild) esclavos.removeChild(esclavos.firstChild);
    // Y lanzamos de nuevo el maestro
    Concurrent.Thread.create(lanzarMasterTimeDaemon);
    // Cambiamos el texto del botón de sincronizar
    var estado = document.getElementById("btnSincronizar");
    estado.innerHTML = "Go!";
    */
    location.reload();
}

function sincronizar() {
    var estado = document.getElementById("btnSincronizar");
    // Validar que haya esclavos
    if(document.getElementsByClassName("esclavo").length == 0) return;

    if(estado.firstChild.nodeValue == "Go!") {
        // Deshabilitar el botón de agregar esclavo
        document.getElementById("btnAgregarEsclavo").disabled = true;
        // Cambiar el nombre del botón
        estado.innerHTML = "Promediar";
        // Hacer visibles las diferencias de cada esclavo respecto del maestro
        var diferencias = document.getElementsByClassName("diferencia");
        for (var i = 0; i < diferencias.length; i++) {
            diferencias[i].classList.remove("oculto");
        }
    }
    else if(estado.firstChild.nodeValue == "Promediar") {
        var umbral = document.getElementById("umbral").value;
        var suma = 0;
        var cont = 0;
        // Cambiar el nombre del botón
        estado.innerHTML = "Mostrar correcciones";
        // Obtenemos todas las diferencias
        var diferencias = document.getElementsByClassName("diferencia");
        for (var i = 0; i < diferencias.length; i++) {
            var dif = parseInt(diferencias[i].children[0].innerHTML.split(" ")[0]);
            if(Math.abs(dif) <= umbral) {
                suma += dif;
                cont++;
            }
        }
        if(cont == 0) cont = 1;
        var promedio = Math.round(suma / cont);
        var p = document.createElement("p");
        p.innerHTML = "El promedio es: " + promedio;
        var divPromedio = document.getElementById("promedio");
        divPromedio.appendChild(p);
        divPromedio.classList.remove("oculto");
    }
    else if(estado.firstChild.nodeValue == "Mostrar correcciones") {
        // Cambiar el nombre del botón
        estado.innerHTML = "Ajustar";
        // Obtengo el resultado del promedio
        var promedio =
            parseInt(document.getElementById("promedio").children[0].innerHTML.split(" ")[3]);
        // Mostrar las correcciones en cada esclavo
        var diferencias = document.getElementsByClassName("diferencia");
        for (var i = 0; i < diferencias.length; i++) {
            var dif = parseInt(diferencias[i].children[0].innerHTML.split(" ")[0]);
            diferencias[i].children[0].innerHTML += " ~> " + (-dif + promedio) + " seg";
        }
    }
    // Ajustamos los relojes
    else {
        // Cambiar el nombre del botón
        estado.innerHTML = ":)";
        // Deshabilitamos el botón del proceso de sincronización
        estado.disabled = true;
        // Obtenemos todo el conjunto de diferencias
        var diferencias = document.getElementsByClassName("diferencia");
        for (var i = 0; i < diferencias.length; i++) {
            //var dif = diferencias[i].children[0].innerHTML.split(" ")[3] + " " + diferencias[i].children[0].innerHTML.split(" ")[4];
            var dif = parseInt(diferencias[i].children[0].innerHTML.split(" ")[3]);
            dif += parseInt(diferencias[i].children[0].innerHTML.split(" ")[0]);
            diferencias[i].children[0].innerHTML = dif + " seg";
            diferencias[i].classList.add("oculto");
        }
    }
}
