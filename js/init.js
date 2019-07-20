///////////////////////////////////////////////////////////////////////////////
// Init

var Init = new Object();

Init.initialize = function(level){

  // load images
  Init.pathImg = new Image();
  Init.pathImg.src = 'media/' + level + '/Pfad.svg';

  Init.mapImg = new Image();
  Init.mapImg.src = 'media/' + level + '/Map.png';

  Init.collisionImg = new Image();
  Init.collisionImg.src = 'media/' + level + '/Collision.png';

  Init.patrick = new Image();
  Init.patrick.src = 'media/patrick.png';

  if (level == "LVL01"){
    Init.pathSF = 1.6;
    Init.startX = 55;
    Init.startY = 520;
    Init.zielX = 715;
    Init.zielY = 735;
    Init.ausrichtung = 2.5;
    Init.v = 0.5;
    Init.P = 0.0001;
    Init.I = 0.0001;
    Init.D = 1000000;
  }

  // after all elements loaded, initialze current level
  window.onload = function()
  {
      Init.initializeComponents("initial")
  }
}

// initializes all Gamecomponents
Init.initializeComponents = function(flag){

  Map.initialize(Init.startX, Init.startY, Init.zielX, Init.zielY, Init.ausrichtung);

  if (flag=="initial"){
    Patrick.initialize(Init.v, Init.P, Init.I, Init.D);
  }
  else {
    Patrick.initialize(Patrick.v, Patrick.P, Patrick.I, Patrick.D);
  }

  Map.drawPatrick("green", "green");
  Event.updateStatus();
  Game.state = false;

}
