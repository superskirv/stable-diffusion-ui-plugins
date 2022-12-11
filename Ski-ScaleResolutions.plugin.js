// ==UserScript==
// @name         ScaleResolutions
// @version      0.7a
// @description  Show only approximate resolutions for set scale.
// @author       Super.Skirv
// ==/UserScript==

(function () {
  //Comment out which ones you dont want to run.

  // all_Resolutions( Mode, Max Resolution );
  all_Resolutions('override',2048); //Adds all combinations of resolutions in increments of 64.
  // custom_scaled_Resolutions( Mode, Max Size to match, Ratio(side divided by side), closeness percent, Min Size );
  custom_scaled_Resolutions('append',2048,768/512,0.03);
  // All options are optional.

  //---------------------------DO NOT EDIT BELOW------------------------------

  //Notes:
  //  MODE:
  //    This option will 'override' or 'append' results to the resolution list.
  //  MAX SIZE:
  //    This is the max size it will try to match for the given ratio.
  //  RATIO:
  //    You can type the resolution math into the ratio, or you can type the answer in.
  //    EX 1: 768/512 OR 1.5
  //    EX 2: 512/768 OR .666
  //    EX 3: 512/512 OR 1
  //  CLOSENESS:
  //    This is how close the resolution it found can be to the one you want.
  //    If Pair is exactly the same ratio, A '*' will appear before the "Pair #"
  //    EX 1: .03 is within 3 percent, so for the ratio 1.5 it must be above 1.455 and below 1.545 (More Results)
  //    EX 2: 0 is ZERO. This will only match ratio's that are what you want. (Less results)
  //  MIN SIZE:
  //    The Smallest number of pixels to output a pair, reduces smaller resolution that match the ratio.
  //    Formula is SIDE PLUS SIDE EQUALS (MIN SIZE), 8+8=16, or (8*64) + (8*64) = (16*64), or 512 + 512 = 1024
  //    Ex 1: 16, will allow 448x576, or 384x640, or 704x320, if the pair matches the ratio.
  //    Ex 2: 8, will allow 256x256, or 128x384, or 192x320, if the pair matches the ratio.

  //---------------------------DO NOT EDIT BELOW------------------------------
  function all_Resolutions(mode = 'append', size = 2048) {
    //This will 'override' or 'append' the Resolutions for the the drop down box.
    if (size % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(size % 64 >= 32){
        //if More than 32 over a multiple of 64, find and add the remaining
        size += 64-(size%64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        size -= size%64;
      }
    }
	  //These numbers are multiplied by 64
    //Starts at 2 * 64 = 128
	  var start = 2
    //Ends at 32 * 64 = 2048 //36 * 64 = 2304
	  var end = size/64;

	  //Edit below at your own risk.
	  var options="";
	  for(var i=start; i<=end; i++) {
  		if(i%4 == 0 && i != 4) {
  			options += '<option value="' + (64*i) + '">*' + (64*i) + '*</option>';
  		} else {
		  	options += '<option value="' + (64*i) + '">' + (64*i) + '</option>';
	  	}
  	}
    if(mode == 'append') {
      document.getElementById('width').innerHTML += options;
      document.getElementById('height').innerHTML += options;
    } else {
      document.getElementById('width').innerHTML = options;
      document.getElementById('height').innerHTML = options;
    }
  }
  function custom_scaled_resolutions( mode = 'append', size = 2048, size_ratio = 1.25, closeness = 0.03, min_size = 15) {
	  //This will Append Resolutions for the given side to the drop down box.

    //At some point I need to figure out how to add a button to the GUI and have these option pop up in a special menu.

    //This should force incorrect numbers to be a multiple of the closest 64 set.
    if (size % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(size % 64 >= 32){
        //if More than 32 over a multiple of 64, find and add the remaining
        size += 64-(size % 64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        size -= size % 64;
      }
    }
    var options_w=""; //The new width resolutions to add
    var options_h=""; //The new height resolutions to add
    var start = 2 //Used to start the loop
    var end = size/64 //Used to end the loop
    var max = end*end //Used to Break the loops if it goes on to long.

    var pair = 1; //Used to help user pair up compatible resolutions
    var now = 1; //Used to reduce the math
    var num_loops = 0; //Current loop count
    //finds all compatible'ish resolutions for given ratio, equal to or below max size given.
    for(let i=start; i<=end; i++) {
      if(num_loops > max){ break; } //prevents infinity loops
      for(let j=start; j<=end; j++) {
        num_loops++;
        if(num_loops > max){ break; } //prevents infinity loops
        //Speeding up search
        now = (((i*64) / (j*64)) / size_ratio);
        //Reduces the number of smaller resolution pairs. (i + J, or 8+8= 512x512 image size, 7+9 = 448x576, etc...)
        if( i + j >= min_size) {
          if ( now >= (1-closeness) ) {
            if( now <= (1+closeness) ) {
              if(now == 1) {
                options_w += '<option value="' + (64*i) + '">-*Pair ' + pair + "-" + (64*i) + '-</option>';
                options_h += '<option value="' + (64*j) + '">-*Pair ' + pair + "-" + (64*j) + '-</option>';
              } else {
                options_w += '<option value="' + (64*i) + '">-Pair ' + pair + "-" + (64*i) + '-</option>';
                options_h += '<option value="' + (64*j) + '">-Pair ' + pair + "-" + (64*j) + '-</option>';
              }
              pair++;
            }
          }
        }
      }
    }
    //if(pair == 1) {
      //Informs the Users that the plugin failed to find compatible settings with the current settings.
      //options_w += '<option value="128">-Plugin Failed w-</option>';
      //options_h += '<option value="128">-Plugin Failed h-</option>';
    //}

    if(mode == 'override') {
      document.getElementById('width').innerHTML = options_w;
      document.getElementById('height').innerHTML = options_h;
    } else {
      document.getElementById('width').innerHTML += options_w;
      document.getElementById('height').innerHTML += options_h;
    }
  }
})();
