#include <iostream>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <vector>

using namespace std;
void menu(int);

struct Proceso {
    string nombreProceso;
    int rafagasCPU;
    Proceso *pid;
};

struct ProcesoFinal { //está implícito su PID, sería la dirección de memoria
    string nombre;
    Proceso *PID;
    vector <int> tiemposComienzo;
    vector <int> tiemposFinalizacion;
    int tiempoLlegada;
    int tiempoEjecucion;
    int tiempoEspera;
    int tiempoRetorno;
};

class RoundRobin {
    private:
        vector <Proceso> P;
        vector <ProcesoFinal> pF;
        int tiempoCPU;
        int q; //quantum
    public:
        RoundRobin(int); //el arg, es el val del quantum
        void cargarProcesos(int);
        void nuevosProcesos();
        void setQuantum(int);
        int getQuantum();
        void planificar();
        void insercion(Proceso *, int, int, bool);
        void mostrarResultado();
        void mostrarVector(vector <int>);
        ~RoundRobin();
};

RoundRobin::RoundRobin(int q) {
    this->q = q;
    tiempoCPU = 0;
}

void RoundRobin::cargarProcesos(int np) {
    Proceso p;
    ProcesoFinal pf;
    string nombre;
    int rafaga;

    for(int i = 0; i < np; i++) {
        cout << "\nNombre del proceso: ";
        cin >> nombre;
        cout << "Rafagas de CPU: ";
        cin >> rafaga;
        // Lo agregamos a la estructura
        p.nombreProceso = nombre;
        p.rafagasCPU = rafaga;
        pf.nombre = nombre;
        pf.tiempoEjecucion = rafaga;
        pf.tiempoLlegada = i;
        P.push_back(p);
        pf.PID = &P[i]; //guardo la dirección de memoria, en este caso representa el PID
        P[i].pid = pf.PID;
        pF.push_back(pf);
        cout << endl;
    }
}

void RoundRobin::nuevosProcesos() {
    if(!P.empty()) P.clear();
    if(!pF.empty()) pF.clear();
    tiempoCPU = 0;
}

void RoundRobin::setQuantum(int q) {
    this->q = q;
}
int RoundRobin::getQuantum() {
    return this->q;
}

void RoundRobin::planificar() {
    int n = P.size();
    while(n > 0) { //miestras haya procesos sin completar
        for(int i = 0; i < P.size(); i++) {
            if(P[i].rafagasCPU - q > 0) {
                P[i].rafagasCPU -= q;
                tiempoCPU += q;
                insercion(P[i].pid, tiempoCPU, 0, true);
            }
            else { //menor o igual a cero
                tiempoCPU += P[i].rafagasCPU;
                insercion(P[i].pid, tiempoCPU, P[i].rafagasCPU, false);
                P.erase(P.begin()+i);
                n--;
                i--;
            }
        }
    }
}

void RoundRobin::insercion(Proceso *pid, int tiempoCPU, int rafaga, bool opt) {
    unsigned int index;
    for(unsigned int i = 0; i < pF.size(); i++) {
        if(pid == pF[i].PID) {
            index = i;
            break;
        }
    }
    pF[index].tiemposFinalizacion.push_back(tiempoCPU);

    if(opt) {
        pF[index].tiemposComienzo.push_back(tiempoCPU - q);
    }
    else {
        pF[index].tiempoRetorno = tiempoCPU - pF[index].tiempoLlegada;
        pF[index].tiempoEspera = pF[index].tiempoRetorno - pF[index].tiempoEjecucion;
        pF[index].tiemposComienzo.push_back(tiempoCPU - rafaga);
    }
}

void RoundRobin::mostrarResultado() {
    for(unsigned int i = 0; i < pF.size(); i++) {
        cout << "Proceso: " << pF[i].nombre << endl;
        cout << "PID: " << pF[i].PID << endl;
        cout << "Tiempo de ejecución: " << pF[i].tiempoEjecucion << endl;
        cout << "Tiempo llegada: " << pF[i].tiempoLlegada << endl;
        cout << "Tiempo de comienzo: ";
        mostrarVector(pF[i].tiemposComienzo);
        cout << "Tiempo de finalización: ";
        mostrarVector(pF[i].tiemposFinalizacion);
        cout << "Tiempo de retorno: " << pF[i].tiempoRetorno << endl;
        cout << "Tiempo de Espera: " << pF[i].tiempoEspera << endl;
        cout << "--------------------------------" << endl;
    }
}

void RoundRobin::mostrarVector(vector <int> v) {
    for(int i = 0; i < v.size(); i++) {
        if(i == v.size() - 1) cout << v[i];
        else cout << v[i] << ", ";
    }
    cout << endl;
}

RoundRobin::~RoundRobin() {
    if(!P.empty()) P.clear();
    if(!pF.empty()) pF.clear();
}

int main(int argc, char const *argv[]) {
    int quantum = 3, np, opc;
    bool opt = true;
    RoundRobin r(quantum);
    do {
        system("clear");
        menu(quantum);
        cin >> opc;

        switch(opc) {
            case 1:
                cout << "\nEscriba un nuevo valor para el quantum: ";
                cin >> quantum;
                r.setQuantum(quantum);
                quantum = r.getQuantum();
                break;
            case 2: //Agregar n enteros
                r.nuevosProcesos();
                cout << "¿Cuántos procesos desea cargar? ";
                cin >> np;
                r.cargarProcesos(np);
                break;
            case 3:
                if(np == 0) cout << "No hay procesos cargados." << endl;
                else {
                    cout << endl;
                    r.planificar();
                    r.mostrarResultado();
                }
                break;
            case 4:
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

void menu(int q) {
    cout << "\tElija una acción" << endl;
    cout << "-- Quantum vale: " << q << endl;
    cout << "1. Cambiar valor del quantum." << endl;
    cout << "2. Cargar procesos (los anteriores se pierden)" << endl;
    cout << "3. Planificar" << endl;
    cout << "4. Salir" << endl;
    cout << "---> ";
}
