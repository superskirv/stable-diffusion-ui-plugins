// ==UserScript==
// @name         Ski-SDUI-MoreRes
// @version      0.3a
// @description  More Resolution Options
// @author       Super.Skirv, JeLuF
// ==/UserScript==

(function() {

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
})();
