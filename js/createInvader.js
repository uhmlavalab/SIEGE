/*
createInvader.js

createInvader() 
-default width and height need to be updated
-default x and y need to be updated
-default speed is tentative
-Death() sprite removal needs to be added
-Death() suicider spawning needs to be added
*/

/*
creates an invader.

invadeType - this determines what sort of invader is created, i.e. suicide
*/
function createInvader(invadeType, shootingDirection) {
	var ent = createEntity();//this is the invader being created

	ent.x = -100;//the default x ordinance of entity
	ent.y = -100;//the default y ordinance of entity
	ent.width = cInvaderWidth;//Based on invader image given, to be changed later	
	ent.height = cInvaderHeight;//based on invader image given, to be changed later
	ent.speed = 5;//TBD: testing required?
	ent.moveDirection = 1;//up down left right
	ent.hp = 1;//For now everything will have 1 hp
	ent.type = "invader";//this names what sort of entity, such as player or bullet
	isAlive = true;//invader is alive
	
	ent.invaderType = invadeType;//1 being normal, or 2 being suicide
	ent.collisionDamage = 1;//amount of damage dealt of collision
	ent.intervalShoot = 500;//minimum time between shots in ms
	ent.counterShoot = 0;//amount of shots active
    //array containing this invader's bullets

    ent.shootingDirection = shootingDirection;
	ent.allBullets = [createBullet(shootingDirection, ent), createBullet(shootingDirection, ent), createBullet(shootingDirection, ent)]; //?
	ent.maxShootsBullets = 3;//max number of bullets an invader may fire at once

	for(var i =0; i < ent.allBullets.length; i++) {
		ent.allBullets[i].type = 'invaderBullet';
	}

	createInvaderVisual(ent);

	
	ent.moveUpdate = function () {//calls the invaderMoveAI or suicideInvaderAI to handle movement
		if(this.invaderType == 1) {
			invaderMoveAI();
		}
		else if (this.invaderType == 2) {
			suicideInvaderAI();
            console.log("moving suicide");
		}
		this.moveVisualsToCoordinates();
	};
	
	ent.shoot = function () {//calls the shootingAI function to handle shots 
		shootingAI();
	};
	
    /**
    this updates isAlive variable to false. Stops movement and sets speed to 0. 
    Sprite removal needs to be added.
    */
	ent.death = function () {
		this.isAlive = false;//set isAlive to false
		if(this.invaderType == 1) {//if the invader that was killed was a normal invader
        
			//if(Math.random() < .15) {//and if it hits the 15% chance of spawning a suicide invader
				for (var i = 0; i < allSuicider.length; i++) {
                    
                    if (allSuicider[i].isAlive === false) {
                        allSuicider[i].isAlive = true;
                        allSuicider[i].x = this.x;
                        allSuicider[i].y = this.y;
                        allSuicider[i].shootingDirection = this.shootingDirection;
                        if (this.shootingDirection === 'left') {
                            allSuicider[i].moveDirection = -1;
                        }
                        else if (this.shootingDirection === 'right') {
                            allSuicider[i].moveDirection = 1;
                        }
                        allSuicider[i].moveVisualsToCoordinates();
                        createInvaderVisual(allSuicider[i]);
                        console.log(allSuicider);
                        break;
                    }
                    
                }
			//}
		}
        //this.direction = "none";//set direction to none
		explodeEntity(this.vSprite);
		//this.x = -100;
		//this.y = -100;
		this.moveVisualsToCoordinates();
		//remove sprite code here
	};
	
    /**
    Move the bullet's x and y values to the given parameters. 
    Sets hp to 1, and isAlive to true.

    centerXvalue - the x value of the center of the bullet
    centerXvalue - the Y value of the center of the bullet
    */
    ent.spawnAt = function (centerXvalue, centerYvalue) {
        this.hp = 1;
        this.isAlive = true;
        this.x = centerXvalue;
        this.y = centerYvalue;
    };//takes parameters of where you want to spawn entity x
	
    /**
    calls damage function of whatever entity is hit
    */
	ent.dealCollisionDamage = function (entityHit) {
        entityHit.Damage(collisionDamage);//calls damage function if whatever it hits
    }

	
	return ent; //DONT FORGET THIS

}

