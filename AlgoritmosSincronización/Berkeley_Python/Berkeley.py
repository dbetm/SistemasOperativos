from tkinter import *
import datetime
from threading import *
import time
import numpy as np
from math import floor

root = Tk()
root.title("Berkeley")
root.resizable(False,True)
root.geometry("860x600")
root.config(bg="#E1ADA2")

op = None
listEsclavos = []
listEsclavosTime = []
global tiemposEsclavos
tiemposEsclavos = list(np.random.randint(-5000,5000,size=5))
global timpoMaestro
timpoMaestro = 0
def getHours(tRet):
    time = datetime.datetime.now()
    hour = time.hour
    minute = time.minute
    second = time.second

    tSegundos = ((3600*hour) + (60*minute) + second) + tRet

    hour = floor((tSegundos / 3600))
    #minute = int(((tSegundos-hour*3600)/60))
    minute = floor(((tSegundos%3600)/60))
    #second = int(tSegundos-(hour*3600+minute*60))
    second = floor(tSegundos%60)

    minute = str(minute) if (minute >= 10) else "0"+str(minute)
    hour = str(hour) if (hour >= 10) else "0"+str(hour)
    second = str(second) if (second >= 10) else "0"+str(second)
    actualTime = str(hour)+":"+str(minute)+":"+str(second)
    return actualTime
master = Frame()
master.pack(fill="y",pady=10)
master.config(bg="#9D918F",width="100",height="10",relief=GROOVE,bd = 10)

masterH = Label(master,text=getHours(timpoMaestro ),font=("DS-Digital",25),bg="#9D918F",padx="10")
masterH.pack()
masterDif = Label(master,text=str(timpoMaestro),font=("DS-Digital",10),bg="#9D918F")
masterDif.pack()

botones = Frame()
botones.pack(fill="y",pady=10)
botones.config(bg="#9D918F",width="100",height="10",relief=GROOVE,bd = 10)

def iniciar():
    #Calcular promedio
    op.delete('1.0',END)
    global tiemposEsclavos
    global timpoMaestro
    op.insert(END,"Se calculan las diferencias en segundos"+"\n \n")
    for x in range(len(tiemposEsclavos)):
        op.insert(END,masterH['text']+" - "+listEsclavos[x]['text']+" = "+str(tiemposEsclavos[x])+"s\n")
    #operacion = ""

    #op.insert(END,str(tiemposEsclavos[x])+"+")
    #while(True):
    suma = 0
    cout=0
    operacion = ""
    aux = tiemposEsclavos.copy()
    aux.append(0)
    aux = np.array(aux)
    ds = np.std(aux)
    #print(ds)
    for x in range(len(tiemposEsclavos)):
        #tiemposEsclavos[x] >min(aux) -ds and
        if ( tiemposEsclavos[x] <= timpoMaestro+int(ds)):
            suma+=tiemposEsclavos[x]
            cout+=1
            if(tiemposEsclavos[x] >= 0):
                if(cout != 1):
                    operacion+="+"+str(tiemposEsclavos[x])
                else:
                    operacion+=str(tiemposEsclavos[x])
            else:
                operacion+=str(tiemposEsclavos[x])
    prom = floor((suma+timpoMaestro)/(cout+1))
    op.insert(END,"\nSe calcula el promedio de las diferencias eliminando las exgaeraciones std = "+str(int(ds))+"s\n \n")
    op.insert(END,"("+operacion+"+0)"+"/"+str((cout+1))+" = "+str(prom)+"s\n")
    timpoMaestro = timpoMaestro + (-1*timpoMaestro + prom)
    temp = tiemposEsclavos.copy()
    for x in range(len(tiemposEsclavos)):
        tiemposEsclavos[x] =tiemposEsclavos[x] + (-1*tiemposEsclavos[x] + prom)
    op.insert(END,"\nSe calcula las correciones para cada relog"+"\n \n")
    for x in range(len(tiemposEsclavos)):
        op.insert(END,"(-1*("+str(temp[x])+") + ("+str(prom)+")) = "+str(-1*temp[x] +prom)+"s\n")
        #time.sleep(1)
def startAlgo():
    algo = Thread(target=iniciar)
    algo.start()
def hourEsclavos(num):
    while(True):
        listEsclavos[num]['text'] = getHours(tiemposEsclavos[num])
        listEsclavosTime[num]['text'] = tiemposEsclavos[num]
        time.sleep(1)
def reiniciarValores():
    global tiemposEsclavos
    global timpoMaestro
    tiemposEsclavos = list(np.random.randint(-400,400,size=5))
    timpoMaestro = 0
    op.delete('1.0',END)
    op.insert(END,"Algoritmo de sincronizacion de relogs\nBerkeley implementado en Python 3.6.7 \n\nEquipo conformado por:\nDavid Betancourt Montellano\nOnder Francisco Campos Garcia\nCarlos Escobar Gonzales")
