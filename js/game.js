///////////////////////////////////////////////////////////////////////////////
// GAMELOOP startet durch buttonclick

var Game = new Object();

///////////////////////////////////////////////////////////////////////////////
// start & stop gameloop

function startGame(){

if (Game.state == false){
  Game.startDate = new Date();
  Game.previousDate = Game.startDate;
  Game.count = 0;
  Game.fps = 100;
  Game.state = true;
}
else {
  Game.kill(true);
  return;
}

// call of gameloop function
Game.run = function() {
  Game.update();
}

// fires gameloop
Game._intervalId = setInterval(Game.run, 1000 / Game.fps);


///////////////////////////////////////////////////////////////////////////////
// PROGRAMMABLAUF innerhalb des Loops

Game.update = function(){

  Game.previousDate = Game.currentDate;
  Game.currentDate = new Date();
  Game.count = Game.count + 1;

  // check for eventes
  Event.keyboard();

  // update model
  Patrick.transformPatrick();
  Patrick.checkPath();
  Patrick.setPID();

  // check for end-condition
  if (Patrick.checkFinish()) {
    Game.kill("finish");
  };

  // check for collision
  if (Patrick.checkCollision()) {
    Game.kill("collision");
  };

  // update view
  Map.drawPatrick();

  // update status
  document.getElementById('mainSensor').innerHTML = "sensor: " + Patrick.sensor
  document.getElementById('mainStatus').innerHTML = Game.count + " steps";
  document.getElementById('mainTimer').innerHTML = (Game.currentDate-Game.startDate) / 1000 + " sec";
  document.getElementById('mainFPS').innerHTML = (1000/(Game.currentDate-Game.previousDate)).toFixed(0) + " fps";

  // stop the game, when finish-condition reached
  if (Game.count == 9999) {
    clearInterval(Game._intervalId);
    alert("Patrick hat es nicht geschafft..")
  }
}

///////////////////////////////////////////////////////////////////////////////
// stops game and reloads initial (true) | stops gameloop (else)

Game.kill = function(reason){
  clearInterval(Game._intervalId);
  if (reason == "finish"){
    alert("Patrick hat es geschafft.\n Zeitschritte: " + Game.count);
  }
  if (reason == "collision"){
    alert("Patrick ist gegen ein Hindernis gefahren und kaputt gegangen");
  }
  else{
    Init.initializeComponents();
  }
}

}
