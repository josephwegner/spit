document.body.onload = function() {
  document.body.innerHTML = "<div id='innards'></div><input type='range' min='0' max='360' id='range' value='0' /><p>You Are on Test 1!</p>";

  var range = document.getElementById("range");
  var innards = document.getElementById("innards");

  range.oninput = function() {
    innards.style['-webkit-transform'] = 'rotateZ('+range.value+'deg)'
  }
}
