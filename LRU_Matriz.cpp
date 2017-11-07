#include <iostream>
#include <cstdlib>
#include <vector>
#include <string>
#include <cmath>

void menu();

using namespace std;

class Algo {
    private:
        vector <int> referencias;
        unsigned int marcosPagina;
        unsigned int numFallosPagina;
        vector <int> procesos;
        //vector < vector <int> > matriz;
        int **matriz;
    public:
        Algo(int);
        void setReferencias(vector <int>);
        void setMarcosPagina(int);
        vector <int> getReferencias();
        int getMarcosPagina();
        unsigned int getNumFallosPagina();
        void asignar();
        void barrerMatriz(int);
        void mostrarMomento();
        bool estaEnCPU(int);
        unsigned int dondeEsta(int);
        unsigned int getMenor();
        unsigned int convierteBinario(string);
        ~Algo();
};

Algo::Algo(int marcosPagina) {
    numFallosPagina = 0;
    this->marcosPagina = marcosPagina;

    matriz = (int **)malloc(marcosPagina * sizeof(int *));
    for(int i = 0 ; i < marcosPagina; i++)
        matriz[i] = (int *)malloc(marcosPagina * sizeof(int));

    if(matriz == NULL) {
        cout << "\nEvento inesperado: Error al intentar asignar memoria\n" << endl;
        exit(1);
    }

    else { //Se inicializa con ceros la matriz
        int cont = 0;
        for(int i = 0; i < marcosPagina; i++) {
            for(int j = 0; j < marcosPagina; j++) {
                matriz[i][j] = 0;
            }
        }
    }
}

void Algo::setReferencias(vector <int> referencias) {
    this->referencias = referencias;
}

void Algo::setMarcosPagina(int marcosPagina) {
    this->marcosPagina = marcosPagina;
}

vector <int> Algo::getReferencias() {
    return referencias;
}

int Algo::getMarcosPagina() {
    return marcosPagina;
}

unsigned int Algo::getNumFallosPagina() {
    return numFallosPagina;
}

void Algo::asignar() {
    unsigned int n = referencias.size();
    int aux = 0;
    for(unsigned int i = 0; i < n; i++) {
        if(procesos.size() < marcosPagina) { //ocurren los primeros fallos de página
            procesos.push_back(referencias.front());
            barrerMatriz(procesos.size() - 1);
            mostrarMomento();
            cout << endl;
            referencias.erase(referencias.begin());
            numFallosPagina++;
        }
        else {
            if(estaEnCPU(referencias.front())) { //no hay fallos de página
                barrerMatriz(dondeEsta(referencias.front()));
                mostrarMomento();
                cout << endl;
                referencias.erase(referencias.begin());
            }
            else { //no está en CPU y ya están ocupados todos los marcos de página, fallos de página
                aux = getMenor(); //obtengo el índice de la fila que suma el menor número en bianrio o bien el primero
                barrerMatriz(aux);
                procesos[aux] = referencias.front();
                mostrarMomento();
                cout << endl;
                referencias.erase(referencias.begin());
                numFallosPagina++;
            }
        }
    }
}

unsigned int  Algo::getMenor() {
    int bin = 0, aux = 0, pos = 0;
    string binario;

    for(unsigned int i = 0; i < marcosPagina; i++) {
        binario = "";
        for(unsigned int j = 0; j < marcosPagina; j++) {
            binario += (char)(matriz[i][j] + 48);
        }
        //cout << "La cadena binario es: " << binario << endl;
        aux = convierteBinario(binario);
        if(i == 0) bin = aux;
        //cout << "Aux vale: " << aux << endl << "Bin vale: " << bin << endl;
        if(aux < bin) {
            //cout << "Es menor" << endl;
            bin = aux;
            pos = i;
        }
    }
    return pos;
}

unsigned int Algo::convierteBinario(string binario) {
    int num = 0;
    for(unsigned int i = 0; i < marcosPagina; i++) {
        if(binario[i] == '1') {
            num += pow(2, marcosPagina - 1 - i);
        }
    }
    //cout << "\nNúmero: " << num << endl;
    return num;
}

void Algo::barrerMatriz(int index) {
    //barrido columnas, con unos
    for(unsigned int j = 0; j < marcosPagina; j++) {
        matriz[index][j] = 1;
    }
    //barrido filas, con ceros
    for(unsigned int i = 0; i < marcosPagina; i++) {
        matriz[i][index] = 0;
    }
}

void Algo::mostrarMomento() {
    //Mostrando vector
    cout << "\t[";
    for (unsigned int i = 0; i < procesos.size(); i++) {
        if(i+1 < procesos.size()) cout << procesos[i] << ", ";
        else cout << procesos[i] << "]" << endl;
    }
    //Mostrando matriz momento
    for (unsigned int i = 0; i < marcosPagina; i++) {
        cout << "\t";
        for (unsigned int j = 0; j < marcosPagina; j++) {
            cout << matriz[i][j] << " ";
        }
        cout << endl;
    }
}

bool Algo::estaEnCPU(int p) {
    bool respuesta = false;
    for(int i = 0; i < procesos.size(); i++) {
        if(procesos[i] == p) {
            respuesta = true;
            break;
        }
    }
    return respuesta;
}

unsigned int Algo::dondeEsta(int p) {
    unsigned int index;
    for(unsigned int i = 0; i < procesos.size(); i++) {
        if(procesos[i] == p) {
            index = i;
            break;
        }
    }
    return index;
}

Algo::~Algo() {
    if(matriz != NULL) free(matriz);
    if(!procesos.empty()) procesos.clear();
    if(!referencias.empty()) referencias.clear();
}

int main(int argc, char const *argv[]) {
    int opc, marcosPagina = 0, numRef = 0, aux = 0;
    vector <int> v;
    bool opt = true;

    do {
        system("clear");
        menu();
        cin >> opc;

        switch(opc) {
            case 1:
            {
                cout << "Escriba el número de marcos de página: ";
                cin >> marcosPagina;
                Algo a1(marcosPagina);
                cout << "Escriba el número de referencias: ";
                cin >> numRef;
                cout << "Escriba las referencias separadas por un espacio: ";
                for(unsigned int i = 0; i < numRef; i++) {
                    cin >> aux;
                    v.push_back(aux);
                }
                a1.setReferencias(v);
                a1.asignar();
                cout << "\nFallos de página: " << a1.getNumFallosPagina() << endl;
            }
                break;
            case 2:
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
    cout << "\tElija una acción." << endl;
    cout << "1. Nueva asignación." << endl;
    cout << "2. Salir" << endl;
    cout << "---> ";
}
