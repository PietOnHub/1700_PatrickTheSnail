///////////////////////////////////////////////////////////////////////////////
// Events & Controls
var Event = new Object();

Event.keyboard = function(){

  document.addEventListener("keydown", Event.keyDownHandler);
  document.addEventListener("keyup", Event.keyUpHandler);

  Event.keyDownHandler = function(e) {
      if(e.keyCode == 40) {
          Patrick.changeSpeed(0.9995);
      }
      if(e.keyCode == 38) {
          Patrick.changeSpeed(1.0005);
      }
  }

  Event.keyUpHandler = function(e) {
      if(e.keyCode == 40) {
          Patrick.changeSpeed(1);
      }
      if(e.keyCode == 38) {
          Patrick.changeSpeed(1);
      }
  }

}

Event.updateStatus = function(){
  document.getElementById('controlCurrentSpeed').innerHTML = Patrick.v.toFixed(1);
  document.getElementById('controlCurrentP').innerHTML = (Patrick.P/Init.P).toFixed(1);
  document.getElementById('controlCurrentI').innerHTML = (Patrick.I/Init.I).toFixed(1);
  document.getElementById('controlCurrentD').innerHTML = (Patrick.D/Init.D).toFixed(1);
}
