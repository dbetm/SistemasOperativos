function iniciarProceso(id) {
    var p = document.getElementById(id);
    var incremento = parseInt(p.children[0].children[0].innerHTML.split(" ")[1]);
    var tiempos = p.children[1];
    // seteamos el contador en 0
    tiempos.children[0].children[tiempos.children[0].childElementCount-1].children[0].innerHTML = 0;
    setInterval(function() {actualizarProceso(id, incremento);}, 1000);
}

function actualizarProceso(id, incremento) {
    var proceso = document.getElementById(id);
    // obtenemos los tiempos
    var tiempos = proceso.children[1];
    // ahora la tabla de tiempos
    var tabla = tiempos.children[0];
    var tamTabla = tabla.childElementCount;

    for (var i = 0; i < tamTabla - 1; i++) { // Get TD
        tabla.children[i].children[0].innerHTML = tabla.children[i+1].children[0].innerHTML;
    }
    // aumentamos el contador
    var contador = tabla.children[tamTabla-1].children[0].innerHTML;
    contador = (parseInt(contador) + incremento);
    tabla.children[tamTabla-1].children[0].innerHTML = contador;
}

function getContador(id) {
    var proceso = document.getElementById(id);
    var tiempos = proceso.children[1];
    // ahora la tabla de tiempos
    var tabla = tiempos.children[0];
    var tamTabla = tabla.childElementCount;
    return parseInt(tabla.children[tamTabla-1].children[0].innerHTML);
}

function ajustar(tiempoEmision, tiempoRecepcion, id) {
    var ans = false;
    if(tiempoEmision > tiempoRecepcion) {
        var ajuste = tiempoEmision + 1;
        ans = true;
        var proceso = document.getElementById(id);
        var tiempos = proceso.children[1];
        // ahora la tabla de tiempos
        var tabla = tiempos.children[0];
        var tamTabla = tabla.childElementCount;
        tabla.children[tamTabla-1].children[0].innerHTML = ajuste;
    }
    return ans;
}
