// ==UserScript==
// @name         ScaleResolutions
// @version      0.4
// @description  Show only approximate resolutions for set scale.
// @author       Super.Skirv
// ==/UserScript==

(function () {
  //Comment out which ones you dont want to run.
  all_Resolutions('append'); //Will override or append current resolutions in lists
  // custom_scaled_Resolutions( Type of images, Max Size to match, Ratio(big side divided by little side), closeness percent );
  custom_scaled_Resolutions('wide',2048,1.25,0.03); //Will Append to list of current resolutions.
  //'wide' images, or 'tall' images
  //DO NOT EDIT BELOW

  function all_Resolutions(mode) {
    //This will Override the Resolutions for the the drop down box.

	  //These numbers are multiplied by 64
    //Starts at 2 * 64 = 128
	  var start = 2
    //Ends at 32 * 64 = 2048 //36 * 64 = 2304
	  var end = 36

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
  function custom_scaled_Resolutions(side='width', size=2048, size_ratio=1.25, closeness=0.03) {
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
    //finds all compatible'ish resolutions for given side, equal to or below size given.
    if(side == 'wide') {
      for(let i=start; i<=end; i++) {
        if(num_loops > max){ break; } //prevents infinity loops
        for(let j=start; j<=end; j++) {
          num_loops++;
          if(num_loops > max){ break; } //prevents infinity loops
          //Speeding up search
          now = (((i*64) / (j*64)) / size_ratio);
          //Reduces the number of smaller resolution pairs. (i + J, or 8+8= 512x512 image size, 7+9 = 448x576, etc...)
          if( i + j >= 14) {
            if ( now >= (1-closeness) ) {
              if( now <= (1+closeness) ) {
                options_w += '<option value="' + (64*i) + '">-Pair ' + pair + "-" + (64*i) + '-</option>';
                options_h += '<option value="' + (64*j) + '">-Pair ' + pair + "-" + (64*j) + '-</option>';
                pair++;
              }
            }
          }
        }
      }
    }
    if(side == 'tall') {
       //This does the math for the opposite, might be redundant... still testing... probably.
      for(var i=start; i<=end; i++) {
        if(num_loops > max){ break; } //prevents infinity loops
        for(var j=start; j<=end; j++) {
          for(let j=start; j<=end; j++) {
            num_loops++;
            if(num_loops > max){ break; } //prevents infinity loops
            //Speeding up search
            now = (((i*64) / (j*64)) / size_ratio);
            //Reduces the number of smaller resolution pairs.
            if( i + j >= 14) {
              if ( now >= (1-closeness) ) {
                if( now <= (1+closeness) ) {
                  options_w += '<option value="' + (64*i) + '">-Pair ' + pair + "-" + (64*i) + '-</option>';
                  options_h += '<option value="' + (64*j) + '">-Pair ' + pair + "-" + (64*j) + '-</option>';
                  pair++;
                }
              }
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

    document.getElementById('width').innerHTML += options_w;
    document.getElementById('height').innerHTML += options_h;
  }
})();
