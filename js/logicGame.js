/*---------------------------------------------------------
    
    logicGame()
    
    prepAndSwitchToGame()
    
*/

/* Updates everything needed in-game: entity movements, entity collision checks,
   On-Screen Visuals (score, time, etc.). */
function logicGame() {
    
    if(debugLogicGame) { console.log('logic game spam' ); }
    

    bgController.update();

    /* Updates movement for all entities */
    for(var i = 0; i < allEntities.length; i++) {
        if(allEntities[i].isAlive) {
            allEntities[i].moveUpdate();
        }
    }

    for (var i = 0; i < allEntities.length; i++) {    
        /* Checks for overlap and triggers effects if true */
        if (allEntities[i].type == "invader") {
            allEntities[i].shoot();
        }
        for(var j = 0; j < allEntities.length; j++) {
            if(allEntities[j].isAlive) {
                if(allEntities[i] == allEntities[j]) {
                    continue; //continue loop if same entity
                }
                if(overlap(allEntities[i], allEntities[j])) {
                    collisionEffects(allEntities[i], allEntities[j]);
                } 
            } //end inner for
        } 
    } //end outer for
    
    /* Checks for endgame condition, changes to results if true */
    if(!allPlayers[0].isAlive || !allPlayers[1].isAlive) {
        
		//console.log(allPlayers[0].score, allPlayers[1].score);
        var winner; 
        if (allPlayers[0].isAlive) {
            winner = "Player 2 Got PWN'd";
        }
        else {
            winner = "Player 1 Got PWN'd";
        }
        prepandSwitchToResult(winner);
    } 

    //check if all invaders are dead
    var allDead = true;
    for(var i = 0; i < allInvaders.length; i++) {
        if(allInvaders[i].vSprite.animation() !== 'empty' ) {
            allDead = false;
        }
        if(allInvaders[i].vSprite.animation() === 'empty' && allInvaders[i].invaderType == 1 && allInvaders[i].justDied ) {

            if (Math.random() < .99) {
                allInvaders[i].spawnAt(allInvaders[i].x, allInvaders[i].y);
                allInvaders[i].vSprite.image( allSpriteObjects['enemy2'] );
                allInvaders[i].invaderType = 2;
                allDead = false;
            }
            allInvaders[i].justDied = false;
        }
    }
    if(allDead && is2ndWaveAvailable) {
        is2ndWaveAvailable = false;
        prepGameInvaderPosition();
    }
    
    onscreenVisuals();
} //end logicGame

/* Checks for individual object overlap */
function overlap(object1, object2)
{
    var hb1 = object1.getHitBox();
    var hb2 = object2.getHitBox();
    
    /* Checks the rectangle sides for overlap */
    if(hb1.x - hb1.width/2 < hb2.x + hb2.width/2 &&  
       hb1.x + hb1.width/2 > hb2.x - hb2.width/2 &&
       hb1.y - hb1.height/2 < hb2.y + hb2.height/2 && 
       hb1.y + hb1.height/2 > hb2.y - hb2.height/2) {
           return true;
       }
       else {
           return false;
       }
}

/* Updates all On-Screen Visuals */
function onscreenVisuals() {
    allGameVisuals.frontLayer.p1score.text('Score: ' + allPlayers[0].score);
    allGameVisuals.frontLayer.p2score.text('Score: ' + allPlayers[1].score);

} //end onscreenVisuals

/* Determines type and creates appropriate effect */
function collisionEffects(object1, object2) {
	
    if(object1.isAlive && object2.isAlive){

        /* Checks if player is hit by any bullet or invader */
        if(object1.type == "player" && (object2.type == "invaderBullet" || object2.type == "invader" || object2.type == "playerBullet")) {
            object1.score -= 1;
			if(object1.score < 0) {
				object1.score = 0;
			}
			if(object2.type == "playerBullet") {
				object1.damage(1);
			}
            if(object2.type == "invaderBullet" || object2.type == "playerBullet") {
                object2.death();
				if(object2.type == "playerBullet") {
					object2.Owner.score+=5;
				}
            }
        }
        else if((object1.type == "invaderBullet" || object1.type == "invader" || object1.type == "playerBullet") && object2.type == "player") {
            //object2.damage(1);
			object2.score -= 1;
			if(object2.score < 0) {
				object2.score = 0;
			}
			if(object1.type == "playerBullet") {
				object2.damage(1);
			}
    		if(object1.type == "invaderBullet" || object1.type == "playerBullet") {
                object1.death();
				if(object1.type == "playerBullet") {
					object1.Owner.score+=5;
				}
            }
        }
        
        /* Checks player bullets with invaders */
        else if(object1.type == "invader" && object2.type == "playerBullet") {
            object1.damage(1);
            object2.death();
			object2.Owner.score++;
            console.log(' invader hit by bullet');
        }
        else if(object1.type == "playerBullet" && object2.type == "invader") {
            object2.damage(1);
            object1.death();
			object1.Owner.score++;
            console.log(' invader hit by bullet');
        }
        
        /* Checks for boss */
        else if(object1.type == "boss" && object2.type == "playerBullet") {
            object1.damage(1);
            object2.death();
        }
        else if(object1.type == "playerBullet" && object2.type == "boss") {
            object2.damage(1);
            object1.death();
        }
    }
} //end collisionEffects

/*
Calling this will perform all effects necessary to start a new game.
Resets all entities.
Correctly places and preps(spawn).
Switches visuals.
*/
function prepAndSwitchToGame() {
    
    
    for(var i = 0; i < allEntities.length; i++) {
        /* Kills all bullets */
        if(allEntities[i].type == "bullet") {
            allEntities[i].isAlive = false;
        }
        /* Resets player scores */
        if(allEntities[i].type == "player") {
            var player = allEntities[i];
            player.score = 0;
        }
    }
    
    prepGamePlayerPosition();
    prepGameInvaderPosition();

    placeScreenVisuals( allGameVisuals );

    gameState = gsGame;

    audio_ingame_song.play();

} //end prepAndSwitchToGame

//place players correctly.
function prepGamePlayerPosition() {
    var p;
    for(var i = 0; i < allPlayers.length ; i++) {
        p = allPlayers[i];
        if(p.shootingDirection === 'right') {
            p.spawnAt( cP1StartingX, cP1StartingY );
        }
        else if( p.shootingDirection === 'left' ) {
            p.spawnAt( cP2StartingX, cP2StartingY );
        }
    }

    if(debug) {console.dir(allPlayers);}

} //end prepGamePlayerPosition

function prepGameInvaderPosition() {
    var invCounter = 0;
    var xcalc;
    var ycalc;

    for (var i = 0; i < cInvColSize; i++) {
        for (var j = 0; j < cInvRowSize; j++) {
            xcalc = cInvLeftSpawnStartX - (cInvSpawnWidthGap + cInvaderWidth) * i,
            ycalc = cInvLeftSpawnStartY + (cInvSpawnHeightGap + cInvaderHeight) * j,
            allInvaders[invCounter].spawnAt(xcalc, ycalc);
            invCounter++;
        }
    }
    
    for (var i = 0; i < cInvColSize; i++) {
        for (var j = 0; j < cInvRowSize; j++) {
            xcalc = cInvRightSpawnStartX + (cInvSpawnWidthGap + cInvaderWidth) * i,
            ycalc = cInvRightSpawnStartY + (cInvSpawnHeightGap + cInvaderHeight) * j,
            allInvaders[invCounter].spawnAt(xcalc, ycalc);
            invCounter++;
        }
    }

} //end prepGameInvaderPosition