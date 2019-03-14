function proceso(name) {
    var obj = {};
    obj.name = name;
    obj.contador = 0;
    obj.greeting = function() {
        console.log(this.name);
    };

    obj.actualizarProceso = function() {
        console.log(this.contador);
        this.contador += 2;
    };

    obj.correr = function() {
        console.log("CORRIENDO");

    };

    obj.iniciar = function() {
        console.log("iNICIANDO");
        var my_thread = new MRlib323.Thread(runnable);
    };

    return obj;
}
