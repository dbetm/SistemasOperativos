class Proceso {
    constructor(id) {
        this.lista = [];
        this.id = id;
        this.estado = "activo";
        this.vista = document.getElementById("p-" + this.id);
    }

    fallar() {
        this.estado = "fallando";
        // Poner clase de 'fallando'
        this.vista.classList.add("fallando");
        // Poner a la vista el botón de recuperar
        this.vista.children[3].disabled = false;
        this.vista.children[3].classList.remove("deshabilitado");
        // Ocultar el botón de fallar
        this.vista.children[4].disabled = true;
        this.vista.children[4].classList.add("deshabilitado");
    }

    recuperar() {
        this.estado = "activo";
        // Remover clase de 'fallando'
        this.vista.classList.remove("fallando");
        // Quitar a la vista el botón de recuperar
        this.vista.children[3].disabled = true;
        this.vista.children[3].classList.add("deshabilitado");
        // Agregar el botón de fallar
        this.vista.children[4].disabled = false;
        this.vista.children[4].classList.remove("deshabilitado");
    }

    getId() {
        return this.id;
    }

    getEstado() {
        return this.estado;
    }

    setLista(lista) {
        this.lista = lista;
    }

    getLista() {
        return this.lista;
    }

    recibirMensaje(msj) {
        if(msj.includes(this.id)) {
            this.mostrarMensaje("¡Ya estoy en la lista!");
            return "fin";
        }
        else this.mostrarMensaje(msj);
    }

    // Muestra un mensaje por un lapso de 6 segundos
    mostrarMensaje(msj) {
        var popup = document.getElementById("popup-" + this.id);
        popup.innerHTML = msj;
        popup.classList.toggle("show");
        setTimeout(function() {
            popup.classList.toggle("show");
        }, 6000);
    }

    soyCoordinador() {
        return this.vista.classList.contains("coordinador");
    }

    quitarRolCoordinador() {
        this.vista.classList.remove("coordinador");
    }

    agregarRolCoordinador() {
        this.vista.classList.add("coordinador");
    }
}
