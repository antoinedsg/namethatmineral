// Scroll animation 
function animated_scroll(target) {
    $('html, body').animate({
    scrollTop: $("#"+target).offset().top -40
  }, 500);
}



//Top Bar Script 
function topbarFunction() {
	
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
	
  } else {
    x.className = "topnav";
	
  }
}

// Scroll to top script //
//Get the button:
topscroll = document.getElementById("topscroll");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
    topscroll.style.display = "block";
  } else {
    topscroll.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Link function for inter-definitions	
function trial_onclick(id) {
  var text = id;
  var id_collapse = text.concat("_collapse");
  $('#'+id_collapse).collapse('show');
  $('html, body').animate({
    scrollTop: $("#"+id_collapse).offset().top -40
  }, 500);
}

//Script for Modal to open accordion on page load //

 $(document).ready(function () {
	 

	 
 //location.hash && $(location.hash + '.collapse').collapse('show');	
	 
location.hash && $(location.hash + '_collapse').collapse('show');
	 
var y = $(window).scrollTop();  //your current y position on the page
$(window).scrollTop(y-40);
	 
});

//Show ALL-button script //
	$('#toggle').click(function(e) {
	var index;
  var n = 0;
	index = document.getElementById("toggle").value;
	if (index == "Show All") {
	document.getElementById("toggle").value = "Hide All"
//    $('#accordion .panel-collapse').collapse('show');
//      $('.panel-heading').each(function(){
//      var word_id = $(this).attr('id');
//      load_php(word_id);
//      });
    $('#accordion .panel-collapse').each(function(){
      $(this).collapse('show');
      var word_id = $(this).attr('id');
      word_id = word_id.slice(0,-9);
 //     load_php(word_id);
    });
    
    
    //var word_id = $('#accordion .panel-collapse').attr('id');
    //word_id = word_id.slice(0,-9);
    //load_php(word_id);
	}
	else{
	document.getElementById("toggle").value = "Show All";
	$('#accordion .panel-collapse').collapse('hide');	
	}	
});


//Copy disable //
$(document).ready(function () {
    //Disable cut copy paste
    $('.panel').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
   
    //Disable mouse right click
    $(".panel").on("contextmenu",function(e){
        return false;
    });
});

