var engine = function() {
	var state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var turn = 0;
	var win = 0;
 	
 	// CSS FUNCTIONS
 	// =======================================================================
 	
 	var gameStatusMsg = function(msg) {
 		var currentCell = document.getElementById("statusMsg");
 		currentCell.innerHTML = msg;
 	}
 	
 	// change the text of the game cell.
 	var gameCellText = function(loc, value) {
 		var finalLoc = loc;
 		
 		// wrap a number into array if needed.
 		if (typeof loc === 'number') {
 			var finalLoc = [loc];
 		}
 		
 		for (var i=0 ; i<finalLoc.length ; i++) {
	 		var currentCell = document.getElementById("cell" + finalLoc[i] + "Btn");
	 		currentCell.innerHTML = value;
	 	}
 	};
 	
 	// change the game cell value.
 	// 5 values X, O, XW, OW, N
 	var gameCellFormat = function(loc, value) {
 		var finalLoc = loc;
 		
 		// wrap a number into array if needed.
 		if (typeof loc === 'number') {
 			var finalLoc = [loc];
 		}
 		
 		// update cells
 		for (var i=0 ; i<finalLoc.length ; i++) {
 			var currentCell = document.getElementById("cell" + finalLoc[i] + "Btn");
 		
	 		// check if its an X or O
	 		if (value === "X") {
	 			currentCell.className = "gameCellX";
	 		}
	 		else if (value === "O") {
	 			currentCell.className = "gameCellO";
	 		}
	 		if (value === "XWin") {
	 			currentCell.className = "gameCellXWin";
	 		}
	 		else if (value === "OWin") {
	 			currentCell.className = "gameCellOWin";
	 		}
	 		else if (value === "N") {
	 			currentCell.className = "gameCell";
	 		}	
 		}
 		
 	}
 	
 	// GAME FUNCTIONS
 	// =======================================================================
 	
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
 	};
 	
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
 	//
 	// also check the tie state
 	var winning = function() {
 		// check who's turn it is.
 		var cellValue = currentPlayerInt();
 		var winFlag = false;
 		var c1 = -1;
 		var c2 = -1;
 		var c3 = -1;
 		
 		// load win states.
 		var winStates =[ [0,1,2],
 						 [3,4,5],
 						 [6,7,8],
 						 [0,3,6],
 						 [1,4,7],
 						 [2,5,8],
 						 [0,4,8],
 						 [2,4,6] ];
 		
 		// cycle thru all of the win states
 		for(var i=0 ; i<winStates.length ; i++) {
 			c1 = winStates[i][0];
 			c2 = winStates[i][1];
 			c3 = winStates[i][2];
 			if(state[c1] === cellValue && state[c2] === cellValue && state[c3] === cellValue) {
 				win = cellValue;
 				gameCellFormat([c1, c2, c3], currentPlayerText() + "Win");
 				
 				// winner status message.
 				gameStatusMsg("Player " + currentPlayerText() + " wins !!!. Press reset to play another game.");
 				con.println(currentPlayerText() + " is the winner");
 				
 				break;
 			}
	 	}
	 	
	 	// check for tie
	 	con.println("winning " + turn);
	 	if(turn === 8) {
	 		gameStatusMsg("Tie game. Press reset to start another game.");
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
				
				// update buttons text.
				gameCellText(value, currentPlayerText());
				gameCellFormat(value, currentPlayerText());
				con.println(currentPlayerText() + " " + turn);
				
				// increment turn;
				// do this before chekcing for the win state.
				turn++;
				
				/// check to see if you are the winner
				winning();
				
				// prompt for next players turn.
				if (win === 0) {
					gameStatusMsg("Its your turn, player " + currentPlayerText());
				}
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
			
			// reset all of the cells.
			gameCellFormat([0,1,2,3,4,5,6,7,8], "N");
			gameCellText([0,1,2,3,4,5,6,7,8], "-");
			
			// update status message
			gameStatusMsg("Game is reset. X player starts.");
		}
	};
	
	/*
	 * lets assume x starts.
	 * 
	 * need the state of things 
	 */
}();