reiniciar = Button(botones,text="Reiniciar",font=("DS-Digital",15),command=reiniciarValores)
reiniciar.pack(side=LEFT)
Iniciar = Button(botones,text="Iniciar",font=("DS-Digital",15),command=startAlgo)
Iniciar.pack(side=LEFT)
relogs = Frame()
relogs.pack()
relogs.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 0)
masterE = Frame(relogs)
masterE.pack(pady=10,side=LEFT,anchor=N)
masterE.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
esclavo1 = Label(masterE,text=getHours(tiemposEsclavos[0]),font=("DS-Digital",25),bg="#9D918F",padx="10")
esclavo1.pack()
listEsclavos.append(esclavo1)
esclavo1Dif = Label(masterE,text=str(tiemposEsclavos[0]),font=("DS-Digital",10),bg="#9D918F")
esclavo1Dif.pack()
listEsclavosTime.append(esclavo1Dif)
tEsclavo1 = Thread(target=hourEsclavos,args=(0,))
tEsclavo1.start()

masterE2 = Frame(relogs)
masterE2.pack(pady=10,side=LEFT,anchor=N)
masterE2.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
esclavo2 = Label(masterE2,text=getHours(tiemposEsclavos[1]),font=("DS-Digital",25),bg="#9D918F",padx="10")
esclavo2.pack()
listEsclavos.append(esclavo2)
esclavo2Dif = Label(masterE2,text=str(tiemposEsclavos[1]),font=("DS-Digital",10),bg="#9D918F")
esclavo2Dif.pack()
listEsclavosTime.append(esclavo2Dif)
tEsclavo2 = Thread(target=hourEsclavos,args=(1,))
tEsclavo2.start()

masterE3 = Frame(relogs)
masterE3.pack(pady=10,side=LEFT,anchor=N)
masterE3.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
esclavo3 = Label(masterE3,text=getHours(tiemposEsclavos[2]),font=("DS-Digital",25),bg="#9D918F",padx="10")
esclavo3.pack()
listEsclavos.append(esclavo3)
esclavo3Dif = Label(masterE3,text=str(tiemposEsclavos[2]),font=("DS-Digital",10),bg="#9D918F")
esclavo3Dif.pack()
listEsclavosTime.append(esclavo3Dif)
tEsclavo3 = Thread(target=hourEsclavos,args=(2,))
tEsclavo3.start()

masterE4 = Frame(relogs)
masterE4.pack(pady=10,side=LEFT,anchor=N)
masterE4.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
esclavo4 = Label(masterE4,text=getHours(tiemposEsclavos[3]),font=("DS-Digital",25),bg="#9D918F",padx="10")
esclavo4.pack()
listEsclavos.append(esclavo4)
esclavo4Dif = Label(masterE4,text=str(tiemposEsclavos[3]),font=("DS-Digital",10),bg="#9D918F")
esclavo4Dif.pack()
listEsclavosTime.append(esclavo4Dif)
tEsclavo4 = Thread(target=hourEsclavos,args=(3,))
tEsclavo4.start()

masterE5 = Frame(relogs)
masterE5.pack(pady=10,side=LEFT,anchor=N)
masterE5.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
esclavo5 = Label(masterE5,text=getHours(tiemposEsclavos[4]),font=("DS-Digital",25),bg="#9D918F",padx="10")
esclavo5.pack()
listEsclavos.append(esclavo5)
esclavo5Dif = Label(masterE5,text=str(tiemposEsclavos[4]),font=("DS-Digital",10),bg="#9D918F")
esclavo5Dif.pack()
listEsclavosTime.append(esclavo5Dif)
tEsclavo5 = Thread(target=hourEsclavos,args=(4,))
tEsclavo5.start()
operacionesF = Frame()
operacionesF.pack(pady=10,side=BOTTOM,anchor=N)
operacionesF.config(bg="#F5512E",width="100",height="10",relief=GROOVE,bd = 10)
op = Text(operacionesF,height=30,width=42,font=("DS-Digital",15));
op.pack()
op.insert(END,"Algoritmo de sincronizacion de relogs\nBerkeley implementado en Python 3.6.7 \n\nEquipo conformado por:\nDavid Betancourt Montellano\nOnder Francisco Campos Garcia\nCarlos Escobar Gonzales")
def hourMaster():
    while(True):
        masterH['text'] = getHours(timpoMaestro)
        masterDif['text'] = str(timpoMaestro)
        time.sleep(1)

tMaster = Thread(target=hourMaster)
tMaster.start()
master.pack()
root.mainloop()
