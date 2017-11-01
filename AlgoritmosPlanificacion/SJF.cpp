#include <iostream>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;
void menu();

struct Proceso {
    string nombreProceso;
    int rafagasCPU;
    int tiempoLlegada;
    Proceso *pid;
};

struct ProcesoFinal { //está implícito su PID, sería la dirección de memoria
    string nombre;
    Proceso *PID;
    int tiempoComienzo;
    int tiempoFinalizacion;
    int tiempoLlegada;
    int tiempoEjecucion;
    int tiempoEspera;
    int tiempoRetorno;
};

class SJF {
    private:
        vector <Proceso> P;
        vector <ProcesoFinal> pF;
        int tiempoCPU;
    public:
        SJF();
        void cargarProcesos(int);
        void nuevosProcesos();
        bool static compareTiempoEjecucion(const Proceso &, const Proceso &);
        void planificar();
        void insercion(Proceso *, int);
        void mostrarResultado();
        ~SJF();
};

SJF::SJF() {
    tiempoCPU = 0;
}

void SJF::cargarProcesos(int np) {
    Proceso p;
    ProcesoFinal pf;
    string nombre;
    int rafaga;
    int tiempoLlegada;

    for(int i = 0; i < np; i++) {
        cout << "\nNombre del proceso: ";
        cin >> nombre;
        cout << "Rafagas de CPU: ";
        cin >> rafaga;
        // Lo agregamos a la estructura
        p.nombreProceso = nombre;
        p.rafagasCPU = rafaga;
        cout << "Tiempo de llegada: ";
        cin >> tiempoLlegada;
        p.tiempoLlegada = tiempoLlegada;
        pf.nombre = nombre;
        pf.tiempoEjecucion = rafaga;
        pf.tiempoLlegada = tiempoLlegada;
        P.push_back(p);
        pf.PID = &P[i]; //guardo la dirección de memoria, en este caso representa el PID
        P[i].pid = pf.PID;
        pF.push_back(pf);
        cout << endl;
    }
}

void SJF::nuevosProcesos() {
    if(!P.empty()) P.clear();
    if(!pF.empty()) pF.clear();
    tiempoCPU = 0;
}

bool SJF::compareTiempoEjecucion(const Proceso &a, const Proceso &b) {
    return a.rafagasCPU < b.rafagasCPU;
}

void SJF::planificar() {
    int n = P.size();
    sort(P.begin(), P.end(), compareTiempoEjecucion); //se ordenan por tiempo de ejecución
    while(n > 0) {
        for(int i = 0; i < P.size(); i++) {
            if(P[i].tiempoLlegada <= tiempoCPU) {
                insercion(P[i].pid, tiempoCPU);
                tiempoCPU += P[i].rafagasCPU;
                n--;
                //cout << "Soy el proceso: " << P[i].nombreProceso << endl;
                P.erase(P.begin()+i);
                break;
            }
        }
    }
}

void SJF::insercion(Proceso *pid, int tiempoCPU) {
    unsigned int index;
    for(unsigned int i = 0; i < pF.size(); i++) {
        if(pid == pF[i].PID) {
            index = i;
            break;
        }
    }
    pF[index].tiempoComienzo = tiempoCPU;
    pF[index].tiempoFinalizacion = pF[index].tiempoComienzo + pF[index].tiempoEjecucion;
    pF[index].tiempoRetorno = pF[index].tiempoFinalizacion - pF[index].tiempoLlegada;
    pF[index].tiempoEspera = pF[index].tiempoRetorno - pF[index].tiempoEjecucion;
}

void SJF::mostrarResultado() {
    for(unsigned int i = 0; i < pF.size(); i++) {
        cout << "\tProceso: " << pF[i].nombre << endl;
        cout << "\tPID: " << pF[i].PID << endl;
        cout << "\tTiempo de ejecución: " << pF[i].tiempoEjecucion << endl;
        cout << "\tTiempo llegada: " << pF[i].tiempoLlegada << endl;
        cout << "\tTiempo de comienzo: " << pF[i].tiempoComienzo << endl;
        cout << "\tTiempo de finalización: " << pF[i].tiempoFinalizacion << endl;
        cout << "\tTiempo de retorno: " << pF[i].tiempoRetorno << endl;
        cout << "\tTiempo de Espera: " << pF[i].tiempoEspera << endl;
        cout << "--------------------------------" << endl;
    }
}

SJF::~SJF() {
    if(!P.empty()) P.clear();
    if(!pF.empty()) pF.clear();
}

int main(int argc, char const *argv[]) {
    int np, opc;
    bool opt = true;
    SJF x;
    do {
        system("clear");
        menu();
        cin >> opc;

        switch(opc) {
            case 1: //Agregar n enteros
                x.nuevosProcesos();
                cout << "¿Cuántos procesos desea cargar? ";
                cin >> np;
                x.cargarProcesos(np);
                break;
            case 2:
                if(np == 0) cout << "No hay procesos cargados." << endl;
                else {
                    cout << endl;
                    x.planificar();
                    x.mostrarResultado();
                }
                break;
            case 3:
                opt = false;
                break;
            default:
                cout << "Opción no válida" << endl;
                break;
        }
        cout << "Presione una tecla para continuar...";
        cin.ignore().get();
    } while(opt);

    return 0;
}

void menu() {
    cout << "\tElija una acción" << endl;
    cout << "1. Cargar procesos (los anteriores se pierden)" << endl;
    cout << "2. Planificar" << endl;
    cout << "3. Salir" << endl;
    cout << "---> ";
}
