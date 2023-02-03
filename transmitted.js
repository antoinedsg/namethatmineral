

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


// Tooltips with the pictures of each mineral //

function load_videoP(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/transmitted_pics/" + mineral_id + "_P.mp4";

	document.getElementById(mineral_id).children[0].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';

var a = document.getElementById(mineral_id).children[0];
a.removeAttribute("onmouseover");
}

function load_videoX(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/transmitted_pics/" + mineral_id + "_X.mp4";

document.getElementById(mineral_id).children[1].children[1].children[0].innerHTML =  ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';
var a = document.getElementById(mineral_id).children[1];
a.removeAttribute("onmouseover");

}

function load_videoX_p3(elem) {
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/transmitted_pics/" + mineral_id + "_X.mp4";

document.getElementById(mineral_id).children[2].children[1].children[0].innerHTML =  ' <figure><a href="' + pathway + '" target="_blank"><video autoplay loop muted playsinline><source src="' + pathway + '" type="video/mp4"/></video></figure>';
var a = document.getElementById(mineral_id).children[2];
a.removeAttribute("onmouseover");

}

function PPL_image(elem){
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/transmitted_pics/" + mineral_id + "_P.jpg";

document.getElementById(mineral_id).children[0].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"> <img src="' + pathway + '" alt="No image yet" class="tooltip_image"/></a></figure>';

var a = document.getElementById(mineral_id).children[0];
a.removeAttribute("onmouseover");
}

function XPL_image(elem){
	var pathway;
	var mineral_id;

	mineral_id = elem.parentNode.id
	pathway = "https://www.namethatmineral.com/transmitted_pics/" + mineral_id + "_X.jpg";

document.getElementById(mineral_id).children[1].children[1].children[0].innerHTML = ' <figure><a href="' + pathway + '" target="_blank"> <img src="' + pathway + '" alt="No image yet" class="tooltip_image"/></a></figure>';

var a = document.getElementById(mineral_id).children[1];
a.removeAttribute("onmouseover");

}





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

