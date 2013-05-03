var engine = function() {
	var eng = document.getElementById('toggle-1');
	var state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var turn = 0;
	var win = 0;
 	
 	// figures out the current player.
 	// either X or O. and returns the int.
 	// 1 for X
 	// 2 for O
 	var currentPlayerInt = function() {
 		var cellValue = 1;
 		if(turn % 2 == 1) {
 			cellValue = 2;
 		}
 		return cellValue;
 	}
 	
 	// returns if you are an X or O
 	var currentPlayerText = function() {
 		var cellText = "X";
 		if(turn % 2 == 1) {
 			cellText = "O";
 		}
 		return cellText;
 	}
 	
 	// game state
 	// checks to see if you have a win state.
 	// 3 states, 0, 1, 2, 3
 	// 0 = incomplete
 	// 1 = X wins
 	// 2 = O wins
 	var winning = function() {
 		// check who's turn it is.
 		var cellValue = currentPlayerInt();
 		
 		// horizontal
 		for(var i=0 ; i<3 ; i++) {
 			if(state[0 + 3*i] === cellValue && state[1 + 3*i] === cellValue && state[2 + 3*i] === cellValue) {
 				win = cellValue;
 				break;
 			}
 		}
 		// vertical
 		for(var i=0 ; i<3 ; i++) {
 			if(state[0 + i] === cellValue && state[3 + i] === cellValue && state[6 + i] === cellValue) {
 				win = cellValue;
 				break;
 			}
 		}
 		
 		// diagionals
 		if(state[0] === cellValue && state[4] === cellValue && state[8] === cellValue) {
			win = cellValue;
		}
		if(state[2] === cellValue && state[4] === cellValue && state[6] === cellValue) {
			win = cellValue;
		}
 	}
 		
	return {
		cellClick: function(value) {
			// check to see if cell
			// using 1 as x and 2 as y
			if (state[value] === 0 && win === 0) {
				// check to put a x or o
				// doing a mod check.
				var cellValue = currentPlayerInt();
				
				// update game state.
				state[value]=cellValue;
				
				// check to see if you are the winner
				winning();
				
				if(win !== 0) {
					con.println(currentPlayerText() + " is the winner");
				}
				
				// increment turn;
				turn++;
			}
			else {
				// con.println(state);
				// need to figure out how to do the CSS check.
			}
		},
		reset: function() {
			con.println("game reset.");
			state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			turn = 0;
			win = 0;
		}
	};
	
	/*
	 * lets assume x starts.
	 * 
	 * need the state of things 
	 */
}();