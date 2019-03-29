var cola = [];

function hacerPeticion(btn) {
    var asignacion = document.getElementById('asignacion-id');
    var padre = btn.parentElement.parentElement;
    var padreID = padre.id;
    if(asignacion.innerHTML == "#") {
        asignacion.innerHTML = padreID;
        alert("Coordinador dice: Ok, a proceso " + padreID);
        // Es necesario volver habilitar el botón de liberar
        var botonLiberar = padre.children[1].children[1];
        botonLiberar.disabled = false;
    }
    else {
        var colaTabla = document.getElementById('cola');
        colaTabla.children[0].children[0].children[cola.length].innerHTML = padreID;
        cola.push(padreID);
    }
    // Deshabilitamos el botón de hacer petición
    btn.disabled = true;
}

function liberar(btn) {
    var asignacion = document.getElementById('asignacion-id');
    asignacion.innerHTML = "#";
    var padre = btn.parentElement.parentElement;
    var padreID = padre.id;
    // Deshabilitamos el botón de liberar
    btn.disabled = true;
    // Habilitamos el de solicitar
    var botonSolicitar = padre.children[1].children[0];
    botonSolicitar.disabled = false;
    if(cola.length == 0) {
        alert("¡Recurso sin peticiones! :)");
    }
    else hacerPeticion(recorrer());
}

function recorrer() {
    var first = cola[0];
    cola.shift(); // quitamos el primer elemento de la cola
    var colaTabla = document.getElementById('cola');
    // Eliminamos el primer elemento
    var trTabla = colaTabla.children[0].children[0];
    var tdTabla = colaTabla.children[0].children[0].children[0];
    trTabla.removeChild(tdTabla);
    // Agregamos un nuevo espacio (nodo) en la cola
    var nuevoTd = document.createElement("td");
    nuevoTd.innerHTML = "NA";
    trTabla.appendChild(nuevoTd);
    var btn = document.getElementById(first).children[1].children[0];
    return btn;
}
