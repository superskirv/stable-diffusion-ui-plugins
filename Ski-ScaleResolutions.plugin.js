// ==UserScript==
// @name         ScaleResolutions
// @version      0.4
// @description  Show only approximate resolutions for set scale.
// @author       Super.Skirv
// ==/UserScript==

(function () {
  console.log("Loading ScaleResolutions 0.1");

  //Comment out which ones you dont want to run.
  all_Resolutions(); //Will override current resolutions
  //--!!--
  //Edit settings starting on Line 50 to change scaled pairs
  //--!!--
  custom_scaled_Resolutions(); //Will Append to list of current resolutions.

  //In the future you will be able to change the settings in this list. But I havent figured it out yet.
  //For now you need to edit these in the function manually.
  //custom_scaled_Resolutions('width',2048,1.25,0.03);

  //DO NOT EDIT BELOW UNLESS DIRECTED.

  function all_Resolutions(side, size, scale, closeness) {
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
    document.getElementById('width').innerHTML = options;
    document.getElementById('height').innerHTML = options;
  }
  function custom_scaled_Resolutions() {
	  //This will Append Resolutions for the given side to the drop down box.

    //At some point I need to figure out how to add a button to the GUI and have these option pop up in a special menu.

    // side, size, scale, closeness
    // 'width',2048,1.25,0.03

    //----------------------EDIT THESE TO CHANGE THE SCALED PAIRS--------
    //'width' = Wide Images, or 'height' = Tall Images
    var side = 'width';
    //Max Size of the side Picked.
    var size = 2048 //Will be automatically rounded to nearest 64
    //Ratio Fraction Big/Small, or Selected Side/Other Side
    var size_ratio = 1.777
    //Close Enough factor in percent, 0=disabled, Default = 0.03
    var closeness = 0.03
    //----------------------STOP EDITING BELOW THIS LINE!----------------

    //console.log("LOG INITIAL: size: ",size);
    //This should force incorrect numbers to be a multiple of the closest 64 set.
    if (size % 64 != 0) {
      //If remaining numbers are greater than zero, fix it.
      if(size % 64 >= 32){
        //if More than 32 over a multiple of 64, find and add the remaining
        size += 64-(size % 64);
        //console.log("LOG CHANGE: size up: ",size);
      } else {
        //if Less than 32 over a multiple of 64, subtract the remaining
        size -= size % 64;
        //console.log("LOG CHANGE: size down: ",size);
      }

    }
    var options_w="";
    var options_h="";
    var start = 2
    var end = size/64
    var max = end*end
    //console.log("LOG: START/STOP/loops: ", start, end, max);
    //Used to help user pair up compatible resolutions
    var pair = 1;
      var last = 1;
    var now = 1;
    var num_loops = 0;
    //finds all compatible'ish resolutions for given side, equal to or below size given.
    if(side == 'width') {
      for(let i=start; i<=end; i++) {
        //console.log("Log A: Now Loop: (i/j) ", i*64, j*64, num_loops);
        if(num_loops > max){ break; } //prevents infinity loops
        for(let j=start; j<=end; j++) {
          num_loops++;
          //console.log("Log B: Now Loop: (i/j) ", i*64, j*64, num_loops);
          if(num_loops > max){ break; } //prevents infinity loops
          //Speeding up search
          now = (((i*64) / (j*64)) / size_ratio);
          //console.log("Log: Test: (now/last) ", now, last);
          //Reduces the number of smaller resolution pairs. (i + J, or 8+8= 512x512 image size, 7+9 = 448x576, etc...)
          if( i + j >= 16) {
            if ( now >= (1-closeness) ) {
                //console.log("Log: Success1: (now/closeness) ", now, 1-closeness);
              if( now <= (1+closeness) ) {
                //console.log("Log: Success2: (now/closeness) ", now, 1+closeness);
                options_w += '<option value="' + (64*i) + '">-Pair ' + pair + "-" + (64*i) + '-</option>';
                options_h += '<option value="' + (64*j) + '">-Pair ' + pair + "-" + (64*j) + '-</option>';
                pair++;
              } else {
                //console.log("Log: Failed2: (now/closeness) ", now, 1+closeness);
              }
            } else {
              //console.log("Log: Failed1: (now/closeness) ", now, 1-closeness);
            }
            last = now;
          }
        }
      }
    }
    if(side == 'height') {
       //This does the math for the opposite, might be redundant... still testing... probably.
      for(var i=start; i<=end; i++) {
        //console.log("Log A: Now Loop: (i/j) ", i, j, num_loops);
        if(num_loops > max){ break; } //prevents infinity loops
        for(var j=start; j<=end; j++) {
          for(let j=start; j<=end; j++) {
            num_loops++;
            //console.log("Log B: Now Loop: (i/j) ", i*64, j*64, num_loops);
            if(num_loops > max){ break; } //prevents infinity loops
            //Speeding up search
            now = (((i*64) / (j*64)) / size_ratio);
            //console.log("Log: Test: (now/last) ", now, last);
            //Reduces the number of smaller resolution pairs.
            if( i + j >= 16) {
              if ( now >= (1-closeness) ) {
                  //console.log("Log: Success1: (now/closeness) ", now, 1-closeness);
                if( now <= (1+closeness) ) {
                  //console.log("Log: Success2: (now/closeness) ", now, 1+closeness);
                  options_w += '<option value="' + (64*i) + '">-Pair ' + pair + "-" + (64*i) + '-</option>';
                  options_h += '<option value="' + (64*j) + '">-Pair ' + pair + "-" + (64*j) + '-</option>';
                  pair++;
                } else {
                  //console.log("Log: Failed2: (now/closeness) ", now, 1+closeness);
                }
              } else {
                //console.log("Log: Failed1: (now/closeness) ", now, 1-closeness);
              }
              last = now;
            }
          }
        }
      }
    }
    if(pair == 1) {
      options_w += '<option value="128">-Plugin Failed w-</option>';
      options_h += '<option value="128">-Plugin Failed h-</option>';
    }
	  //Reference only... need to delete...
    document.getElementById('width').innerHTML += options_w;
    document.getElementById('height').innerHTML += options_h;
  }
})();
