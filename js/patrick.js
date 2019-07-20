///////////////////////////////////////////////////////////////////////////////
// Patrick the SNAIL

var Patrick = new Object();

Patrick.initialize = function(v, P, I, D){

  // Patricks Character
  Patrick.v = v;
  Patrick.P = P;
  Patrick.I = I;
  Patrick.D = D;

  // Sensoreigenschaften
  Patrick.t = 0;
  Patrick.PID = 0;
  Patrick.I_alt = Patrick.I;
  Patrick.D_alt = Patrick.D;
  Patrick.sensor = "mitte";
  Patrick.sensor_alt = "mitte";
  Patrick.sensorL = "green";
  Patrick.sensorR = "green";
  Patrick.spurweite = 10;
  Patrick.ueberbiss = 37;

  // Patricks Startwerte
  Patrick.ausrichtung = Map.ausrichtung;
  Patrick.x = Map.startX ;
  Patrick.y = Map.startY;

  Patrick.xL = Patrick.x - Patrick.spurweite* Math.cos(Patrick.ausrichtung)
                         + Patrick.ueberbiss* Math.sin(Patrick.ausrichtung);
  Patrick.yL = Patrick.y - Patrick.spurweite* Math.sin(Patrick.ausrichtung)
                         - Patrick.ueberbiss* Math.cos(Patrick.ausrichtung);
  Patrick.xR = Patrick.x + Patrick.spurweite* Math.cos(Patrick.ausrichtung)
                         + Patrick.ueberbiss* Math.sin(Patrick.ausrichtung);
  Patrick.yR = Patrick.y + Patrick.spurweite* Math.sin(Patrick.ausrichtung)
                         - Patrick.ueberbiss* Math.cos(Patrick.ausrichtung);

}

Patrick.transformPatrick = function(){

  Patrick.x =  Patrick.x + Patrick.v * Math.sin(Patrick.ausrichtung);
  Patrick.y =  Patrick.y - Patrick.v * Math.cos(Patrick.ausrichtung);

  Patrick.xL = Patrick.x - Patrick.spurweite* Math.cos(Patrick.ausrichtung)
                         + Patrick.ueberbiss* Math.sin(Patrick.ausrichtung);
  Patrick.yL = Patrick.y - Patrick.spurweite* Math.sin(Patrick.ausrichtung)
                         - Patrick.ueberbiss* Math.cos(Patrick.ausrichtung);
  Patrick.xR = Patrick.x + Patrick.spurweite* Math.cos(Patrick.ausrichtung)
                         + Patrick.ueberbiss* Math.sin(Patrick.ausrichtung);
  Patrick.yR = Patrick.y + Patrick.spurweite* Math.sin(Patrick.ausrichtung)
                         - Patrick.ueberbiss* Math.cos(Patrick.ausrichtung);
}

Patrick.checkPath = function(){

  Patrick.pL = Map.contextPath.getImageData(Patrick.xL, Patrick.yL, 1, 1).data;
  Patrick.hexL = Patrick.pL[3];

  Patrick.pR = Map.contextPath.getImageData(Patrick.xR, Patrick.yR, 1, 1).data;
  Patrick.hexR = Patrick.pR[3];

  // LINIENCHECK
  if (Patrick.hexL != "255" && Patrick.hexR == "255")
  {
    Patrick.sensorL = "green";
    Patrick.sensorR = "red";
    Patrick.sensor = "links1";
  }

  if (Patrick.hexL == "255" && Patrick.hexR != "255")
  {
    Patrick.sensorL = "red";
    Patrick.sensorR = "green";
    Patrick.sensor = "rechts1";
  }

  if (Patrick.hexL == "255"&& Patrick.hexR == "255")
  {
    Patrick.sensorL = "red";
    Patrick.sensorR = "red";
    Patrick.sensor = "mitte";
  }

  if (Patrick.hexL != "255" && Patrick.hexR != "255")
  {
    if (Patrick.sensor_alt == "mitte"){
      Patrick.sensorL = "green";
      Patrick.sensorR = "green";
    }
    else if (Patrick.sensor_alt == "links1" || Patrick.sensor_alt == "links2")
    {
      Patrick.sensorL = "purple";
      Patrick.sensorR = "purple";
      Patrick.sensor = "links2";
    }
    else if (Patrick.sensor_alt == "rechts1" || Patrick.sensor_alt == "rechts2")
    {
      Patrick.sensorL = "purple";
      Patrick.sensorR = "purple";
      Patrick.sensor = "rechts2";
    }
    else{
      Patrick.sensorL = "yellow";
      Patrick.sensorR = "yellow";
      Patrick.sensor = "lost";
    }
  }
}

