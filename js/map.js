///////////////////////////////////////////////////////////////////////////////
// Map - Level 1 for Demo

var Map = new Object();

// flag for first transition
Map.initial = true;

Map.initialize = function(startX, startY, zielX, zielY, ausrichtung) {

  if (Map.initial == true){

    // define start / end position of patrick
    Map.startX = startX;
    Map.startY = startY;
    Map.zielX = zielX;
    Map.zielY = zielY;
    Map.ausrichtung = ausrichtung;

    // get Canvas Elements
    Map.canvasMap = document.getElementById('mainCanvasMap');
    Map.canvasCollision = document.getElementById('mainCanvasCollision');
    Map.canvasPath = document.getElementById('mainCanvasPath');
    Map.canvasSensor = document.getElementById('mainCanvasSensor');
    Map.canvasSlime = document.getElementById('mainCanvasSlime');
    Map.canvasPatrick = document.getElementById('mainCanvasPatrick');

    // create contextes
    Map.contextMap = Map.canvasMap.getContext('2d');
    Map.contextCollision = Map.canvasCollision.getContext('2d');
    Map.contextPath = Map.canvasPath.getContext('2d');
    Map.contextSensor = Map.canvasSensor.getContext('2d');
    Map.contextSlime = Map.canvasSlime.getContext('2d');
    Map.contextPatrick = Map.canvasPatrick.getContext('2d');

    // initial correction eg: scale, transform, etc..
    Map.contextPatrick.translate(-25,-50);
    Map.contextPath.scale(Init.pathSF,Init.pathSF);
    Map.contextMap.scale(1.0,1.0);
    Map.initial = false;

    // draw images to canvas
    Map.contextMap.drawImage(Init.mapImg, 0, 0);
    Map.contextCollision.drawImage(Init.collisionImg, 0, 0);
    Map.contextPath.drawImage(Init.pathImg, 0, 0);

    //// marker for Start End
    // Map.contextMap.lineWidth = 2;
    // Map.contextMap.fillStyle = "green";
    // Map.contextMap.beginPath();
    // Map.contextMap.arc(Map.zielX,Map.zielY,40,0,2*Math.PI);
    // Map.contextMap.fill();
    // Map.contextMap.fillStyle = "orange";
    // Map.contextMap.beginPath();
    // Map.contextMap.arc(Map.startX,Map.startY,40,0,2*Math.PI);
    // Map.contextMap.fill();

  }
  else{
    Map.contextSlime.clearRect(0, 0, 1200, 1200);
  }
}

Map.drawPatrick = function() {

  // clear old States
  Map.contextPatrick.clearRect(0, 0, 1200, 1200);
  Map.contextSensor.clearRect(0, 0, 1200, 1200);

  // draw Patrick including transition to and from origin
  Map.contextPatrick.translate(Patrick.x+25,Patrick.y+50);
  Map.contextPatrick.rotate(Patrick.ausrichtung);
  Map.contextPatrick.translate(-Patrick.x-25,-Patrick.y-50);
  Map.contextPatrick.drawImage(Init.patrick,Patrick.x,Patrick.y);
  Map.contextPatrick.translate(Patrick.x+25,Patrick.y+50);
  Map.contextPatrick.rotate(-Patrick.ausrichtung);
  Map.contextPatrick.translate(-Patrick.x-25,-Patrick.y-50);

  // draw Sensors
  Map.contextSensor.lineWidth = 4;
  Map.contextSensor.beginPath();
  Map.contextSensor.strokeStyle = Patrick.sensorL;
  Map.contextSensor.arc(Patrick.xL,Patrick.yL,6,0,2*Math.PI);
  Map.contextSensor.stroke();
  Map.contextSensor.closePath();
  Map.contextSensor.beginPath();
  Map.contextSensor.strokeStyle = Patrick.sensorR;
  Map.contextSensor.arc(Patrick.xR,Patrick.yR,6,0,2*Math.PI);
  Map.contextSensor.stroke();
  Map.contextSensor.closePath();

  // draw Schleimspur
  if (Game.count % 5 == 1){
    Map.contextSlime.lineWidth = 2;
    Map.contextSlime.beginPath();
    Map.contextSlime.fillStyle = "brown";
    Map.contextSlime.arc(Patrick.x,Patrick.y,3,0,2*Math.PI);
    Map.contextSlime.fill();
    Map.contextSlime.closePath();
  }
}
