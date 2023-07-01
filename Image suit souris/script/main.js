document.onmousemove = suitsouris;

function suitsouris(evenement) {
  if (navigator.appName == "Microsoft Internet Explorer") {
    var x = event.x + document.body.scrollLeft;
    var y = event.y + document.body.scrollTop;
  } else {
    var x = evenement.pageX;
    var y = evenement.pageY;
  }
  document.getElementById("imgFollowMouse").style.left = (x + 1) + 'px';
  document.getElementById("imgFollowMouse").style.top = (y + 1) + 'px';
}