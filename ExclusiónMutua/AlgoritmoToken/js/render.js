var p0 = document.getElementById('p-0');
var p1 = document.getElementById('p-1');
connect(p1, p0, "#139c83", 4, '0-1');
p1 = document.getElementById('p-1');
var p2 = document.getElementById('p-2');
connect(p2, p1, "#139c83", 4, '1-2');
p2 = document.getElementById('p-2');
var p3 = document.getElementById('p-3');
connect(p3, p2, "#139c83", 4, '2-3');
p3 = document.getElementById('p-3');
var p4 = document.getElementById('p-4');
connect(p4, p3, "#139c83", 4, '3-4');
p4 = document.getElementById('p-4');
p0 = document.getElementById('p-0');
connect(p0, p4, "#139c83", 4, '4-0');

function connect(a, b, color, thickness, id) {
    var off1 = getOffset(a);
    var off2 = getOffset(b);
    var x1, y1, x2, y2;
    switch (id) {
        // x1 y y1 son las coordenadas del destino
        // x2 y y2 son las coordenadas del origen
        case '0-1':
            // izquierda
            x1 = off1.left;
            // mitad
            y1 = off1.top + (off1.height/2);
            // derecha
            x2 = off2.left + off2.width;
            // mitad
            y2 = off2.top +(off2.height/2);
            break;
        case '1-2':
            // centro
            x1 = off1.left + (off1.width/2);
            // arriba
            y1 = off1.top;
            // derecha
            x2 = off2.left + off2.width;
            // mitad
            y2 = off2.top +(off2.height/2);
            break;
        case '2-3':
            // derecha
            x1 = off1.left + off1.width;
            // mitad
            y1 = off1.top + (off1.height/2);
            // centro
            x2 = off2.left + (off2.width/2);
            // abajo
            y2 = off2.top + off2.height;
            break;
        case '3-4':
            // centro
            x1 = off1.left + (off1.width/2);
            // abajo
            y1 = off1.top + off1.height;
            // izquierda
            x2 = off2.left;
            // mitad
            y2 = off2.top + (off2.height/2);
            break;
        case '4-0':
            // izquierda
            x1 = off1.left;
            // mitad
            y1 = off1.top + (off1.height/2);
            // centro
            x2 = off2.left + (off1.width/2);
            // arriba
            y2 = off2.top;
            break;
        default:

    }

    // Ecuclidian distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2), (x1-x2)) * (180 / Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    document.body.innerHTML += htmlLine;
    //document.getElementById('main') += htmlLine;
}

function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}
