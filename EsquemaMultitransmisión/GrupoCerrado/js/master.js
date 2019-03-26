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
function getAbsoluteElementPosition(element) {
  if (typeof element == "string")
    element = document.getElementById(element)

  if (!element) return { top:0,left:0 };

  var y = 0;
  var x = 0;
  while (element.offsetParent) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }
  return {top:y,left:x};
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
            miembro.setAttribute("onclick","myFunction(this)");
            //Pacman
            var imagen = document.createElement("IMG");
            var idm = "imagenPac-" + (grupo.childElementCount+1);
            imagen.setAttribute("id", idm);
            imagen.setAttribute("src", "img/pacman.png");
            miembro.appendChild(imagen);
            //Se añade el popup

           	var divPopup = document.createElement("div");
           	var idp = "divPopup-"+idG+"-"+ (grupo.childElementCount+1);
           	divPopup.setAttribute("id",idp);
           	divPopup.setAttribute("class","popup");
            divPopup.setAttribute("onclick","myFunction()");
            miembro.appendChild(divPopup);

            var popup = document.createElement("span");
            var idp = "popup-"+idG+"-"+ (grupo.childElementCount+1);
            popup.setAttribute("id",idp);
            popup.setAttribute("class","popuptext");
            popup.innerHTML = "Tengo sueño"; //En esta parte de aquí se puede editar el mensaje
            divPopup.appendChild(popup);
            grupo.appendChild(miembro);
    }

}
function myFunction(idBoton) {
  var id = idBoton.id;
  id = id.split("-");
  var popup = document.getElementById("popup-"+id[1]+"-"+id[2]);
  popup.classList.toggle("show");
}
