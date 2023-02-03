
function heightfunction() {

   $(document).ready(function(){       
            var scroll_pos = 0;
            $(document).scroll(function() { 
                total_height = document.documentElement.clientHeight;
                scroll_pos = $(this).scrollTop();

              });
        });
    
  }

//load a crap image while the high res one loads.
window.addEventListener('load', function () {
document.getElementById("bannerlq").style.display="none"
})
	



$(document).ready(function(){       
      // Select link by id and add click event
      $('#arrow').click(function() {
        $('html, body').animate({
          scrollTop: $("#menu").offset().top }, 800 );
     //   return false;
      });
    });
 
$(document).ready(function(){  
var arrow = document.getElementById("arrow");
arrow.style.visibility = 'hidden'
    });	

function timer() {arrow.style.visibility = 'visible'}	

$(document).ready(function(){  
setTimeout(timer, 0)
});


// Help Modal 



var Expand = (function() {
  var tile = $('.strips__strip');
  var tileLink = $('.strips__strip > .strip__content');
  var tileText = tileLink.find('.strip__inner-text');
  var stripClose = $('.strip__close');
  var stripClose3 = $('.strip__close3');
  
  var expanded  = false;

  var open = function() {
      
    var tile = $(this).parent();

      if (!expanded) {
        tile.addClass('strips__strip--expanded');
        // add delay to inner text
        tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
        stripClose.addClass('strip__close--show');
        stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
        
        expanded = true;
      } 
    };
  
  var close = function() {
    if (expanded) {
      tile.removeClass('strips__strip--expanded');
      // remove delay from inner text
      tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
      stripClose.removeClass('strip__close--show');
      stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
     
      expanded = false;
    }
  }

    var bindActions = function() {
      tileLink.on('click', open);
      stripClose.on('click', close);
    };

    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

Expand.init();