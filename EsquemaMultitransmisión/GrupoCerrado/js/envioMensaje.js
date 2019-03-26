// ### Setup modal ###
// Reference to modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var checkbox = document.getElementById("envioIndividual");

checkbox.addEventListener('change', (event) => {
    if (event.target.checked) { // elige que será envío individual
        document.getElementById("destinatarios").disabled = false;
    }
    else {
        document.getElementById("destinatarios").disabled = true;
    }
});

// ### Implementation ###
function enviarMensaje() {
    // Recuperar el cuerpo del mensaje
    var mensaje = document.getElementById("mensaje").value;
    // Primero a determinar si se trata de un envío al grupo o individual
    // Individual
    if(checkbox.checked) {
        // Recuperamos el id del receptor
        var idReceptor = document.getElementById("destinatarios").value;
        // Lo referenciamos
        var receptor = document.getElementById(idReceptor);
        var id = receptor.id.split("-");
        var popup = document.getElementById("popup-"+id[1]+"-"+id[2]);
        popup.innerHTML = mensaje;
        popup.classList.toggle("show");
    }
    // Grupal
    else {
        var idEmisor = document.getElementById("btnEnviarMensaje").getAttribute("data");
        var idGrupo = idEmisor.split("-")[1];
        //var participantes = document.getElementById("grupoFigura-" + idGrupo);
        var participantes = document.getElementById("grupoFigura-" + idGrupo).childNodes;
        for (var i = 0; i < participantes.length; i++) {
            if(participantes[i].id == idEmisor) continue;
            var id = participantes[i].id.split("-");
            var popup = document.getElementById("popup-"+id[1]+"-"+id[2]);
            popup.innerHTML = mensaje;
            popup.classList.toggle("show");
        }
    }

    // Al final hay que cerrar el modal
    modal.style.display = "none";
}

function abrirModal(imgMiembro) {
    var divPadre = imgMiembro.parentElement;
    var idPadre = divPadre.id;
    var idGrupo = idPadre.split("-")[1];
    var idMiembro = idPadre.split("-")[2];
    // Ponemos el footer al modal
    document.getElementById("modal-footer-info").innerHTML = "Soy del grupo #" + idGrupo + " y soy el miembro " + idMiembro;
    // Cargamos los miembros individuales, excepto el del div padre
    cargarMiembrosIndividuales(idPadre);
    // Al botón de envío le seteamos el atributo de data
    document.getElementById("btnEnviarMensaje").setAttribute("data", idPadre);
    // Mostramos el modal
    modal.style.display = "block";
}

function cargarMiembrosIndividuales(idPadre) {
    // Referenciamos el select de destinatarios
    var destinatarios = document.getElementById("destinatarios");
    // removemos las opciones actuales
    for (i = destinatarios.length - 1; i >= 0; i--) destinatarios.remove(i);
    // Referenciamos los miembros
    var miembros = document.getElementsByClassName("miembro");
    if(miembros.length == 1) {
        var option = document.createElement("option");
        option.setAttribute("value", "none");
        option.innerHTML = "none";
        destinatarios.appendChild(option);
    }
    else {
        for (var i = 0; i < miembros.length; i++) {
            if(miembros[i].id === idPadre) continue;
            var option = document.createElement("option");
            option.setAttribute("value", miembros[i].id);
            option.innerHTML = "G " + miembros[i].id.split("-")[1] + " miembro " + miembros[i].id.split("-")[2];
            destinatarios.appendChild(option);
        }
    }
}
