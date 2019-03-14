function addProcess(){
    var processList = document.getElementById("processList");
    //The div of a process block
    var divProcess = document.createElement("div");
    var id = "processList-" + (processList.childElementCount+1);
    divProcess.setAttribute("id", id);
    divProcess.setAttribute("class", "process");
    //The div of the increase block
    var divIncress = document.createElement("div");
    var id = "process-" + (processList.childElementCount+1);
    divIncress.setAttribute("id", id);
    divIncress.setAttribute("class", "increase");
    divProcess.appendChild(divIncress);
    //The span with the number of incress
    var spanIncress = document.createElement("span");
    var id = "spanNumber-" + (processList.childElementCount+1);
    spanIncress.setAttribute("id", id);
    spanIncress.setAttribute("class", "blink");
    spanIncress.innerHTML = "+1";
    divIncress.appendChild(spanIncress);
    //Div of times
    var divTimes = document.createElement("div");
    var id = "times-" + (processList.childElementCount+1);
    divTimes.setAttribute("id", id);
    divTimes.setAttribute("class", "times");
    divProcess.appendChild(divTimes);
    //Table of the timesTable
    var tableTimes = document.createElement("table");
    var id = "tableTimes-" + (processList.childElementCount+1);
    tableTimes.setAttribute("id", id);
    tableTimes.setAttribute("class", "timesTable");
    divTimes.appendChild(tableTimes);
    //Add the tr and td of the table
    for(var i=0;i<7;i++){
        //add the tr
        var tr = document.createElement("tr");
        var id = "tr-" + (processList.childElementCount+1)+"-"+i;
        tr.setAttribute("id", id);
        tableTimes.appendChild(tr);
        //add the td
        var td = document.createElement("td");
        var id = "td-" + (processList.childElementCount+1)+"-"+i;
        td.setAttribute("id", id);
        td.innerHTML = i+1;
        tr.appendChild(td);
    }
    //The div of the check
    var divCheck = document.createElement("div");
    var id = "divCheck-" + (processList.childElementCount+1);
    divCheck.setAttribute("id", id);
    divCheck.setAttribute("class", "check");
    divProcess.appendChild(divCheck);
    //the check
    var check = document.createElement("input");
    var id = "divCheck-" + (processList.childElementCount+1);
    check.setAttribute("id", id);
    check.setAttribute("type","checkbox");
    divCheck.appendChild(check);

    processList.appendChild(divProcess);
}
