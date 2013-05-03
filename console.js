/*
	a simple console function that writes to a text box.
	assumes that there is a text box has an id='console'
	using a object literal. sorta like a class.
	
	there are 2 functions. println has a newline added to the end
	print
	println
*/
var con = function () {
	var console = document.getElementById('console');
	console.value = "";
	
	return {
		print: function(textOutput) {
			console.value += textOutput;
		},
		println: function(textOutput) {
			console.value += textOutput + "\n";
		}
	};
}();	