// Create invader sprite and add it to group
function createInvaderVisual(ref){
	ref.vGroup = new Konva.Group();

    
    if (ref.invaderType === 2) {
    	ref.vSprite = new Konva.Sprite({
            x: -cInvaderWidth/2,
            y: -cInvaderHeight/2,
            width: cInvaderWidth,
            height: cInvaderHeight,
            image: allSpriteObjects['enemy2'],
            animation: 'idle',
            animations: {
                idle: [
                    0,0,32,32,
                    32,0,32,32
                ]
            },
            frameRate: 8,
            frameIndex: 0
        });
    }
    else if (ref.invaderType === 1) {
        ref.vSprite = new Konva.Sprite({
            x: -cInvaderWidth/2,
            y: -cInvaderHeight/2,
            width: cInvaderWidth,
            height: cInvaderHeight,
            image: allSpriteObjects['enemy1'],
            animation: 'idle',
            animations: {
                idle: [
                    0,0,32,32,
                    32,0,32,32
                ]
            },
            frameRate: 8,
            frameIndex: 0
        });
    }
	ref.vGroup.add(ref.vSprite);

	// if(debug) {
	// 	ref.vOutline = new Konva.Rect({
	// 		x: -ref.width/2,
	// 		y: -ref.height/2,
	// 		width: ref.width,
	// 		height: ref.height,
	// 		stroke: 'red',
	// 		strokeWidth: 1
	// 	});
	// 	ref.vGroup.add(ref.vOutline);
	// 	ref.vDot = new Konva.Rect({
	// 		x: 0,
	// 		y: 0,
	// 		width: 2,
	// 		height: 2,
	// 		fill: 'blue'
	// 	});
	// 	ref.vGroup.add(ref.vDot);
	// }
 
	if(ref.shootingDirection === 'left') {
		ref.vGroup.rotate(90);
	}else{
		ref.vGroup.rotate(-90);
	}
	ref.vSprite.start();



} //end createInvaderVisual


/**
 *  AI for moving invaders.
 *  Determines how the invaders will move base on position.
 *  All invaders will move every single second.
 *
 *  Parameters: none
 *  Return:     none
 */
function invaderMoveAI() {

	var d = new Date();

	if(invaderLastMoveTime == null) {
		invaderLastMoveTime = d.getTime();
		return;
	}
	var currentTime = d.getTime();

	if( currentTime - invaderLastMoveTime < cInvaderMoveDelayTime) {
		return;
	}
	invaderLastMoveTime = currentTime;

    var maxY = 0;
    var minY = cCanvasHeight;
    for (var i = 0; i < allInvaders.length; i++) {
        var alien = allInvaders[i];
        if (alien.isAlive === true) {
            alien.y += alien.height * alien.moveDirection;
            maxY = Math.max(maxY, alien.y);
            minY = Math.min(minY, alien.y);
        }
    }
    //console.log("Min Y: " + minY + ", Max Y: " + maxY);
    
    // Determines if any of the invaders are going beyond the 30px margin
    if (maxY >= cCanvasHeight - cInvaderHeight || minY <= cInvaderHeight * 1.5 ) {
        for (var i = 0; i < allInvaders.length; i++) {
            allInvaders[i].moveDirection = allInvaders[i].moveDirection * -1;
            allInvaders[i].y += allInvaders[i].height * (allInvaders[i].moveDirection);
            if (allInvaders[i].x > cCanvasWidth/2) {
                allInvaders[i].x += allInvaders[i].width;
            }
            if (allInvaders[i].x < cCanvasWidth/2) {
                allInvaders[i].x -= allInvaders[i].width;
            }
        }
    }
}

/**
 *  AI for suicide invaders.
 */
function suicideInvaderAI() {
    for (var i = 0; i < allSuicider.length; i++) {
        var suicide = allSuicider[i];
        if (suicide.isAlive === true) {
            suicide.x += 10 * suicide.moveDirection;
            console.log(suicide.x);
        }
    }
}


/**
 *  AI for controlling how the invaders will shoot.
 *  Every 500 millisecond, there is a chance a random invader will be chosen to shoot.
 *
 *  Parameters: none
 *  Return:    none
 */
function shootingAI() {
    var d = new Date();
    var currentTime = d.getTime();
    
    if(invaderLastShotTime == null) {
		invaderLastShotTime = d.getTime();
		return;
	}
    
    if (currentTime - invaderLastShotTime > 500) {
        invaderLastShotTime = currentTime;
        if (Math.random() < 0.5) {
            var shootingAlien = allInvaders[Math.round(Math.random() * (allInvaders.length - 1))];
            // shootingAlien has bullets
            if (shootingAlien.isAlive) {
                for (var i = 0; i < shootingAlien.allBullets.length; i++) {
                    if (shootingAlien.allBullets[i].isAlive) {
                    
                    }
                    else if (shootingAlien.shootingDirection == "right") {
                        shootingAlien.allBullets[i].isAlive = true;
                        shootingAlien.allBullets[i].spawnAt(shootingAlien.x + shootingAlien.width/2 + 1 + cBulletWidth, shootingAlien.y);
                        //console.log("Alien shot right: " + shootingAlien.shootingDirection +  ", Bullet: " + shootingAlien.allBullets[i].moveDirection);
                        //console.log("A X: " + shootingAlien.x + ", B X: " + shootingAlien.allBullets[i].x);
                    }
                    else if (shootingAlien.shootingDirection == "left") {
                        shootingAlien.allBullets[i].isAlive = true;
                        shootingAlien.allBullets[i].spawnAt(shootingAlien.x + shootingAlien.width/2 + 1 + cBulletWidth, shootingAlien.y);
                        //console.log("Alien shot left: " + shootingAlien.shootingDirection +  ", Bullet: " + shootingAlien.allBullets[i].moveDirection);
                        //console.log("A X: " + shootingAlien.x + ", B X: " + shootingAlien.allBullets[i].x);
                    }
                }
            }
        }
    }
}