Patrick.checkCollision = function(){

  Patrick.cop = Map.contextCollision.getImageData(Patrick.x, Patrick.y, 1, 1).data;
  Patrick.copBlack = Patrick.cop[2];

  // LINIENCHECK
  if (Patrick.copBlack != "255")
  {
    return true;
  }
  else {
    return false;
  }
}

Patrick.setPID = function(){

  // REAKTION ///////////////////////////////////////

  // Zaehle die loops, die sich Patrick im gleichen Zustand befindet
  if (Patrick.sensor_alt == "links2" && Patrick.sensor == "links1"   ||
      Patrick.sensor_alt == "links1" && Patrick.sensor == "links2"   ||
      Patrick.sensor_alt == "links2" && Patrick.sensor == "links2"   ||
      Patrick.sensor_alt == "links1" && Patrick.sensor == "links1"   ||
      Patrick.sensor_alt == "rechts2" && Patrick.sensor == "rechts2" ||
      Patrick.sensor_alt == "rechts1" && Patrick.sensor == "rechts1" ||
      Patrick.sensor_alt == "rechts2" && Patrick.sensor == "rechts1" ||
      Patrick.sensor == "rechts2" && Patrick.sensor_alt == "rechts1"){
    Patrick.t++;
  }
  else  {
    Patrick.t = 0;
    Patrick.I_alt = 0;
    Patrick.D_alt = 0;
  }

  Patrick.PID = Patrick.P + Patrick.I_alt + Patrick.I + 1 / (Patrick.D + Patrick.D_alt);

  if (Patrick.sensor == "rechts1" || Patrick.sensor == "rechts2" ){
    Patrick.ausrichtung = Patrick.ausrichtung - Patrick.PID ;
  }
  else if (Patrick.sensor == "links1" || Patrick.sensor == "links2"){
    Patrick.ausrichtung = Patrick.ausrichtung + Patrick.PID ;
  }

  // setze Vergleichswerte fuer naehsten Loop
  Patrick.I_alt = Patrick.I + Patrick.I_alt;
  Patrick.D_alt = Patrick.D + Patrick.D_alt;
  Patrick.sensor_alt = Patrick.sensor;
}

Patrick.checkFinish = function(){

  // Zielprüfung
  if (Math.sqrt((Patrick.xL-Map.zielX)*(Patrick.xL-Map.zielX)+(Patrick.yL-Map.zielY)*(Patrick.yL-Map.zielY))<=40){
    return true;
  }
  else if (Math.sqrt((Patrick.xR-Map.zielX)*(Patrick.xR-Map.zielX)+(Patrick.yR-Map.zielY)*(Patrick.yR-Map.zielY))<=40){
    return true;
  }
}

Patrick.changeSpeed = function (factor){
  Patrick.v = Patrick.v * factor
  Event.updateStatus();
}

Patrick.changeP = function (factor){
  Patrick.P = Patrick.P * factor
  Event.updateStatus();
}

Patrick.changeI = function (factor){
  Patrick.I = Patrick.I * factor
  Event.updateStatus();
}

Patrick.changeD = function (factor){
  Patrick.D = Patrick.D * factor
  Event.updateStatus();
}
