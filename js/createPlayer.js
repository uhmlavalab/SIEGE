/*
createPlayer.js

createPlayer() 
-default width and height need to be updated
-default x and y need to be updated
-default speed is tentative
-Death() sprite removal needs to be added
-moveUpdate() visuals need to be added
*/

/*
creates a player.

shooting direction - this determines which way the play shoots
*/
function createPlayer(shootingDirection) {
	var ent = createEntity();

	ent.x = -100;//the default x ordinance of entity
	ent.y = -100;//the defualt y ordinance of entity
	ent.width = cPlayerWidth;//How wide the entity is
	ent.height = cPlayerHeight;//How tall the entity is 
	ent.speed = 20;//movement speed
	ent.hp = 1;//For now everything will have 1 hp
	ent.type = "player";//this names what sort of entity, such as player or bullet
	ent.shootingDirection = shootingDirection;
	ent.moveDirection = 'none';//up & down?
    ent.score = 0;//+1 for kills
	isAlive = true;//Are you still alive bro?
	ent.intervalShoot = 500; //milliseconds
	ent.counterShoot = 0;
	ent.speed = 3;
	ent.maxShootBullets = 1;
	var previousTimeA = 0;
	var previousTimeB = 0;
	createPlayerVisual( ent );

	//array containing this players bullets
	//ent.allBullets = [createBullet(shootingDirection, ent.type), createBullet(shootingDirection, ent.type), createBullet(shootingDirection, ent.type)];
	ent.allBullets = [];
	for(var i = 0; i < 3; i++) {
		ent.allBullets.push( createBullet(shootingDirection, ent) );
		ent.allBullets[ ent.allBullets.length - 1 ].type = 'playerBullet';
	}

	/**
	used to shoot bullets.
	*/
	ent.shoot = function () {
		if (this.isAlive) {
			var d = new Date();
			var currentTime = d.getTime();
			//if the player is allowed to shoot more shots
			if (this.counterShoot < this.maxShootBullets) {
				//find an avaiable bullet, one where isAlive is false
				for (var i = 0; i < this.allBullets.length; i++) {
					if(this.allBullets[i].isAlive) {
						//will do nothing if the found bullet isAlive
					} else if (this.shootingDirection == "right") {//spawns bullet for left player
						if((currentTime - previousTimeA) > 500) {
							this.allBullets[i].isAlive = true;
							this.allBullets[i].spawnAt(this.x + this.width/2 + 1 + cBulletWidth, this.y);
							//this.counterShoot++;
							previousTimeA = currentTime;
							console.log('confirm right shot');
						}
					} else if (this.shootingDirection == "left") {//spawns bullet for right player
						if((currentTime - previousTimeB) > 500) {
							this.allBullets[i].isAlive = true;
							this.allBullets[i].spawnAt(this.x - this.width/2 - 1 - cBulletWidth, this.y);
							//this.counterShoot++;
							previousTimeB = currentTime;
								console.log('confirm left shot');
						}
					}
				}
			}
		}
	};
	/**
	controls movement for the player
	*/
	ent.moveUpdate = function () {
		switch (this.moveDirection) {
			case 'up':
				this.y -= this.speed;
			break;
			case 'down':
				this.y += this.speed;
			break;
			case 'none':
			break;
			default:
				console.log('Error unknown direction');
			break;
		} //end switch moveDirection

		if(this.y < 0) { this.y = 0; }
		else if(this.y > cCanvasHeight) { this.y = cCanvasHeight; }

		// for(var i = 0; i < this.allBullets.length; i++) {
		// 	this.allBullets[i].moveUpdate();
		// 	//console.log(this.allBullets[i].y)
		// }
		//need to update visuals.
		this.moveVisualsToCoordinates();

		//if(debugPlayerCreate) { console.log( 'player update location: ' + this.x + ',' + this.y + '. and sprite: ' + this.vGroup.x() + ',' + this.vGroup.y()  ); }

	}; //end moveUpdate

	/**
	this updates isAlive variable to false. Stops movement and sets speed to 0. 
	Sprite removal needs to be added.
	*/
	ent.death = function () {
		this.isAlive = false;//set isAlive to false
		//ent.speed = 0;//set speed to 0 //why is speed getting killed?
		this.direction = "none";//set direction to none
		explodeEntity(this.vSprite);
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
	return ent; //DONT FORGET THIS

} //end createPlayer


/* 
Create player sprite and add it to group
Only called within this file.
*/
function createPlayerVisual(ref) {
	ref.vGroup = new Konva.Group();

	ref.vSprite = new Konva.Sprite({
		x: -ref.width/2,
		y: -ref.height/2,
		width: ref.width,
		height: ref.height,
		/*image: allSpriteObjects['player1'],*/
		animation: 'idle',
		animations: {
			idle: [
				0,0,32,32
			]
		},
		frameRate: 1,
		frameIndex: 0
	});

	ref.vGroup.add(ref.vSprite);

	if(ref.shootingDirection === 'left') {
		ref.vSprite.image(allSpriteObjects['player2']);
		ref.vGroup.rotate(-90);
	}else{
		ref.vSprite.image(allSpriteObjects['player1']);
		ref.vGroup.rotate(90);
	}
	ref.vSprite.start();
} //end createPlayerVisual









