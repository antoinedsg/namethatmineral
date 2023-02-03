//Top Bar Script 
function topbarFunction() {
	
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
	
  } else {
    x.className = "topnav";
	
  }
}


// Name cards
var Panels = (function() {
  
  var panelLeft = document.querySelector('.panels__side--left');
  var panelRight = document.querySelector('.panels__side--right');

  var openLeft = function() {
		panelLeft.classList.toggle('panels__side--left-active');
    panelRight.classList.toggle('panels__side--right-hidden');
  };

  var openRight = function() {
    panelRight.classList.toggle('panels__side--right-active');
    panelLeft.classList.toggle('panels__side--left-hidden');
  };
  
  var bindActions = function() {
    panelLeft.addEventListener('click', openLeft, false);
    panelRight.addEventListener('click', openRight, false);
  };
  
  var init = function() {
    bindActions();
  };
  
  return {
    init: init
  };
 
}());

Panels.init();




