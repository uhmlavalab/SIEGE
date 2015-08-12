/*---------------------------------------------------------
    logicResult()
    
    prepandSwitchToMenu()
*/

/* Updates leaderboard */
function logicResult() {
    for(var i = 0; i < allPlayers.length; i++) {
        for(var j = 0; j < leaderBoard.length; j++) {
            if(allPlayers[i].score >= leaderBoard[j].score) {
                /* Shift all leaderBoard scores and insert new score */
                for(var k = j; k < leaderBoard.length; k++) {
                    leaderBoard[k + 1] = leaderBoard[k];
                }
                leaderBoard[j].score = allPlayers[i].score;
                //leaderBoard[j].name = userinput?
            }
        }
    }
} //end logicResult

/* Preps the game */
function prepandSwitchToResult() {
    
  //  placeScreenVisuals( allResultVisuals );
	
  //  gameState = gsResult;
    
} //end prepandSwitchToResult
