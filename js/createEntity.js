/*
createEntity.js

nothing to be added

*/

/*---------------------------------------------------------------------------------------------------------
Don't call this directly. Creates an entity.
*/
function createEntity() {
	var ent = {};//this is the entity being created

	ent.x = -100;//the default x ordinance of entity (center of entity)
	ent.y = -100;//the defualt y ordinance of entity (center of entity)
	ent.width = -1;//How wide the entity is
	ent.height = -1;//How tall the entity is 
	ent.speed = -1;//movement speed
	ent.moveDirection = 'none';//direction the object will move in
	ent.hp = 1;//health points, For now everything will have 1 hp
	ent.type = "entity";//this names what sort of entity, such as player or bullet
	isAlive = true;//Are you still alive bro?

	/**
	moveUpdate is not implemented for entity.
	*/
	ent.moveUpdate = function () { console.log("Error entity move accessed."); };

	/**
	this gets the hitbox for the entity.

	returns a rect() the same size and position of the entity. 
	*/
	ent.getHitBox = function () {//based off the center point of the sprite image. Hit box should be around the sprite, not the sprite itself
		var rect = {};//create hit box object

		rect.x = this.x;//copy over dimensions and position
		rect.y = this.y;
		rect.width = this.width;
		rect.height = this.height;

		return rect;//return the hitbox object
	}; //end getHitBox

	/**
	this updates the hp with damage taken. Will set is alive to false and call death if hp drops to 0 or lower.

	amountOfDamageBeingTaken - the damage received
	*/
	ent.damage = function (amountOfDamageBeingTaken) {
		var currentHp = this.hp;//gets current hp
		currentHp = currentHp - amountOfDamageBeingTaken;//calculates damage
		if(debug) { console.log('DAMAGE confirm hp:' + currentHp + ' ent hp:' + this.hp + "damage amount: " +amountOfDamageBeingTaken); }
		if (currentHp <= 0) {//hp check
			this.isAlive = false;//sets isAlive to false
			this.death();//call to the Death function 
		}
	};
	
	/**
	this updates isAlive variable to false. Stops movement and sets speed to 0. 
	Sprite removal will be unique to each type of entity.
	*/
	ent.death = function () {
		this.isAlive = false;//set isAlive to false
		this.speed = 0;//set speed to 0
		this.direction = "none";//set direction to none
		//remove sprite code here
	};
	
	/**
	spawnAt is not implemented for entity.
	*/
	ent.spawnAt = function () {console.log("Error entity spawnAt accessed."); };//takes parameters of where you want to spawn entity	


	/**
	Moves the visual group to the entity values.
	Should be called at the end of move update.
	*/
	ent.moveVisualsToCoordinates = function () {
		this.vGroup.x( this.x );
		this.vGroup.y( this.y );

	};

	allEntities.push( ent ); //everything should call this to be created for mechanical updates.

	return ent; //DONT FORGET THIS

} //end createEntity


//This function should receive a Sprite as parameter
function explodeEntity(ref){
	var explosion_image = new Image();
	explosion_image.src = 'assets/explosion_2.png';

	/*
	var anim = {
		explosion: [
			0, 0, 76, 76,
			76, 0, 76, 76,
			152, 0, 76, 76,
			228, 0, 76, 76,
			304, 0, 76, 76,
			380, 0, 76, 76,
			456, 0, 76, 76,
			532, 0, 76, 76,
			608, 0, 76, 76,
			684, 0, 76, 76,
			760, 0, 76, 76,
			836, 0, 76, 76,
			912, 0, 76, 76,
			988, 0, 76, 76

		]
	};
	*/

	var anim = {
		explosion: [
			0, 0, 38, 38,
			38, 0, 38, 38,
			76, 0, 38, 38,
			114, 0, 38, 38,
			152, 0, 38, 38,
			190, 0, 38, 38,
			228, 0, 38, 38,
			266, 0, 38, 38,
			304, 0, 38, 38,
			342, 0, 38, 38,
			380, 0, 38, 38,
			418, 0, 38, 38,
			456, 0, 38, 38,
			494, 0, 38, 38

		]
	};


	ref.image(explosion_image);
	ref.animation('explosion');
	ref.animations(anim);
	ref.frameRate(10);

	ref.start();

	setTimeout(function(){
		console.log('destroy');

		var empty_image = new Image();
		empty_image.src = 'assets/empty.png';

		var empty_anim = {
			empty: [
				0, 0, 64, 64
			]
		};

		ref.image(empty_image);
		ref.animation('empty');
		ref.animations(empty_anim);

	}, 7000/ref.frameRate());
}
