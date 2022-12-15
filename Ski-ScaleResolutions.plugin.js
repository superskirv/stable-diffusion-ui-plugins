// ==UserScript==
// @name         ScaleResolutions
// @version      0.7a
// @description  Show only approximate resolutions for set scale.
// @author       Super.Skirv
// ==/UserScript==

(function () {
  //Comment out which ones you dont want to run.

  // all_Resolutions( Mode, Max Resolution, Min );
  all_Resolutions('override',2048,256); //Adds all combinations of resolutions in increments of 64.
  // custom_scaled_resolutions( Mode, Max Size to match, Ratio(side divided by side), closeness percent, Min Size );
  custom_scaled_resolutions('append',2048,768/512,0.03,384);
  // All options are optional. You can run as many times as you want with different setting.

  //---------------------------DO NOT EDIT BELOW------------------------------

  //Notes:
  //  MODE:
  //    This option will 'override' or 'append' results to the resolution list.
  //  MAX SIZE:
  //    This is the max size it will try to match for the given ratio.
  //  RATIO:
  //    You can type the resolution math into the ratio, or you can type the answer in.
  //    EX 1: 768/512 OR 3/2 OR 1.5  //Instead of typing 3:2 ratio, replace the ':' with a '/' making it 3/2
  //    EX 2: 512/768 OR 2/3 OR .666 //Why bother with the math if you know, you know type .666.
  //    EX 3: 512/512 OR 1/1 OR 1
  //  CLOSENESS:
  //    This is how close the resolution it found can be to the one you want.
  //    If Pair is exactly the same ratio, A '*' will appear before the Tag "Pair #"
  //    EX 1: .03 is within 3 percent, so for the ratio 1.5 it must be above 1.455 and below 1.545 (More Results)
  //    EX 2: 0 is ZERO. This will only match ratio's that are EXACTLY what you want. (Less results), None if you set min and max to restrictive.
  //  MIN SIZE:
  //    The Smallest number number for any side in pixels.
  //    If set correctly you can limit the results to just a few Pairs, which will make the drop down smaller.

  //---------------------------DO NOT EDIT BELOW------------------------------
  function all_Resolutions(mode = 'append', max = 2048, min = 128) {
    //This will 'override' or 'append' the Resolutions for the the drop down box.

    if(max < 512){ max = 512; } //force minimum size.
    if(min < 128){ min = 128; } //force minimum size.
    //Making sure size is a multiple of 64
    if (max % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(max % 64 >= 32) {
        //if 32 or over a multiple of 64, find and add the remaining
        max += 64-(max%64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        max -= max%64;
      }
    }
	  var end = max/64;

    //Making sure min is a multiple of 64
    if (min % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(min % 64 >= 32) {
        //if 32 or over a multiple of 64, find and add the remaining
        min += 64-(min%64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        min -= min%64;
      }
    }
    start = min/64

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
  function custom_scaled_resolutions( mode = 'append', max_size = 2048, size_ratio = 1.25, closeness = 0.03, min_size = 128) {
	  //This will Append Resolutions for the given side to the drop down box.

    //At some point I need to figure out how to add a button to the GUI and have these option pop up in a special menu.

    if(max_size < 512){ max_size = 512; } //force minimum size.
    if(min_size < 128){ min_size = 128; } //force minimum size.
    //This should force incorrect numbers to be a multiple of the closest 64 set.
    if (max_size % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(max_size % 64 >= 32) {
        //if 32 or over a multiple of 64, find and add the remaining
        max_size += 64-(max_size % 64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        max_size -= max_size % 64;
      }
    }

    //Making sure min is a multiple of 64
    if (min_size % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(min_size % 64 >= 32) {
        //if 32 or over a multiple of 64, find and add the remaining
        min_size += 64-(min_size%64);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        min_size -= min_size%64;
      }
    }

    var options_w=""; //The new width resolutions to add
    var options_h=""; //The new height resolutions to add
    var start = 2 //Used to start the loop
    var end = max_size/64 //Used to end the loop
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
        //Speeding up search, reducing math calcs
        now = (((i*64) / (j*64)) / size_ratio);
        //Must be higher than the minimum for any side.
        if( i >= min_size || j  >= min_size) {
          if ( now >= (1-closeness) ) {
            if( now <= (1+closeness) ) {
              if(now == 1) { //Exact Match
                options_w += '<option value="' + (64*i) + '">-*Pair ' + pair + "-" + (64*i) + '-</option>';
                options_h += '<option value="' + (64*j) + '">-*Pair ' + pair + "-" + (64*j) + '-</option>';
              } else { //Close Enough Match
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
      //Informs the Users that the plugin failed to find compatible Pairs with the current settings.
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
