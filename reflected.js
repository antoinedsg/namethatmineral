
// Code read once the transmitted file is successfully displayed on the browser.
$(document).ready(function () {
    //Disable cut copy paste
    $('#datatable_ajax').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
   
    //Disable mouse right click
    $("#datatable_ajax").on("contextmenu",function(e){
        return false;
    });
});
// Load the SUMOSELECT dropdowns //
$(document).ready(function() {
	$("#Colour").SumoSelect({placeholder: 'Colour'});
	$("#Bireflectance").SumoSelect({placeholder: 'Bireflectance'});
	$("#Anisotropy").SumoSelect({placeholder: 'Anisotropy'});
	$("#RelHard").SumoSelect({placeholder: 'Relative Hardness', search: true, searchText: 'Search for Mineral(s)', okCancelInMulti: false });
	$("#Habit").SumoSelect({placeholder: 'Habit', search: true, searchText: 'Search for Habit'});
	$("#Features").SumoSelect({placeholder: 'Noteworthy Feature(s)'});
	$("#SvO").SumoSelect({placeholder: 'Oxide or Sulphide'});
	$("#Associ").SumoSelect({placeholder: 'Associated Mineral', search: true, searchText: 'Search for Mineral(s)'});	
	$("#IR").SumoSelect({placeholder: 'Internal Reflections'});
	$("#Reflectivity").SumoSelect({placeholder: 'Reflectivity'});
	$("#Hardness").SumoSelect({placeholder: 'Hardness'});
	$("#CSystem").SumoSelect({placeholder: 'Crystal System'});
});	


// Top Bar Script //
function topbarFunction() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
    	x.className += " responsive";
	} 
  	else {
    	x.className = "topnav";  
	}
}

function determine_wings(n,cell_text, selected_index,wings, strength){
	var property = wings[n];
	var array = property[selected_index];
	// First if to clear those properties that are not chosen yet
	if (selected_index ==0) {
		// The strength array records how many of the wingable properties match the selected properties
		// We set strength[n] = 1 when the wingable property matches the selected property
		// We set strenght[n] = 0 otherwise
		strength[n]=1;
		return true;
	}
	for (var i=0; i<array.length; i++) {
		var current_index = cell_text.indexOf(array[i]);
		if (current_index > -1 && i == 0){
			strength[n]=1;
			return true;
		}
		else if (current_index > -1){
			return true;
		}
	}

	return false;
	}






// Tooltips with the pictures of each mineral //

function load_videoP(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/reflected_pics/" + mineral_id + "_P.mp4";

	document.getElementById(mineral_id).children[0].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';

var a = document.getElementById(mineral_id).children[0];
a.removeAttribute("onmouseover");
}

function load_videoX(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/reflected_pics/" + mineral_id + "_X.mp4";

document.getElementById(mineral_id).children[1].children[1].children[0].innerHTML =  ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';
var a = document.getElementById(mineral_id).children[1];
a.removeAttribute("onmouseover");

}

function load_videoX_p3(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/reflected_pics/" + mineral_id + "_X.mp4";

document.getElementById(mineral_id).children[2].children[1].children[0].innerHTML =  ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';
var a = document.getElementById(mineral_id).children[2];
a.removeAttribute("onmouseover");

}

function PPL_image(elem){
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/reflected_pics/" + mineral_id + "_P.JPG";

document.getElementById(mineral_id).children[0].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"> <img src="' + pathway + '" alt="No image yet" class="tooltip_image"/></a></figure>';

var a = document.getElementById(mineral_id).children[0];
a.removeAttribute("onmouseover");
}

function XPL_image(elem){
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/reflected_pics/" + mineral_id + "_X.JPG";

document.getElementById(mineral_id).children[1].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"> <img src="' + pathway + '" alt="No image yet" class="tooltip_image"/></a></figure>';

var a = document.getElementById(mineral_id).children[1];
a.removeAttribute("onmouseover");

}



