var engine = function() {
	var inState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var inTurn = 0;
	var inWinFlag = 0;
 	
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
 		if(inTurn % 2 == 1) {
 			cellValue = 2;
 		}
 		return cellValue;
 	};
 	
 	// returns if you are an X or O
 	var currentPlayerText = function() {
 		var cellText = "X";
 		if(inTurn % 2 == 1) {
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
 	var gameCheckWinning = function() {
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
 			if(inState[c1] === cellValue && inState[c2] === cellValue && inState[c3] === cellValue) {
 				inWinFlag = cellValue;
 				gameCellFormat([c1, c2, c3], currentPlayerText() + "Win");
 				
 				// winner status message.
 				gameStatusMsg("Player " + currentPlayerText() + " wins !!!. Press reset to play another game.");
 				con.println(currentPlayerText() + " is the winner");
 				
 				break;
 			}
	 	}
	 	
	 	// check for tie
	 	if(inTurn === 8) {
	 		gameStatusMsg("Tie game. Press reset to start another game.");
	 		inWinFlag = 3;
	 		con.println("winning " + inTurn);
	 	}
 	}
 		
	return {
		cellClick: function(value) {
			// check to see if cell
			// using 1 as x and 2 as y
			if (inState[value] === 0 && inWinFlag === 0) {
				// check to put a x or o
				// doing a mod check.
				var cellValue = currentPlayerInt();
				
				// update game state.
				inState[value]=cellValue;
				
				// update buttons text.
				gameCellText(value, currentPlayerText());
				gameCellFormat(value, currentPlayerText());
				con.println(currentPlayerText() + " " + inTurn);
				
				/// check to see if you are the winner
				gameCheckWinning();
				
				// prompt for next players turn.
				if (inWinFlag === 0) {
					gameStatusMsg("Its your turn, player " + currentPlayerText());
				}
				
				// increment turn;
				// do this before chekcing for the win state.
				inTurn++;
			}
			else {
				// con.println(state);
				// need to figure out how to do the CSS check.
			}
		},
		reset: function() {
			con.println("game reset.");
			inState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			inTurn = 0;
			inWinFlag = 0;
			
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