//Mineral Search box
function mineralsearch() {
	var input, filter, table, tr, i, txtValue
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


//Main Searching Function //
//Main Searching Function //
//Main Searching Function //

// Function to check if mineral belongs to wings of selected property
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

// Table Search Script //
function choicedropdown() {

// Clear the suggested minerals list
document.getElementById("suggested_datatable").innerHTML = "";

// We recover the criteria selections from the HTML file. The variable x is the whole selection table, so we cannot immediately convert to string. We need to recover the "selected" index
// Recover the selection choice from transmitted.html
	var color = document.getElementById("Colour");  
	var biref = document.getElementById("Birefringence");  
	var relief = document.getElementById("Relief");  
	var df = document.getElementById("dfeatures");  
	var cleavage = document.getElementById("Cleavage");
	var ext = document.getElementById("Extinction"); 
	
	var habit = document.getElementById("Habit");  
	var twoV = document.getElementById("2V");  
	var twoVS = document.getElementById("2VSign");  
	var assoc = document.getElementById("Assoc");  
	var rtype = document.getElementById("RockType");  
	var group = document.getElementById("Group");  

	// Function to define the wings of each property
	// WARNING: for the suggested mineral strength colours to work correctly, each x_wings[n] must
	// begin with the first entry being [x.option[n].value...].
	function define_wings() {
		var mineral_wings = [];
		var df_wings= [];
		var ext_wings= [];
		var habit_wings= [];
		var twoVS_wings= [];
		var assoc_wings= [];
		var group_wings= [];

		// Colour wings
		var color_wings = [];
		color_wings[1] = [color.options[1].value.toUpperCase()];
		color_wings[2] = [color.options[2].value.toUpperCase()];
		color_wings[3] = [color.options[3].value.toUpperCase()];
		color_wings[4] = [color.options[4].value.toUpperCase(),color.options[5].value.toUpperCase()];
		color_wings[5] = [color.options[5].value.toUpperCase(),color.options[4].value.toUpperCase()];
		color_wings[6] = [color.options[6].value.toUpperCase(),color.options[7].value.toUpperCase(),color.options[8].value.toUpperCase(),color.options[9].value.toUpperCase()];
		color_wings[7] = [color.options[7].value.toUpperCase(),color.options[6].value.toUpperCase(),color.options[8].value.toUpperCase(),color.options[9].value.toUpperCase()];
		color_wings[8] = [color.options[8].value.toUpperCase(),color.options[7].value.toUpperCase(),color.options[6].value.toUpperCase(),color.options[9].value.toUpperCase()];
		color_wings[9] = [color.options[9].value.toUpperCase(),color.options[7].value.toUpperCase(),color.options[8].value.toUpperCase(),color.options[6].value.toUpperCase()];
		color_wings[10] = [color.options[10].value.toUpperCase(),color.options[11].value.toUpperCase()];
		color_wings[11] = [color.options[11].value.toUpperCase(),color.options[10].value.toUpperCase()];
		
		// Birefringence wings
		var biref_wings = [];
		biref_wings[1] = [biref.options[1].value.toUpperCase()];
		biref_wings[2] = [biref.options[2].value.toUpperCase()];
		biref_wings[3] = [biref.options[3].value.toUpperCase(), biref.options[4].value.toUpperCase()];
		biref_wings[4] = [biref.options[4].value.toUpperCase(), biref.options[3].value.toUpperCase(), biref.options[5].value.toUpperCase()];
		biref_wings[5] = [biref.options[5].value.toUpperCase(), biref.options[4].value.toUpperCase(), biref.options[6].value.toUpperCase()];
		biref_wings[6] = [biref.options[6].value.toUpperCase(), biref.options[5].value.toUpperCase(), biref.options[7].value.toUpperCase()];
		biref_wings[7] = [biref.options[7].value.toUpperCase(), biref.options[6].value.toUpperCase()];					  
		// Relief wings
		var relief_wings= [];
		relief_wings[1] = [relief.options[1].value.toUpperCase()];
		relief_wings[2] = [relief.options[2].value.toUpperCase()];
		relief_wings[3] = [relief.options[3].value.toUpperCase(), relief.options[4].value.toUpperCase()];
		relief_wings[4] = [relief.options[4].value.toUpperCase(), relief.options[3].value.toUpperCase(), relief.options[5].value.toUpperCase()];
		relief_wings[5] = [relief.options[5].value.toUpperCase(), relief.options[4].value.toUpperCase(), relief.options[6].value.toUpperCase()];
		relief_wings[6] = [relief.options[6].value.toUpperCase(), relief.options[5].value.toUpperCase()];

		// 2V angle wings
		var twoV_wings= [];
		twoV_wings[1] = [twoV.options[1].value.toUpperCase()];
		twoV_wings[2] = [twoV.options[2].value.toUpperCase(), twoV.options[3].value.toUpperCase()];
		twoV_wings[3] = [twoV.options[3].value.toUpperCase(), twoV.options[2].value.toUpperCase(), twoV.options[4].value.toUpperCase()];
		twoV_wings[4] = [twoV.options[4].value.toUpperCase(), twoV.options[3].value.toUpperCase()];

		// Cleavage wings
		var cleavage_wings= [];
		cleavage_wings[1] = [cleavage.options[1].value.toUpperCase()];
		cleavage_wings[2] = [cleavage.options[2].value.toUpperCase(), cleavage.options[5].value.toUpperCase(), cleavage.options[6].value.toUpperCase()];
		cleavage_wings[3] = [cleavage.options[3].value.toUpperCase(), cleavage.options[4].value.toUpperCase(), cleavage.options[5].value.toUpperCase(), cleavage.options[6].value.toUpperCase()];
		cleavage_wings[4] = [cleavage.options[4].value.toUpperCase(), cleavage.options[3].value.toUpperCase(), cleavage.options[5].value.toUpperCase(), cleavage.options[6].value.toUpperCase()];
		cleavage_wings[5] = [cleavage.options[5].value.toUpperCase(), cleavage.options[3].value.toUpperCase(), cleavage.options[4].value.toUpperCase()];
		cleavage_wings[6] = [cleavage.options[6].value.toUpperCase(), cleavage.options[3].value.toUpperCase(), cleavage.options[4].value.toUpperCase()];

		// Rock type wings
		var rtype_wings = [];
		rtype_wings[1] = [rtype.options[1].value.toUpperCase(), rtype.options[4].value.toUpperCase()];
		rtype_wings[2] = [rtype.options[2].value.toUpperCase()];
		rtype_wings[3] = [rtype.options[3].value.toUpperCase()];
		rtype_wings[4] = [rtype.options[4].value.toUpperCase(), rtype.options[1].value.toUpperCase()];

		// Define wings vector to be the collection of all wings, for all properties

		var wings = [mineral_wings, color_wings, biref_wings, relief_wings, df_wings, cleavage_wings, ext_wings, habit_wings, twoV_wings, twoVS_wings, rtype_wings, assoc_wings, group_wings]; 
		return wings;
	}
	
	// Assignment of the selected indices into an array called "index"
	var index = [];
	index[1] = color.selectedIndex;
	index[2] = biref.selectedIndex;
	index[3] = relief.selectedIndex;
	index[4] = df.selectedIndex;
	index[5] = cleavage.selectedIndex;
	index[6] = ext.selectedIndex;
	
	index[7] = habit.selectedIndex;
	index[8] = twoV.selectedIndex;
	index[9] = twoVS.selectedIndex;
	index[10] = rtype.selectedIndex;
	index[11] = assoc.selectedIndex;	
	index[12] = group.selectedIndex;

  
	// Recovery of the selected text into an array called "choice". Notice that this recovers the text
	// displayed in the dropdown; it is not the same as the "value" of the option selected (by default
	// they are the same though) 
	var choice = [];
	choice[1] = color.options[index[1]].value.toUpperCase();
	choice[2] = biref.options[index[2]].value.toUpperCase();
	choice[3] = relief.options[index[3]].text.toUpperCase();
	choice[4] = df.options[index[4]].value.toUpperCase();
	choice[5] = cleavage.options[index[5]].text.toUpperCase();
	choice[6] = ext.options[index[6]].text.toUpperCase();
	
	choice[7] = habit.options[index[7]].value.toUpperCase();
	choice[8] = twoV.options[index[8]].value.toUpperCase();
	choice[9] = twoVS.options[index[9]].text.toUpperCase();
	choice[10] = rtype.options[index[10]].value.toUpperCase();
	choice[11] = assoc.options[index[11]].text.toUpperCase();
	choice[12] = group.options[index[12]].text.toUpperCase();


	
	var table, tc_length, tr_length;
	table = document.getElementById("datatable");
  
 // Find number of rows and the number of columns in the table
	tr_length = table.rows.length;
	tc_length = table.rows[0].cells.length;

// Add a JQuery piece of code for more efficient table hiding
	var $rows = $("#datatable tr");


	
  // Loop to make sure that the initial options "Pick X" do not affect the table
	var i;
	for (i=0;i<tc_length;i++){
		if (index[i] == 0) {choice[i] = "";}
	}


// Code for hiding and showing rows of the table
	n=0;
	var txtValue = [];

// Variable to store the minerals which will be on display (they will then not be displayed in the wings)
	var matching_minerals = [];
	var j;
  	for (i = 1; i <= tr_length-1; i++) {
  		for (j=0; j < tc_length; j++) {
  			// Assignment of the cells j in each row i
  			txtValue[j] = table.rows[i].cells[j].innerHTML;
		}
    	if (txtValue[1].toUpperCase().indexOf(choice[1]) > -1
   		&& txtValue[2].toUpperCase().indexOf(choice[2]) > -1 
		&& txtValue[3].toUpperCase().indexOf(choice[3]) > -1 	
		&& txtValue[4].toUpperCase().indexOf(choice[4]) > -1 
		&& txtValue[5].toUpperCase().indexOf(choice[5]) > -1  
		&& txtValue[6].toUpperCase().indexOf(choice[6]) > -1 
		&& txtValue[7].toUpperCase().indexOf(choice[7]) > -1  
		&& txtValue[8].toUpperCase().indexOf(choice[8]) > -1
		&& txtValue[9].toUpperCase().indexOf(choice[9]) > -1 
		&& txtValue[10].toUpperCase().indexOf(choice[10]) > -1   
		&& txtValue[11].toUpperCase().indexOf(choice[11]) > -1
		&& txtValue[12].toUpperCase().indexOf(choice[12]) > -1 ){
    	// if statement to show / hide the entries in the datatable
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
		if (index[1]==0 && index[2]==0 && index[3]==0 && index[5]==0 && index[8]==0 && index[10] ==0 ) {
			document.getElementById("suggested_datatable").innerHTML = "Our database does not have any suggested minerals beyond the minerals which match your search exactly..";
			
			document.getElementById("suggested_minerals").style.display = "";
			document.getElementById("suggested_toggle").style.display = "";
		}
		// if statement to check the wings
		else if (matching_minerals.indexOf(txtValue[0]) < 0
		&& determine_wings(1,txtValue[1].toUpperCase(),index[1],wings,suggestion_strength)
		&& determine_wings(2,txtValue[2].toUpperCase(),index[2],wings,suggestion_strength)
		&& determine_wings(3,txtValue[3].toUpperCase(),index[3],wings,suggestion_strength)		
		&& txtValue[4].toUpperCase().indexOf(choice[4]) > -1 
		&& determine_wings(5,txtValue[5].toUpperCase(),index[5],wings,suggestion_strength) 
		&& txtValue[6].toUpperCase().indexOf(choice[6]) > -1 
		&& txtValue[7].toUpperCase().indexOf(choice[7]) > -1 
		&& determine_wings(8,txtValue[8].toUpperCase(),index[8],wings,suggestion_strength)
		&& txtValue[9].toUpperCase().indexOf(choice[9]) > -1 
		&& determine_wings(10,txtValue[10].toUpperCase(),index[10],wings,suggestion_strength)   
		&& txtValue[11].toUpperCase().indexOf(choice[11]) > -1
		&& txtValue[12].toUpperCase().indexOf(choice[12]) > -1 ){
		document.getElementById("suggested_minerals").style.display = "";
		
		document.getElementById("suggested_toggle").style.display = "";
			
		// Calculate the strength of the suggestion (number from 0 to 5)	
		var number = suggestion_strength.reduce(summ);
		var suggestion_colour;
			
			
		if (number == 5) {
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

// Set dropdown colours onchange 
function colouring(){

		if(index[1]> 0){color.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {color.style.backgroundColor = 'white';}
		
		if(index[2]> 0){biref.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {biref.style.backgroundColor = 'white';}
		
		if(index[3]> 0){relief.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {relief.style.backgroundColor = 'white';}
		
		if(index[4]> 0){df.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {df.style.backgroundColor = 'white';}

		if(index[5]> 0){cleavage.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {cleavage.style.backgroundColor = 'white';}

		if(index[6]> 0){ext.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {ext.style.backgroundColor = 'white';}

		if(index[7]> 0){habit.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {habit.style.backgroundColor = 'white';}

		if(index[8]> 0){twoV.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {twoV.style.backgroundColor = 'white';}

		if(index[9]> 0){twoVS.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {twoVS.style.backgroundColor = 'white';}

		if(index[10]> 0){rtype.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {rtype.style.backgroundColor = 'white';}

		if(index[11]> 0){assoc.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {assoc.style.backgroundColor = 'white';}

		if(index[12]> 0){group.style.backgroundColor = 'rgba(36,79,117,0.20)';}
		else {group.style.backgroundColor = 'white';}
		
}
	
//Matching Minerals
function matches(){
// Short code which displays the number of minerals which satisfy the selected criteria. Includes warning if criteria return no results
	var total, total_match;
	total = tr_length-1;
	total_match = total - n;
	if (total_match == 1) {
		document.getElementById("matching_minerals").innerHTML = "List of matching minerals &mdash; " + total_match + " match";
	}
	else if (total_match==0) {
		document.getElementById("matching_minerals").innerHTML = "List of matching minerals &ndash; No matches";
	}
		
	else if (total_match == total) {
		document.getElementById("matching_minerals").innerHTML = "Mineral properties";
	}
		
	else {
		document.getElementById("matching_minerals").innerHTML = "List of matching minerals &ndash; " + total_match + " matches";
	}	
}	

colouring();
matches();

}
//End of choicedropdown



//Dashboard Area//
//Dashboard Area//
//Dashboard Area//


// Reset button to clear selected options and reset table to default position
function reset_options() {
    document.getElementById("mineral_search").value = "";
	
	document.getElementById("suggested_datatable").innerHTML = "";
	document.getElementById("suggested_minerals").style.display = "none";
	
	document.getElementById("suggested_toggle").style.display = "none";
	
    value = [];
	value[1] = document.getElementById("Colour");
	value[2] = document.getElementById("Birefringence");
	value[3] = document.getElementById("Relief");
	value[4] = document.getElementById("dfeatures");
	value[5] = document.getElementById("Cleavage");
	value[6] = document.getElementById("Extinction");
	value[7] = document.getElementById("Habit");
	value[8] = document.getElementById("2V");
	value[9] = document.getElementById("2VSign");
	value[10] = document.getElementById("Assoc");
	value[11] = document.getElementById("RockType");
	value[12] = document.getElementById("Group");
	
		for (i = 1; i <13; i++){
		value[i].selectedIndex = 0;
	}
	
	for (i = 1; i <13; i++){
		value[i].style.backgroundColor = 'white';
	}
	choicedropdown();
// 	loadDoc();
	document.getElementById("matching_minerals").innerHTML = 'Mineral properties <button onclick="advanced_options_toggle2()" id="advanced_options_button2" class="btn" value="show_more">Show more &nbsp;<i class="fa fa-angle-double-right"></i></button>';
	$('#datatable_window').css("height","80vh");

}

function advanced_options_toggle() {
	var index;
	index = document.getElementById("advanced_options_button").value;

	if (index == "show_more") {
		document.getElementById("advanced_options").style.display = "";
		document.getElementById("advanced_options_button").value = "show_fewer";
		document.getElementById("advanced_options_button").innerHTML ="<i class='fa fa-minus'></i>&nbsp; &nbsp; Show fewer properties";
		$('#datatable tr > *:nth-child(n+8)').show();
		
	document.getElementById("advanced_options_button2").value = "show_fewer";
	document.getElementById("advanced_options_button2").innerHTML ="Hide again &nbsp;<i class='fa fa-angle-double-left'></i>";
		
	/*
		// The code below is necessary to override the automatic size of the table with 12 columns, which is cramped 
		var width_vector_extended = [];
		width_vector_extended = [125,135,140,103,200,116,110,135,110,125,125,185,152,160 ];
		// var width_vector = [];
		for (var i = 0; i <= 13; i++) {
			document.getElementById('datatable').rows[0].cells[i].style.width = width_vector_extended[i]+"px";
		} */
	}

	else {
		document.getElementById("advanced_options").style.display = "none";
		document.getElementById("advanced_options_button").value = "show_more";
		document.getElementById("advanced_options_button").innerHTML="<i class='fa fa-plus'></i>&nbsp; &nbsp; Show more properties";
		document.getElementById("advanced_options_button2").value = "show_more";
		document.getElementById("advanced_options_button2").innerHTML="Show more &nbsp;<i class='fa fa-angle-double-right'></i>";
		
		$('#datatable tr > *:nth-child(n+8)').hide();
	}
}

function advanced_options_toggle2() {
	var index2;
	index2 = document.getElementById("advanced_options_button2").value;	

	if (index2 == "show_more") {
		document.getElementById("advanced_options").style.display = "";
		document.getElementById("advanced_options_button2").value = "show_fewer";
		document.getElementById("advanced_options_button2").innerHTML ="Hide again &nbsp;<i class='fa fa-angle-double-left'></i>";
		document.getElementById("advanced_options_button").value = "show_fewer";
		document.getElementById("advanced_options_button").innerHTML ="<i class='fa fa-minus'></i>&nbsp; &nbsp; Show fewer properties";
		
		$('#datatable tr > *:nth-child(n+8)').show();
		
		
	/*
		// The code below is necessary to override the automatic size of the table with 12 columns, which is cramped 
		var width_vector_extended = [];
		width_vector_extended = [125,135,140,103,200,116,110,135,110,125,125,185,152,160 ];
		// var width_vector = [];
		for (var i = 0; i <= 13; i++) {
			document.getElementById('datatable').rows[0].cells[i].style.width = width_vector_extended[i]+"px";
		} */
	}

	else {
		document.getElementById("advanced_options").style.display = "none";
		document.getElementById("advanced_options_button2").value = "show_more";
		document.getElementById("advanced_options_button2").innerHTML="Show more &nbsp;<i class='fa fa-angle-double-right'></i>";
		document.getElementById("advanced_options_button").value = "show_more";
		document.getElementById("advanced_options_button").innerHTML="<i class='fa fa-plus'></i>&nbsp; &nbsp; Show more properties";
		
		$('#datatable tr > *:nth-child(n+8)').hide();
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
	
	Properties = ['mineral','colour','biref','relief','nf','cleavage','ext','habit','twoV','twoVS','rtype','assoc','group','csys'];
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
	var Properties = [];
	var i, id;

	
	// Show the first seven columns again, and hide the rest.
	$('#datatable td:nth-child(-n+7),th:nth-child(-n+7)').show();
	$('#datatable tr > *:nth-child(n+8)').hide();
	
	Properties = ['mineral','colour','biref','relief','nf','cleavage','ext','habit','twoV','twoVS','rtype','assoc','group', 'csys'];
	
	for (i=1; i<=Properties.length;i++) {
		id = Properties[i].concat('_button_pressed');
		document.getElementById(id).value = 0;
		$('#'+id).attr("class", 'btn btn-light');
	}
		

		//document.getElementById("group_button_pressed").setAttribute("aria-pressed", "false");
//	$("#group_button_pressed").attr("class", "btn btn-light")
//	$("#group_button_pressed").attr("aria-pressed", 'false');
	
	
	
	
}
		

	


//Suggested Minerals//
//Suggested Minerals//
//Suggested Minerals//

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



//Back to Top Button
//Back to Top Button
topscroll = document.getElementById("topscroll");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
		topscroll.style.display = "block";
	} 
	
	else {
		topscroll.style.display = "none";
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


