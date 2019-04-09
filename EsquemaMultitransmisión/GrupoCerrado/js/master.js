function agregarGrupo(){
    var listaGrupos = document.getElementById("grupos");
    //Div del grupo
    var divGrupo = document.createElement("div");
    var idGrupo = "grupo-" + (listaGrupos.childElementCount+1);
    divGrupo.setAttribute("id", idGrupo);
    divGrupo.setAttribute("class", "grupo");
    //Div de la figura
    var divFigura = document.createElement("div");
    var id = "grupoFigura-" + (listaGrupos.childElementCount+1);
    divFigura.setAttribute("id", id);
    divFigura.setAttribute("class", "figura");
    divGrupo.appendChild(divFigura);
    //Boton para añadir miembros
    //Se añade el texto
    var textAgregar = document.createElement("p");
    var id = "txt-" + (listaGrupos.childElementCount+1);
    textAgregar.setAttribute("id", id);
    textAgregar.innerHTML = "Añadir miembro";
    divGrupo.appendChild(textAgregar);
    //Se añade el boton
    var boton = document.createElement("BUTTON");
    var id = "boton-" + (listaGrupos.childElementCount+1);
    boton.setAttribute("id", id);
    boton.setAttribute("onclick", "agregarMiembro(this);");
    divGrupo.appendChild(boton);
    //Se añade la imagene del boton
    var imagen = document.createElement("IMG");
    var id = "imagen-" + (listaGrupos.childElementCount+1);
    imagen.setAttribute("id", id);
    imagen.setAttribute("src", "img/añadirA.png");
    boton.appendChild(imagen);
    //Se añade todo
    listaGrupos.appendChild(divGrupo);
}

function agregarMiembro(idGrupo){
    var id = idGrupo.id;
    id = id.split("-");
    var idG = id[1];
    id = "grupoFigura-"+idG;
    var grupo = document.getElementById(id);
    var radio = grupo.clientWidth;
    var numMiembros = grupo.childElementCount;
    if(numMiembros<4){
        var pos = " ";
        if(numMiembros==0){
            pos = "top:100px; left: -100px;"
        }else if(numMiembros==1){
            pos = "top:100px; left: 100px;"
        }
        else if(numMiembros==2){
            pos = "top:200px; left: -100px;"
        }
        else if(numMiembros==3){
            pos = "top:200px; left: 100px;"
        }
        //Div de pacman
        var miembro = document.createElement("div");
        var idm = "miembro-"+idG+"-"+ (grupo.childElementCount+1);
        miembro.setAttribute("id",idm);
        miembro.setAttribute("class", "miembro");
        miembro.setAttribute("style", "position: relative; "+pos);
        //miembro.setAttribute("onclick","myFunction(this,'Ya no tengo sueño')");
        var eliminar = document.createElement("div");
        var idm = "btnEliminar-"+idG+"-"+ (grupo.childElementCount+1);
        eliminar.setAttribute("id",idm);
        eliminar.setAttribute("onclick", "eliminar(this);");
        miembro.appendChild(eliminar);
        //Imagen
        var imgEliminar = document.createElement("IMG");
        var idm = "imgEliminar-" + (grupo.childElementCount+1);
        imgEliminar.setAttribute("id", idm);
        imgEliminar.setAttribute("src", "img/x-button.png");
        imgEliminar.setAttribute("class", "pacman");
        eliminar.appendChild(imgEliminar);
        //Pacman
        var imagen = document.createElement("IMG");
        var idm = "imagenPac-" + (grupo.childElementCount+1);
        imagen.setAttribute("id", idm);
        imagen.setAttribute("src", "img/pacman.png");
        imagen.setAttribute("class", "pacman");
        imagen.setAttribute("title", "Enviar mensaje");
        imagen.setAttribute("onclick", "abrirModal(this);");
        miembro.appendChild(imagen);

        //Se añade el popup
       	var divPopup = document.createElement("div");
       	var idp = "divPopup-"+idG+"-"+ (grupo.childElementCount+1);
       	divPopup.setAttribute("id",idp);
       	divPopup.setAttribute("class","popup");
        miembro.appendChild(divPopup);

        var popup = document.createElement("span");
        var idp = "popup-"+idG+"-"+ (grupo.childElementCount+1);
        popup.setAttribute("id",idp);
        popup.setAttribute("class","popuptext");
        popup.innerHTML = "Tengo sueño"; //En esta parte de aquí se puede editar el mensaje
        popup.setAttribute("onclick","myFunction(this)");
        divPopup.appendChild(popup);
        grupo.appendChild(miembro);
    }
}

function myFunction(popup) {
    popup.classList.toggle("show");
}
function eliminar(idThis){
    var divVisAbuelo = idThis.parentElement.parentElement;
    var divAbuelo = idThis.parentElement;
    divVisAbuelo.removeChild(divAbuelo);
}
