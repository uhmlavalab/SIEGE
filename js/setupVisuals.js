

/* ------------------------------------------------------------------------------------------------------------------

setupKonvaCanvas()
setupSpriteImageObjects()

setupMenuVisuals() 
setupGameVisuals() 
setupResultVisuals()

placeScreenVisuals()

*/




/*
Used once in main to create all canvas variables.
*/
function setupKonvaCanvas() {
	stage = new Konva.Stage({
		width: cCanvasWidth,
		height: cCanvasHeight,
		container: 'topdiv'
	});

	var grayBacking = new Konva.Layer();
	stage.add(grayBacking);

	var grayback = new Konva.Rect({
		x:0,
		y:0,
		width:cCanvasWidth,
		height:cCanvasHeight,
		fill: 'lightgray'
	});
	grayBacking.add(grayback);

	backLayer = new Konva.Layer();
	stage.add(backLayer);

	midLayer = new Konva.Layer();
	stage.add(midLayer);

	frontLayer = new Konva.Layer();
	stage.add(frontLayer);

} //end setupKonvaCanvas

/*
One time call from main.
Load all necessary image objects here so there is only 1 object, and many things  can reference it.
Doing this saves time and memory.
*/
function setupSpriteImageObjects() {
	allSpriteObjects = {};

	allSpriteObjects['player1'] = new Image();
	allSpriteObjects['player1'].src = 'assets/aircraft_1.png';

	allSpriteObjects['player2'] = new Image();
	allSpriteObjects['player2'].src = 'assets/aircraft_3.png';

	allSpriteObjects['bullet'] = new Image();
	allSpriteObjects['bullet'].src = 'assets/shoot_simple.png';

	allSpriteObjects['enemy1'] = new Image();
	allSpriteObjects['enemy1'].src = 'assets/enemy_1_animation.png';
    
    allSpriteObjects['enemy2'] = new Image();
    allSpriteObjects['enemy2'].src = 'assets/enemy_suicide.png';

} //end setupSpriteImageObjects



/*
One time call from main.
Creates all visuals to be used in the menu gameState.
*/
function setupMenuVisuals() {

	allMenuVisuals = {};
	allMenuVisuals.backLayer = {};
	allMenuVisuals.midLayer = {};
	allMenuVisuals.frontLayer = {};

	var amv = allMenuVisuals.backLayer;

	amv.title = new Konva.Text({
		text: 'Space Invaders',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'greem'
	});
	amv.title.x( cCanvasWidth/2 - amv.title.getTextWidth()/2 );
	amv.title.y( cCanvasHeight * 0.1);

} //end setupMenuVisuals


/*
One time call from main.
Creates all visuals to be used in the game gameState.
*/
function setupGameVisuals() {


	allGameVisuals = {};
	allGameVisuals.backLayer = {};
	allGameVisuals.midLayer = {};
	allGameVisuals.frontLayer = {};

	var agv = allGameVisuals.backLayer;

	agv.title = new Konva.Text({
		text: 'In Game',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'greem'
	});
	agv.title.x( cCanvasWidth/2 - agv.title.getTextWidth()/2 );
	agv.title.y( cCanvasHeight/2 - agv.title.getTextHeight()/2 );


	agv = allGameVisuals.midLayer;

	//create players
	for(var i = 0; i < 2; i++) {
		var dir;
		if(i == 0) {dir = 'right';} else { dir = 'left';}
		allPlayers.push( createPlayer(dir) );
		agv[ 'pGroup' + i ] = allPlayers[ allPlayers.length -1 ].vGroup;

		//need to get bullets visuals
		for(var b = 0; b < allPlayers[ allPlayers.length -1 ].allBullets.length; b++) {
			agv['pbGroup' + i + b] = allPlayers[ allPlayers.length -1 ].allBullets[b].vGroup;
		}
	}

	//create invader
	var totalInvadersNeededToBeCreated = cInvColSize * cInvRowSize * 2;
	for ( var i = 0; i < totalInvadersNeededToBeCreated ; i++) {
		if(i < totalInvadersNeededToBeCreated/2 ) {
			allInvaders.push( createInvader(1, 'left') );
		} else { 
			allInvaders.push( createInvader(1, 'right') );
		}
		agv[ 'invGroup' + i] = allInvaders[ allInvaders.length - 1 ].vGroup;

		for(var b = 0; b < allInvaders[ allInvaders.length - 1 ].allBullets.length; b++ ) {
			agv[ 'invGroupBullet' + i + 'bullid' + b ] = allInvaders[ allInvaders.length -1 ].allBullets[b].vGroup;
		}
	}

    for (var i = 0; i < totalSuicideInvaders; i++) {
        var suicideInvader = createInvader(2, '');
        suicideInvader.isAlive = false;
        allSuicider.push(suicideInvader);
        agv['suiGroup' + i] = allSuicider[ allSuicider.length - 1].vGroup;
    }


} //end setupGameVisuals



/*
One time call from main.
Creates all visuals to be used in the result gameState.
*/
function setupResultVisuals() {

	allResultVisuals = {};
	allResultVisuals.backLayer = {};
	allResultVisuals.midLayer = {};
	allResultVisuals.frontLayer = {};


} //end setupResultVisuals








/*------------------------------------------------------------------------------------------------------
Use to switch all visuals to specified visual object.
Does clear out all visual from the layers.
*/
function placeScreenVisuals( allScreenVisuals ) {
	removeAllChildrenFromLayers();

	if(debug) { console.log('---adding screen visuals--------------------------------------------------------------------'); }
	for ( var key in allScreenVisuals.backLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		backLayer.add( allScreenVisuals.backLayer[key] );
	}
	for ( var key in allScreenVisuals.midLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		midLayer.add( allScreenVisuals.midLayer[key] );
	}
	for ( var key in allScreenVisuals.frontLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		frontLayer.add( allScreenVisuals.frontLayer[key] );
	}

} //end placeScreenVisuals


//------------------------------------------------------------------------------------------------------

function removeAllChildrenFromLayers() {
	backLayer.removeChildren();
	midLayer.removeChildren();
	frontLayer.removeChildren();
} //end removeAllChildrenFromLayers











