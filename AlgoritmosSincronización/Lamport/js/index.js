var procesosSeleccionados = [];
var contadorMensajes = 0;

function addProcess() {
    // Hacemos referencia al padre de los procesos
    var processList = document.getElementById("processList");

    //The div of a process block
    var divProcess = document.createElement("div");
    var idProceso = "processList-" + (processList.childElementCount+1);
    divProcess.setAttribute("id", idProceso);
    divProcess.setAttribute("class", "process");

    // Number of proccess
    // var tagId = document.createElement("p");
    // tagId.setAttribute("class", "tag-id");
    // tagId.innerHTML = "P"+(processList.childElementCount + 1);
    // divProcess.appendChild(tagId);

    //The div of the increase block
    var divIncress = document.createElement("div");
    var id = "process-" + (processList.childElementCount+1);
    divIncress.setAttribute("id", id);
    divIncress.setAttribute("class", "increase");
    divProcess.appendChild(divIncress);

    //The span with the number of incress
    var spanIncress = document.createElement("span");
    var id = "spanNumber-" + (processList.childElementCount+1);
    spanIncress.setAttribute("id", id);
    spanIncress.setAttribute("class", "blink");
    var aumento = getAumentoAleatorio();
    spanIncress.innerHTML = "#" + (processList.childElementCount + 1) + " " + "+" + aumento;
    divIncress.appendChild(spanIncress);

    //Div of times
    var divTimes = document.createElement("div");
    var id = "times-" + (processList.childElementCount+1);
    divTimes.setAttribute("id", id);
    divTimes.setAttribute("class", "times");
    divProcess.appendChild(divTimes);

    //Table of the timesTable
    var tableTimes = document.createElement("table");
    var id = "tableTimes-" + (processList.childElementCount+1);
    tableTimes.setAttribute("id", id);
    tableTimes.setAttribute("class", "timesTable");
    divTimes.appendChild(tableTimes);

    //Add the tr and td of the table
    for(var i=0;i<7;i++){
        //add the tr
        var tr = document.createElement("tr");
        var id = "tr-" + (processList.childElementCount+1)+"-"+i;
        tr.setAttribute("id", id);
        tableTimes.appendChild(tr);
        //add the td
        var td = document.createElement("td");
        var id = "td-" + (processList.childElementCount+1)+"-"+i;
        td.setAttribute("id", id);
        td.innerHTML = "-";
        tr.appendChild(td);
    }

    //The div of the check
    var divCheck = document.createElement("div");
    var id = "divCheck-" + (processList.childElementCount+1);
    divCheck.setAttribute("id", id);
    divCheck.setAttribute("class", "check");
    divProcess.appendChild(divCheck);

    //the check
    var check = document.createElement("input");
    var id = "divCheck-" + (processList.childElementCount+1);
    check.setAttribute("id", id);
    check.setAttribute("type","checkbox");
    check.setAttribute("onchange", "return checkClicked('"+idProceso+"');");
    divCheck.appendChild(check);

    processList.appendChild(divProcess);

    // generamos el hilo
    Concurrent.Thread.create(iniciarProceso, idProceso);
}

function getAumentoAleatorio() {
    return Math.floor((Math.random() * 10) + 1);
}

function enviarMensaje() {
    // aumentamos el contador del mensaje
    contadorMensajes++;
    var procesoEmisor = document.getElementById(procesosSeleccionados[0]);
    var procesoReceptor = document.getElementById(procesosSeleccionados[1]);
    var mensaje = document.getElementById("txtMensaje").value;
    var tiempoEmision = getContador(procesosSeleccionados[0]);
    var tiempoRecepcion = getContador(procesosSeleccionados[1]);
    var fueAjustado = ajustar(tiempoEmision, tiempoRecepcion, procesosSeleccionados[1]);
    var log = document.getElementById("logging");
    var idEmisor = procesosSeleccionados[0].split("-")[1];
    var idReceptor = procesosSeleccionados[1].split("-")[1];
    // Concatenamos en el textArea el evento ocurrido
    log.innerHTML += "\n\n+P"+idEmisor+" le dice a P"+idReceptor+": "+mensaje;
    log.innerHTML += "\nM"+contadorMensajes+"("+tiempoEmision+" < "+tiempoRecepcion+")";
    if(fueAjustado) {
        tiempoRecepcion = tiempoEmision + 1;
        log.innerHTML += " -> M"+contadorMensajes+"("+tiempoEmision+" < "+tiempoRecepcion+")\n";
    }
    // hacemos el autoscroll
    document.getElementById("logging").scrollTop = document.getElementById("logging").scrollHeight;
    // quitamos el texto del mensaje
    document.getElementById("txtMensaje").value = "";
    deseleccionarProcesos();
}

function checkClicked(id) {
    var divCheck = document.getElementById(id).children[2];
    var check = divCheck.children[0];
    // Se marca un checkbox
    if(check.checked) {
        if(procesosSeleccionados.length == 0) {
            var p = document.createElement("p");
            p.innerHTML = "Origen";
            p.classList.add("label-envio");
            divCheck.appendChild(p);
            procesosSeleccionados.push(id);
        }
        else if(procesosSeleccionados.length == 1) {
            var p = document.createElement("p");
            p.innerHTML = "Destino";
            p.classList.add("label-envio");
            divCheck.appendChild(p);
            procesosSeleccionados.push(id);
            // debe aparecer el botón para enviar el mensaje
            var divEnviar = document.getElementById("envio-mensaje");
            divEnviar.classList.remove("invisible");
            divEnviar.classList.add("visible");
        }
        // ya ha seleccionado 2, entonces se deselecciona todo
        else {
            check.checked = false;
            //document.getElementById(id).children[2].children[0].checked = false;
            deseleccionarProcesos();
        }
    }
    else {
        if(procesosSeleccionados.length == 1) {
            // Borramos la etiqueta del origen
            var padre = document.getElementById(procesosSeleccionados[0]).children[2];
            var hijo = padre.children[1];
            padre.removeChild(hijo);
            // removemos del arreglo el proceso
            procesosSeleccionados.pop();
        }
        // había dos seleccionados en el arreglo
        else {
            // Borramos la etiqueta del destino
            var padre = document.getElementById(procesosSeleccionados[1]).children[2];
            var hijo = padre.children[1];
            padre.removeChild(hijo);
            // removemos del arreglo el proceso
            procesosSeleccionados.pop();
            // Ocultar el botón de enviar mensaje
            var divEnviar = document.getElementById("envio-mensaje");
            divEnviar.classList.remove("visible");
            divEnviar.classList.add("invisible");
        }
    }
}

function deseleccionarProcesos() {
    document.getElementById(procesosSeleccionados[0]).children[2].children[0].checked = false;
    document.getElementById(procesosSeleccionados[1]).children[2].children[0].checked = false;
    // Borramos todas las etiquetas
        // Del origen
    var padre = document.getElementById(procesosSeleccionados[0]).children[2];
    var hijo = padre.children[1];
    padre.removeChild(hijo);
        // Del destino
    padre = document.getElementById(procesosSeleccionados[1]).children[2];
    hijo = padre.children[1];
    padre.removeChild(hijo);

    // Se limpia el arreglo
    procesosSeleccionados = [];
    // Debe desaparecer el botón de enviar mensaje
    var divEnviar = document.getElementById("envio-mensaje");
    divEnviar.classList.remove("visible");
    divEnviar.classList.add("invisible");
}