// Table Search Script //
function choicedropdown() {

	// Clear the suggested minerals list
	document.getElementById("suggested_datatable").innerHTML = "";
	
	//For multiple select, pull value of dropdown selection into an array, so skips next 2 steps.
	var color = document.getElementById("Colour");  
	var biref = document.getElementById("Bireflectance");
	var ani = document.getElementById("Anisotropy");  
//  var relh = document.getElementById("RelHard");  
	var relh = $('#RelHard').val(); 
	var habit = document.getElementById("Habit");  
	var nfeat = document.getElementById("Features"); 
//	var nfeat = $('#Features').val();
	var svo = document.getElementById("SvO");  
//	var assoc = document.getElementById("Associ");   
	var assoc = $('#Associ').val();
	var ir = document.getElementById("IR");  
	var refl = document.getElementById("Reflectivity");  
	var hard = document.getElementById("Hardness");  
	var csys = document.getElementById("CSystem");  
	
	// Function to define the wings of each property
	// WARNING: for the suggested mineral strength colours to work correctly, each x_wings[n] must
	// begin with the first entry being [x.option[n].value...].
	function define_wings() {
		var mineral_wings = [];
		var color_wings = [];
		var biref_wings= [];
		var ani_wings= [];
		var relh_wings= [];
		var habit_wings= [];
		var nfeat_wings= [];
		var svo_wings= [];
		var assoc_wings= [];
		var ir_wings= [];
		var refl_wings= [];
		var hard_wings= [];
		var csys_wings= [];

		// Colour wings
		color_wings[1] = [color.options[1].value.toUpperCase(),color.options[2].value.toUpperCase(),color.options[3].value.toUpperCase(),color.options[4].value.toUpperCase()];
		color_wings[2] = [color.options[2].value.toUpperCase(),color.options[1].value.toUpperCase(),color.options[3].value.toUpperCase(),color.options[4].value.toUpperCase()];
		color_wings[3] = [color.options[3].value.toUpperCase(),color.options[1].value.toUpperCase(),color.options[2].value.toUpperCase(),color.options[4].value.toUpperCase()];
		color_wings[4] = [color.options[4].value.toUpperCase(),color.options[1].value.toUpperCase(),color.options[2].value.toUpperCase(),color.options[3].value.toUpperCase()];
		color_wings[5] = [color.options[5].value.toUpperCase(),color.options[6].value.toUpperCase()];
		color_wings[6] = [color.options[6].value.toUpperCase(),color.options[5].value.toUpperCase()];
		color_wings[7] = [color.options[7].value.toUpperCase(),color.options[8].value.toUpperCase()];
		color_wings[8] = [color.options[8].value.toUpperCase(),color.options[7].value.toUpperCase()];
		color_wings[9] = [color.options[9].value.toUpperCase(),color.options[10].value.toUpperCase(),color.options[11].value.toUpperCase()];
		color_wings[10] = [color.options[10].value.toUpperCase(),color.options[9].value.toUpperCase(),color.options[11].value.toUpperCase()];
		color_wings[11] = [color.options[11].value.toUpperCase(),color.options[9].value.toUpperCase(),color.options[10].value.toUpperCase()];

		// Internal reflections wings
		ir_wings[1] = [ir.options[1].value.toUpperCase()];
		ir_wings[2] = [ir.options[2].value.toUpperCase(), ir.options[4].value.toUpperCase(), ir.options[5].value.toUpperCase(),ir.options[6].value.toUpperCase(),ir.options[7].value.toUpperCase(),ir.options[8].value.toUpperCase(),ir.options[9].value.toUpperCase()];
		ir_wings[3] = [ir.options[3].value.toUpperCase(), ir.options[4].value.toUpperCase(), ir.options[5].value.toUpperCase(),ir.options[6].value.toUpperCase(),ir.options[7].value.toUpperCase(),ir.options[8].value.toUpperCase(),ir.options[9].value.toUpperCase()];
		ir_wings[4] = [ir.options[4].value.toUpperCase(),ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase(),ir.options[5].value.toUpperCase()];
		ir_wings[5] = [ir.options[5].value.toUpperCase(),ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase(),ir.options[4].value.toUpperCase()];
		ir_wings[6] = [ir.options[6].value.toUpperCase(),ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase(),ir.options[7].value.toUpperCase(),ir.options[8].value.toUpperCase()];
		ir_wings[7] = [ir.options[7].value.toUpperCase(),ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase(),ir.options[6].value.toUpperCase(),ir.options[8].value.toUpperCase()];
		ir_wings[8] = [ir.options[8].value.toUpperCase(),ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase(),ir.options[6].value.toUpperCase(),ir.options[7].value.toUpperCase()];
		ir_wings[9] = [ir.options[9].value.toUpperCase(), ir.options[2].value.toUpperCase(),ir.options[3].value.toUpperCase()];

		// Reflectivity wings
		refl_wings[1] = [refl.options[1].value.toUpperCase(), refl.options[2].value.toUpperCase()];
		refl_wings[2] = [refl.options[2].value.toUpperCase(), refl.options[1].value.toUpperCase(), refl.options[3].value.toUpperCase()];
		refl_wings[3] = [refl.options[3].value.toUpperCase(), refl.options[2].value.toUpperCase()];

		// Hard wings
		hard_wings[1] = [hard.options[1].value.toUpperCase(), hard.options[2].value.toUpperCase()];
		hard_wings[2] = [hard.options[2].value.toUpperCase(), hard.options[1].value.toUpperCase(),hard.options[3].value.toUpperCase()];
		hard_wings[3] = [hard.options[3].value.toUpperCase(),hard.options[2].value.toUpperCase(),hard.options[4].value.toUpperCase()];
		hard_wings[4] = [hard.options[4].value.toUpperCase(),hard.options[3].value.toUpperCase(),hard.options[5].value.toUpperCase()];
		hard_wings[5] = [hard.options[5].value.toUpperCase(),hard.options[4].value.toUpperCase()];

		// Define wings vector to be the collection of all wings, for all properties
		var wings = [mineral_wings, color_wings, biref_wings, ani_wings, relh_wings, habit_wings, nfeat_wings, svo_wings, assoc_wings, ir_wings, refl_wings, hard_wings, csys_wings]; 
		return wings;
	}

	// Assignment of the selected indices into an array called "index"
	var index = [];
	index[1] = color.selectedIndex;
	index[2] = biref.selectedIndex;
	index[3] = ani.selectedIndex;
	//index[4] = relh.selectedIndex;
	index[5] = habit.selectedIndex;
	index[6] = nfeat.selectedIndex;
	index[7] = svo.selectedIndex;
	//index[8] = assoc.selectedIndex;
	index[9] = ir.selectedIndex;
	index[10] = refl.selectedIndex;
	index[11] = hard.selectedIndex;
	index[12] = csys.selectedIndex;

	// Recovery of the selected text into an array called "choice". Notice that this recovers the text
	// displayed in the dropdown; it is not the same as the "value" of the option selected (by default
	// they are the same though) 	
	var choice = [];
	choice[1] = color.options[index[1]].text.toUpperCase();
	choice[2] = biref.options[index[2]].text.toUpperCase();
	choice[3] = ani.options[index[3]].text.toUpperCase();
	//choice[4] = relh.options[index[4]].value.toUpperCase();
	choice[5] = habit.options[index[5]].value.toUpperCase();
	choice[6] = nfeat.options[index[6]].value.toUpperCase();
	choice[7] = svo.options[index[7]].value.toUpperCase();
	//choice[8] = assoc.options[index[8]].text.toUpperCase();
	choice[9] = ir.options[index[9]].text.toUpperCase();
	choice[10] = refl.options[index[10]].value.toUpperCase();
	choice[11] = hard.options[index[11]].value.toUpperCase();
	choice[12] = csys.options[index[12]].text.toUpperCase();
	
	
	//Convert multiple select array to upper case
	toUpper = function (x){
		return x.toUpperCase();
	};
	relh = relh.map(toUpper);
	assoc = assoc.map(toUpper);
		
	var table, tr,tc_length, tr_length;
	table = document.getElementById("datatable");
	tr = table.getElementsByTagName("tr");
  
	// Find number of rows and the number of columns in the table
	tr_length = table.rows.length;
	tc_length = table.rows[0].cells.length;

	// Add a JQuery piece of code for more efficient table hiding
	var $rows = $("#datatable tr");
  	
  	// Loop to make sure that the initial options "Pick X" do not affect the table
	var i;
	for (i=0;i<tc_length;i++){
		if (index[i] == 0) {
   			choice[i] = "";
		}
	}


	n=0;
	var txtValue = [];
	var matching_minerals = [];
	var j;
	for (i = 1; i <= tr_length-1; i++) {
		for (j=0; j < tc_length; j++) {
			// Assignment of the cells j in each row i
			txtValue[j] = table.rows[i].cells[j].innerHTML;
		}
		//For multi-select, split the inner html into an array also.
		var relhinner = txtValue[6].toUpperCase().split("&");
		var associnner = txtValue[9].toUpperCase().split(" ");
		//Trim the new arrays so that there are no spaces
		relhinner = relhinner.map(Function.prototype.call, String.prototype.trim);
		associnner = associnner.map(Function.prototype.call, String.prototype.trim);
		//If one or more parts of the input array matches the inner html array, then return true. if one input matches and a second one doesn't, return false.
		function relhfct(){
		if (relh.every (e => relhinner.includes(e))) {
			return true;
		}
		return false;
		}	   
		function assocfct(){
		if (assoc.every (e => associnner.includes(e))) {
			return true;
		}
		return false;
		}	 

		if (txtValue[2].toUpperCase().indexOf(choice[1]) > -1 
		&& txtValue[4].toUpperCase().indexOf(choice[2]) > -1 
		&& txtValue[5].toUpperCase().indexOf(choice[3]) > -1 
		//&& txtValue[6].toUpperCase().indexOf(relh) > -1 
		&& relhfct()
		&& txtValue[7].toUpperCase().indexOf(choice[5]) > -1
		&& txtValue[8].toUpperCase().indexOf(choice[6]) > -1 
		&& txtValue[1].toUpperCase().indexOf(choice[7]) > -1
		// && txtValue[9].toUpperCase().indexOf(choice[8]) > -1 
		&& assocfct()
		&& txtValue[10].toUpperCase().indexOf(choice[9]) > -1
		&& txtValue[11].toUpperCase().indexOf(choice[10]) > -1 
		&& txtValue[12].toUpperCase().indexOf(choice[11]) > -1
		&& txtValue[13].toUpperCase().indexOf(choice[12]) > -1 	){
			$rows.eq(i).show();
			matching_minerals.push(txtValue[0]);
		} 
		else {
			$rows.eq(i).hide();
			n=n+1;
		}  
	} 
	  
//For loop for suggested	
var wings = define_wings();
var suggestion_strength = [];
for (i = 1; i <= tr_length-1; i++) {
	  for (j=0; j < tc_length; j++) {
		  // Assignment of the cells j in each row i
		  txtValue[j] = table.rows[i].cells[j].innerHTML;

		// Initialise the suggestion strength vector
		  suggestion_strength[j] = 0;
	}
	// Check whether the "wingable" properties are chosen yet.
	if (index[1]==0 && index[9] == 0 && index[10] == 0 && index[11]==0) {
		document.getElementById("suggested_datatable").innerHTML = "Our database does not have any suggested minerals beyond the minerals which match your search exactly..";
		
		document.getElementById("suggested_minerals").style.display = "";
		document.getElementById("suggested_toggle").style.display = "";
	}
	// if statement to check the wings
	else if (matching_minerals.indexOf(txtValue[0]) < 0
	&& determine_wings(1,txtValue[2].toUpperCase(),index[1],wings,suggestion_strength)
	&& txtValue[4].toUpperCase().indexOf(choice[2]) > -1 
	&& txtValue[5].toUpperCase().indexOf(choice[3]) > -1 
	//&& txtValue[6].toUpperCase().indexOf(relh) > -1 
	&& relhfct()
	&& txtValue[7].toUpperCase().indexOf(choice[5]) > -1
	&& txtValue[8].toUpperCase().indexOf(choice[6]) > -1 
	&& txtValue[1].toUpperCase().indexOf(choice[7]) > -1
	// && txtValue[9].toUpperCase().indexOf(choice[8]) > -1 
	&& assocfct()
	// && txtValue[10].toUpperCase().indexOf(choice[9]) > -1
	&& determine_wings(9,txtValue[10].toUpperCase(),index[9],wings,suggestion_strength)
	// && txtValue[11].toUpperCase().indexOf(choice[10]) > -1 
	&& determine_wings(10,txtValue[11].toUpperCase(),index[10],wings,suggestion_strength)
	// && txtValue[12].toUpperCase().indexOf(choice[11]) > -1
	&& determine_wings(11,txtValue[12].toUpperCase(),index[11],wings,suggestion_strength)
	&& txtValue[13].toUpperCase().indexOf(choice[12]) > -1 	){
	document.getElementById("suggested_minerals").style.display = "";
	
	document.getElementById("suggested_toggle").style.display = "";
	// Calculate the strength of the suggestion (number from 0 to 5)	
	var number = suggestion_strength.reduce(summ);
	var suggestion_colour;
		
		
	if (number >= 5) {
		suggestion_colour = "green";
	}
	else if (number == 4 || number == 3){
		suggestion_colour = "orange";
	}
	else {
		suggestion_colour = "red";
	}
	var chunky_block = "<div class='suggestions' id='"+txtValue[0]+"_suggested'>"+
		
		"<div class='btn-group btn-group-sm'>"+
		
		"<button style='background-color: "+suggestion_colour+";' type='button' class='btn btn-secondary-action disabled'></button>"+
		
		"<button id='"+txtValue[0]+"suggested"+"' type='button' class='btn btn-secondary-action disabled'>"+txtValue[0]+"</button>"+
		
		"<button id='"+txtValue[0]+"' onclick='add_possible_mineral(this.id)' class='btn btn-secondary'><i class='fa fa-plus'></i></button>"+

		"<button id='"+txtValue[0]+"' type='button' onclick='remove_possible_mineral(this.id)' class='btn btn-secondary'><i class='fa fa-times-circle'></i></button></div> </div>";  
		
	document.getElementById("suggested_datatable").innerHTML += chunky_block;	
	}

}


function colouring(){
	premier = document.querySelectorAll(".CaptionCont")[0];
	deuxieme = document.querySelectorAll(".CaptionCont")[1];
	troisieme = document.querySelectorAll(".CaptionCont")[2];
	quatrieme = document.querySelector("#thefourth .CaptionCont");
	cinquieme = document.querySelectorAll(".CaptionCont")[4];
	sixieme = document.querySelectorAll(".CaptionCont")[5];
	septieme = document.querySelectorAll(".CaptionCont")[6];
	huitieme = document.querySelector("#theeighth .CaptionCont");
	neuvieme = document.querySelectorAll(".CaptionCont")[8];
	dixieme = document.querySelectorAll(".CaptionCont")[9];
	onzieme = document.querySelectorAll(".CaptionCont")[10];
	douzieme = document.querySelectorAll(".CaptionCont")[11];	  
	  
	if(index[1]> 0){premier.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {premier.style.backgroundColor = "white";};
		
	if(index[2]> 0){deuxieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {deuxieme.style.backgroundColor = "white";}	  
		
	if(index[3]> 0){troisieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {troisieme.style.backgroundColor = "white";}	
		
	if(relhfct()){quatrieme.style.backgroundColor = "white";}
		else {quatrieme.style.backgroundColor = "rgba(96,191,191,0.20)";}	
		
	if(index[5]> 0){cinquieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {cinquieme.style.backgroundColor = "white";}	
			
	if(index[6]> 0){sixieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {sixieme.style.backgroundColor = "white";}
		
	if(index[7]> 0){septieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {septieme.style.backgroundColor = "white";}
		
	if(assocfct()){huitieme.style.backgroundColor = "white";}
		else {huitieme.style.backgroundColor = "rgba(96,191,191,0.20)";};
		
	if(index[9]> 0){neuvieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {neuvieme.style.backgroundColor = "white";}
			
	if(index[10]> 0){dixieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {dixieme.style.backgroundColor = "white";}
			
	if(index[11]> 0){onzieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {onzieme.style.backgroundColor = "white";}
			
	if(index[12]> 0){douzieme.style.backgroundColor = "rgba(96,191,191,0.20)";}
		else {douzieme.style.backgroundColor = "white";}	    
}
	
//Matching Minerals
function matches(){
// Short code which displays the number of minerals which satisfy the selected criteria. Includes warning if criteria return no results
	var total, total_match;
	total = tr_length-1;
	total_match = total - n;
	if (total_match == 1) {
		document.getElementById("matching_minerals").innerHTML = "List of possible minerals &mdash; " + total_match + " match";
	}
	else if (total_match==0) {
		document.getElementById("matching_minerals").innerHTML = "List of possible minerals &ndash; No matches";
	}
	else if (total_match == total) {
	document.getElementById("matching_minerals").innerHTML = "Mineral properties";
	}
	else {
	document.getElementById("matching_minerals").innerHTML = "List of possible minerals &ndash; " + total_match + " matches";
	}
}	

colouring();
matches();

}
// End of choice dropdown

// Function to add suggested minerals to matching datatable
function add_possible_mineral(mineral_name) {
	var table, tr, i, txtValue;
	table = document.getElementById("datatable");
	tr = table.getElementsByTagName("tr");
	var $rows = $("#datatable tr");

	// Loop through all table rows, and show the one which matches the querry
	for (i = 1; i < tr.length; i++) {
		txtValue = table.rows[i].cells[0].innerHTML;
		if (txtValue.toUpperCase().indexOf(mineral_name.toUpperCase()) > -1) {
			$rows.eq(i).show();
		} 
	}
	
	// Delete the button in the suggested list
	document.getElementById(mineral_name.concat('suggested')).innerHTML = 'Added to Table';
	var s =   document.getElementById(mineral_name.concat('_suggested')).style;
	s.opacity = 1;
	(function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
}

function remove_possible_mineral(mineral_name){
	var s =   document.getElementById(mineral_name.concat('_suggested')).style;
	s.opacity = 1;
	(function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,70)})();
}




// Mineral Search //
function mineralsearch() {
var input, filter, table, tr, td, i, txtValue
input = document.getElementById("mineral_search");
  filter = input.value.toUpperCase();
  table = document.getElementById("datatable");
  tr = table.getElementsByTagName("tr");
  var $rows = $("#datatable tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
      txtValue = table.rows[i].cells[0].innerHTML;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        $rows.eq(i).show();
     } else {
        $rows.eq(i).hide();
      }
  }
}


// Reset button to clear selected options and reset table to default position
function reset_options() {
	
    document.getElementById("mineral_search").value = "";
	

	
	
	value = [];
	value[1] = document.getElementById("Colour");
	value[1].selectedIndex = 0; 
	
	value[2] = document.getElementById("Bireflectance");
	value[2].selectedIndex = 0;
	
	value[3] = document.getElementById("Anisotropy");
	value[3].selectedIndex = 0;
	//value[4] = document.getElementById("RelHard");
	//value[4].selectedIndex = -1;
	value[5] = document.getElementById("Habit");
	value[5].selectedIndex = 0;
	value[6] = document.getElementById("Features");
	value[6].selectedIndex = 0;
	value[7] = document.getElementById("SvO");
	value[7].selectedIndex = 0;
	//value[8] = document.getElementById("Associ");
	//value[8].selectedIndex = -1;
	value[9] = document.getElementById("IR");
	value[9].selectedIndex = 0;
	value[10] = document.getElementById("Reflectivity");
	value[10].selectedIndex = 0;
	value[11] = document.getElementById("Hardness");
	value[11].selectedIndex = 0;
	value[12] = document.getElementById("CSystem");
	value[12].selectedIndex = 0;

	
	// Reset the sumo boxes // 
	
	$("#Colour")[0].sumo.unSelectAll();
	$("#Bireflectance")[0].sumo.unSelectAll();
    $("#Anisotropy")[0].sumo.unSelectAll();
    $("#RelHard")[0].sumo.unSelectAll();
	$("#Habit")[0].sumo.unSelectAll();
    $("#Features")[0].sumo.unSelectAll();
	
	$("#SvO")[0].sumo.unSelectAll();
	$("#Associ")[0].sumo.unSelectAll();
	$("#IR")[0].sumo.unSelectAll();
	$("#Reflectivity")[0].sumo.unSelectAll();
    $("#Hardness")[0].sumo.unSelectAll();
	$("#CSystem")[0].sumo.unSelectAll();

	document.getElementById("suggested_datatable").innerHTML = "";
	document.getElementById("suggested_minerals").style.display = "none";
	
	document.getElementById("suggested_toggle").style.display = "none";

	

	
	choicedropdown();
	 $('#datatable_window').css("height","80vh");
	
	document.getElementById("matching_minerals").innerHTML = 'Mineral properties <button onclick="advanced_options_toggle2()" id="advanced_options_button2" class="btn" value="show_more">Show more &nbsp;<i class="fa fa-angle-double-right"></i></button>';
	
	}



//Advanced Options //
function advanced_options_toggle() {
	var index;
	index = document.getElementById("advanced_options_button").value;

	if (index == "show_more") {
	document.getElementById("advanced_options").style.display = "";
	document.getElementById("advanced_options_button").value = "show_fewer";
	document.getElementById("advanced_options_button").innerHTML ="<i class='fa fa-minus'></i>&nbsp; &nbsp; Show fewer properties";
		
	document.getElementById("advanced_options_button2").value = "show_fewer";
	document.getElementById("advanced_options_button2").innerHTML ="Hide again &nbsp;<i class='fa fa-angle-double-left'></i>";	
		
	$('#datatable tr > *:nth-child(n+10)').show();
	$('#datatable tr > *:nth-child(2)').show();
	
	// The code below is necessary to override the automatic size of the table with 15 columns, which is cramped 
	var width_vector_extended = [];
	width_vector_extended = [150,180,120,190,140,116,175,175,200,190,190,150,120,150,200];
	
	for (var i = 0; i <= 15; i++) {
		document.getElementById('datatable').rows[0].cells[i].style.width = width_vector_extended[i]+"px";
	}
	
}
	else {
	document.getElementById("advanced_options").style.display = "none";
	document.getElementById("advanced_options_button").value = "show_more";
	document.getElementById("advanced_options_button").innerHTML="<i class='fa fa-plus'></i>&nbsp; &nbsp; Show more properties";
		
	document.getElementById("advanced_options_button2").value = "show_more";
	document.getElementById("advanced_options_button2").innerHTML="Show more &nbsp;<i class='fa fa-angle-double-right'></i>";	
		
	$('#datatable tr > *:nth-child(n+10)').hide();
	$('#datatable tr > *:nth-child(2)').hide();
	}
	

}

function advanced_options_toggle2() {
	var index;
	index = document.getElementById("advanced_options_button2").value;


	if (index == "show_more") {
	document.getElementById("advanced_options").style.display = "";
	document.getElementById("advanced_options_button2").value = "show_fewer";
	document.getElementById("advanced_options_button2").innerHTML ="Hide again &nbsp;<i class='fa fa-angle-double-left'></i>";
		
	document.getElementById("advanced_options_button").value = "show_fewer";
	document.getElementById("advanced_options_button").innerHTML ="<i class='fa fa-minus'></i>&nbsp; &nbsp; Show fewer properties";	
		
		
	$('#datatable tr > *:nth-child(n+10)').show();
	$('#datatable tr > *:nth-child(2)').show();
	
	// The code below is necessary to override the automatic size of the table with 15 columns, which is cramped 
	var width_vector_extended = [];
	width_vector_extended = [150,180,120,190,140,116,175,175,200,190,190,150,120,150,200];
	
	for (var i = 0; i <= 15; i++) {
		document.getElementById('datatable').rows[0].cells[i].style.width = width_vector_extended[i]+"px";
	}
	
}
	else {
	document.getElementById("advanced_options").style.display = "none";
	document.getElementById("advanced_options_button2").value = "show_more";
	document.getElementById("advanced_options_button2").innerHTML="Show more &nbsp;<i class='fa fa-angle-double-right'></i>";
		
	document.getElementById("advanced_options_button").value = "show_more";
	document.getElementById("advanced_options_button").innerHTML="<i class='fa fa-plus'></i>&nbsp; &nbsp; Show more properties";
		
	$('#datatable tr > *:nth-child(n+10)').hide();
	$('#datatable tr > *:nth-child(2)').hide();
	}
	

}

function fullScreen() {

	var index;
		index = document.getElementById("fullscreen").value;
	
	var element = document.getElementById("divforfullscreen");
	
		if (index == "fullscreen") {
			document.getElementById("fullscreen").innerHTML ='<i class="fas fa-compress"></i>';
			document.getElementById("fullscreen").value = "halfscreen";
			element.classList.add("divforfullscreen");
			document.getElementById("datatable_window").style.height="95vh";
		}
	
		else {
			document.getElementById("fullscreen").innerHTML ='<i class="fas fa-expand"></i>';
			document.getElementById("fullscreen").value = "fullscreen";
			element.classList.remove("divforfullscreen");
	
		}
	}

// Function to change the value of the pressed buttons on the show/hide columns modal
function count_pressed(id) {
	var n;
	// Convert the id from a string to an integer.
	n = parseInt(document.getElementById(id).value);
	var m =  (n+1)%2;
	document.getElementById(id).value = m;
}

// Function to hide / show the columns as requested
function column_toggle() {
	var Properties = [];
	var i, id, size;
	var selected = [0];
	
	Properties = ['mineral', 'formula','colour','compc','birefl','ani', 'relh','habit','nf', 'assoc', 'IR', 'refl','hardness','csys','notes'];
	var len = Properties.length;	 
	for (i = 1; i <= len; i++) {
		id = Properties[i].concat('_button_pressed');
		selected[i] = $('#'+id).attr("value");
		size = size + selected[i];
		// For some unknown reason, the hiding requires the dummy variable i+1 and not the variable i ?
		if (selected[i] == 0) {
			$('#datatable td:nth-child('+(i+1)+'),th:nth-child('+(i+1)+')').hide();
		}
		else if (selected[i] == 1) {
			$('#datatable td:nth-child('+(i+1)+'),th:nth-child('+(i+1)+')').show();
		}
	}
	if (size < 8) {
		$('#datatable').css('table-layout, auto');
	}

	

}

function column_toggle_reset() {

	
	// Show the first seven columns again, and hide the rest.
	$('#datatable td:nth-child(-n+9),th:nth-child(-n+9)').show();
	$('#datatable tr > *:nth-child(2)').show();
	
	
	$('#datatable tr > *:nth-child(n+10)').hide();
	$('#datatable tr > *:nth-child(2)').hide();
	
	Properties = ['mineral', 'formula','colour','compc','birefl','ani', 'relh','habit','nf', 'assoc', 'IR', 'refl','hardness','csys','notes'];
	
	for (i=1; i<=Properties.length;i++) {
		id = Properties[i].concat('_button_pressed');
		document.getElementById(id).value = 0;
		$('#'+id).attr("class", 'btn btn-light');
	}

		//document.getElementById("group_button_pressed").setAttribute("aria-pressed", "false");
//	$("#group_button_pressed").attr("class", "btn btn-light")
//	$("#group_button_pressed").attr("aria-pressed", 'false');
	
	
	
	
}
		

	





//Back to Top Button ///
//Get the button:
topscroll = document.getElementById("topscroll");

// When the user scrolls down 140px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
    topscroll.style.display = "block";
  } else {
    topscroll.style.display = "none";
  }
}

// Function to expand / collapse the datatable
function datatable_resize(object) {
	var chevronup = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-bar-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z"/></svg>';
	
	var chevrondown = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-bar-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.646 4.146a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zM1 11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/></svg>';
	
	// Collect current height of the datatable
	var height = $("#"+object).css("height") ;
	height = height.replace("px","");
	height = Math.round(height);
	// Calculate height of 90vh in pixels
	var large_view = Math.round(window.innerHeight*(8/10));
	
	// If the height of the datatable is currently 90vh, toggle to 20vh
	if (height == large_view){
		$("#"+object).css("height","20vh");
		document.getElementById("suggested_chevron").innerHTML = chevrondown;
	}
	else {
		$("#"+object).css("height","80vh");
		document.getElementById("suggested_chevron").innerHTML = chevronup;
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

	
// Sum function
function summ(total,entry) {
	return total + entry;
}