// Constructor
var Proceso = function() {
    console.log("Se ha instanciado un proceso");
    this.contador = 0;
    this.aumento = 2;
};

// Arrancar proceso
Proceso.prototype.iniciar = function() {
    Concurrent.Thread.create(this.correr);
};

Proceso.prototype.correr = function() {
    setInterval(this.actualizarProceso, 1000);
};

Proceso.prototype.actualizarProceso = function() {
    console.log(this.contador);
    this.contador += this.aumento;
};
